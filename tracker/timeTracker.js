// Escuchar mensajes desde limiteTiempo.js
window.addEventListener('message', (event) => {
  if (event.data) {
    console.log('Datos recibidos del formulario:', event.data);
    handleFormData(event.data);
  }
});

function handleFormData(data) {
  // Manejar los datos del formulario aquí
  console.log(`Red social: ${data.pageURL}, Límite: ${data.remainingHours} horas y ${data.remainingMinutes} minutos`);

  // Aquí puedes agregar el manejo necesario como actualizar el estado, guardar en localStorage, etc.
}

// Ejemplo del código existente para conectarse al servidor WebSocket y otras funcionalidades
let activeTabId = null;
let startTime = null;
let endTime = null;
let interactions = {};

// Conectar al servidor WebSocket
const socket = new WebSocket('ws://localhost:4000');

// Definir las redes sociales que se monitorearán
const socialNetworks = ['youtube.com', 'facebook.com', 'x.com', 'instagram.com', 'tiktok.com'];

function isSocialNetwork(url) {
  return socialNetworks.some(network => url.includes(network));
}

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

browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  if (isSocialNetwork(tab.url)) {
    if (activeTabId) {
      endInteraction();
    }
    activeTabId = activeInfo.tabId;
    startTime = new Date();
    currentSocialNetwork = getSocialNetwork(tab.url);
  } else if (activeTabId) {
    endInteraction();
  }
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.status === 'complete') {
    if (!isSocialNetwork(tab.url)) {
      endInteraction();
    }
  }
});

function endInteraction() {
  endTime = new Date();
  if (startTime && endTime) {
    logInteraction(currentSocialNetwork);
  }
  activeTabId = null;
  startTime = null;
  endTime = null;
  currentSocialNetwork = null;
}

function logInteraction(socialNetwork) {
  const duration = Math.floor((endTime - startTime) / 1000);
  console.log(`Tiempo en ${socialNetwork}: ${duration} segundos`);

  if (!interactions[socialNetwork]) {
    interactions[socialNetwork] = [];
  }
  interactions[socialNetwork].push({ startTime, endTime, duration });

  sendInteractionData({ socialNetwork, startTime, endTime, duration });
}

// Enviar datos al servidor mediante WebSocket
function sendInteractionData(data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
    console.log('Datos enviados exitosamente:', data);
  } else {
    console.error('WebSocket no está conectado.');
  }
}

// Manejar mensajes del servidor
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Mensaje recibido del servidor:', data);
});

socket.addEventListener('open', () => {
  console.log('Conexión WebSocket establecida.');
});

socket.addEventListener('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
});

socket.addEventListener('close', () => {
  console.log('Conexión WebSocket cerrada.');
});
