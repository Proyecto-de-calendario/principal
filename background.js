let tabTimes = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('your-defined-url')) {
    tabTimes[tabId] = { startTime: Date.now(), isActive: true };
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabTimes[tabId]) {
    let endTime = Date.now();
    let totalTime = endTime - tabTimes[tabId].startTime;
    chrome.storage.local.get(['pageTime'], (result) => {
      let newTime = (result.pageTime || 0) + totalTime;
      chrome.storage.local.set({ pageTime: newTime }, () => {
        delete tabTimes[tabId];
      });
    });
  }
});

let interactionStart;
let interactionTime = 0;

function startInteraction() {
  if (!interactionStart) {
    interactionStart = Date.now();
  }
}

function stopInteraction() {
  if (interactionStart) {
    interactionTime += Date.now() - interactionStart;
    interactionStart = null;
  }
}

window.addEventListener('focus', startInteraction);
window.addEventListener('blur', stopInteraction);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopInteraction();
  } else {
    startInteraction();
  }
});

window.addEventListener('beforeunload', () => {
  stopInteraction();
  chrome.runtime.sendMessage({ interactionTime });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.interactionTime && sender.tab) {
    let tabId = sender.tab.id;
    let totalTime = message.interactionTime;
    chrome.storage.local.get(['pageTime'], (result) => {
      let newTime = (result.pageTime || 0) + totalTime;
      chrome.storage.local.set({ pageTime: newTime });
    });
  }
});
