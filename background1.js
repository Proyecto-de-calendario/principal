let tabTimes = {};

// Detectar cuando una pestaña se actualiza o se navega a una URL específica
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('localhost')) {
    tabTimes[tabId] = { startTime: Date.now(), isActive: true };
    
    // Inyectar el script en la página para monitorear la interacción del usuario
    browser.tabs.executeScript(tabId, {
      file: 'content.js'
    });
  }
});

// Manejar el cierre de pestañas
browser.tabs.onRemoved.addListener((tabId) => {
  if (tabTimes[tabId]) {
    let endTime = Date.now();
    let totalTime = endTime - tabTimes[tabId].startTime;
    
    // Guardar el tiempo total en el almacenamiento local
    browser.storage.local.get(['pageTime']).then((result) => {
      let newTime = (result.pageTime || 0) + totalTime;
      
      browser.storage.local.set({ pageTime: newTime }).then(() => {
        delete tabTimes[tabId];
      });
    });
  }
});

// Variables para el tiempo de interacción
let interactionStart;
let interactionTime = 0;

// Inicia el temporizador de interacción
function startInteraction() {
  if (!interactionStart) {
    interactionStart = Date.now();
  }
}

// Detiene el temporizador de interacción y calcula el tiempo transcurrido
function stopInteraction() {
  if (interactionStart) {
    interactionTime += Date.now() - interactionStart;
    interactionStart = null;
  }
}

// Escuchar eventos para capturar la interacción del usuario
window.addEventListener('focus', startInteraction);
window.addEventListener('blur', stopInteraction);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopInteraction();
  } else {
    startInteraction();
  }
});

// Capturar clics, teclas y desplazamientos como interacción
document.addEventListener('mousedown', startInteraction);
document.addEventListener('mouseup', stopInteraction);
document.addEventListener('keydown', startInteraction);
document.addEventListener('keyup', stopInteraction);
document.addEventListener('scroll', startInteraction);

// Enviar el tiempo de interacción antes de que la página se cierre o recargue
window.addEventListener('beforeunload', () => {
  stopInteraction();
  browser.runtime.sendMessage({ interactionTime });
});

// Escuchar mensajes desde el background script para manejar el tiempo de interacción
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.interactionTime && sender.tab) {
    let tabId = sender.tab.id;
    let totalTime = message.interactionTime;
    
    browser.storage.local.get(['pageTime']).then((result) => {
      let newTime = (result.pageTime || 0) + totalTime;
      
      browser.storage.local.set({ pageTime: newTime });
    });
  }
});
