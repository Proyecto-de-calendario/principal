let activeTabId = null;
let startTime = null;
let endTime = null;
let interactions = {};
let timeLimits = {}; // Guardar los límites de tiempo por página
let intervalId = null;
let currentSocialNetwork = null; // Guardar la red social actual

// Verificar si la URL pertenece a una red social
const socialNetworks = ['youtube.com', 'facebook.com', 'x.com', 'instagram.com', 'tiktok.com'];

function isSocialNetwork(url) {
  return socialNetworks.some(network => url.includes(network));
}

// Obtener el nombre de la red social a partir de la URL
function getSocialNetwork(url) {
  const socialNetworks = {
    'youtube.com': 'YouTube',
    'facebook.com': 'Facebook',
    'x.com': 'X',
    'instagram.com': 'Instagram',
    'tiktok.com': 'TikTok'
  };

  for (const network in socialNetworks) {
    if (url.includes(network)) {
      return socialNetworks[network];
    }
  }

  return 'Unknown';
}

// Manejar la activación de pestañas
browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  if (isSocialNetwork(tab.url)) {
    if (activeTabId) {
      endInteraction();
    }
    activeTabId = activeInfo.tabId;
    startTime = new Date();
    interactions = []; // Resetear las interacciones
    currentSocialNetwork = getSocialNetwork(tab.url); // Obtén la red social actual
    startTimeTracker(tab.url);
  } else if (activeTabId) {
    endInteraction();
  }
});

// Manejar la actualización de pestañas
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.status === 'complete') {
    if (!isSocialNetwork(tab.url)) {
      endInteraction();
    }
  }
});

// Manejar los mensajes recibidos
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "setTimeLimit") {
    timeLimits[message.pageName] = message.timeLimit;
  }
});

// Finalizar la interacción
function endInteraction() {
  endTime = new Date();
  if (startTime && endTime) {
    logInteraction(currentSocialNetwork); // Pasa la red social actual
  }
  activeTabId = null;
  startTime = null;
  endTime = null;
  currentSocialNetwork = null; // Restablece la red social actual
  clearInterval(intervalId);
  intervalId = null;
}

// Registrar la interacción
function logInteraction(socialNetwork) {
  const duration = Math.floor((endTime - startTime) / 1000);
  console.log(`Fecha y hora de ingreso: ${startTime}`);
  console.log(`Fecha y hora de cierre: ${endTime}`);
  console.log(`Tiempo de interacción en ${socialNetwork}: ${duration} segundos`);
  
  // Guardar la interacción en el objeto `interactions`
  if (!interactions[socialNetwork]) {
    interactions[socialNetwork] = [];
  }
  interactions[socialNetwork].push({ startTime, endTime, duration });

  // Guardar las interacciones en `localStorage`
  localStorage.setItem('interactions', JSON.stringify(interactions));

  // Verificar que el receptor esté disponible antes de enviar el mensaje
  if (browser.runtime) {
    browser.runtime.sendMessage({ action: "logTime", timeSpent: duration, socialNetwork })
      .catch(err => console.error("Error sending message:", err));
  } else {
    console.error("No runtime available to send message.");
  }
}

// Recuperar las interacciones desde `localStorage`
function loadInteractions() {
  const storedInteractions = localStorage.getItem('interactions');
  if (storedInteractions) {
    interactions = JSON.parse(storedInteractions);
  }
}

// Llamar a `loadInteractions` cuando se carga el script
loadInteractions();

// Iniciar el rastreo de tiempo
function startTimeTracker(url) {
  const pageName = getSocialNetwork(url);
  if (intervalId) clearInterval(intervalId); // Evitar múltiples intervalos
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    console.log(`Tiempo de interacción continuo: ${elapsedTime} segundos`);
    
    // Verificar si se ha alcanzado el límite de tiempo
    if (timeLimits[pageName] && elapsedTime * 1000 > timeLimits[pageName]) {
      alert(`Has alcanzado el límite de tiempo para ${pageName}`);
      endInteraction();
    }
  }, 1000); // Cada segundo
}
