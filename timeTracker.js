let activeTabId = null;
let startTime = null;
let endTime = null;
let interactions = [];
let timeLimit = null;
let remainingTime = null;
let intervalId = null;

browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  const socialNetworks = ['youtube.com', 'facebook.com', 'x.com', 'instagram.com', 'tiktok.com'];

  for (const network of socialNetworks) {
    if (tab.url.includes(network)) {
      activeTabId = activeInfo.tabId;
      startTime = new Date();
      interactions = []; // Resetear las interacciones
      browser.runtime.sendMessage({ action: "getSocialNetwork" });
      startTimeTracker();
      break;
    }
  }

  if (activeTabId) {
    endTime = new Date();
    logInteraction(tab.url);
    activeTabId = null;
    startTime = null;
    endTime = null;
    clearInterval(intervalId);
    intervalId = null;
  }
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.status === 'complete') {
    const socialNetworks = ['youtube.com', 'facebook.com', 'x.com', 'instagram.com', 'tiktok.com'];
    let isNetworkTab = false;

    for (const network of socialNetworks) {
      if (tab.url.includes(network)) {
        isNetworkTab = true;
        break;
      }
    }

    if (!isNetworkTab) {
      endTime = new Date();
      logInteraction(tab.url);
      activeTabId = null;
      startTime = null;
      clearInterval(intervalId);
      intervalId = null;
    }
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "socialNetwork") {
    logInteraction(message.socialNetwork);
  } else if (message.action === "setTimeLimit") {
    const { hours, minutes } = message;
    timeLimit = (hours * 60) + minutes;
    remainingTime = timeLimit;
    startTimeTracker();
  }
});

function logInteraction(socialNetwork) {
  const duration = Math.floor((endTime - startTime) / 1000);
  console.log(`Fecha y hora de ingreso: ${startTime}`);
  console.log(`Fecha y hora de cierre: ${endTime}`);
  console.log(`Tiempo de interacción en ${socialNetwork}: ${duration} segundos`);
  interactions.push({ startTime, endTime, duration, socialNetwork });
  browser.runtime.sendMessage({ action: "logTime", timeSpent: duration, socialNetwork });
}

function startTimeTracker() {
  intervalId = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      browser.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Tiempo de uso excedido',
        message: `Has alcanzado el límite de tiempo establecido para esta red social.`
      });
    }
  }, 60000); // Actualizar cada minuto
}