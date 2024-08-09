let startTime;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes(`${pageUrl}`) && changeInfo.status === 'complete') {
    startTime = Date.now();
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  chrome.tabs.get(tabId, (tab) => {
    if (tab && tab.url.includes(`${pageUrl}`)) {
      let endTime = Date.now();
      let totalTime = endTime - startTime;
      chrome.storage.local.get(['pageTime'], (result) => {
        let newTime = (result.pageTime || 0) + totalTime;
        chrome.storage.local.set({ pageTime: newTime });
      });
    }
  });
});