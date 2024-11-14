
document.getElementById('webForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const pageName = document.getElementById('pageName').value;
  const timeLimitHours = parseInt(document.getElementById('timeLimitHours').value, 10);
  const timeLimitMinutes = parseInt(document.getElementById('timeLimitMinutes').value, 10);
  const timeLimit = (timeLimitHours * 60 * 60 * 1000) + (timeLimitMinutes * 60 * 1000);

  alert(`Has establecido un límite de tiempo de ${timeLimitHours} horas y ${timeLimitMinutes} minutos para ${pageName}.`);

  // Enviar el límite de tiempo al script de fondo
  browser.runtime.sendMessage({
    action: 'setTimeLimit',
    pageName: pageName,
    timeLimit: timeLimit
  });
});
export const tracker = () => {
// Continuación del EventListener para recibir mensajes en el script de contenido
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "getSocialNetwork") {
    const url = window.location.href;
    const socialNetwork = getSocialNetwork(url);
    browser.runtime.sendMessage({ action: "socialNetwork", socialNetwork });
  } else if (message.action === "logTime") {
    console.log(`Tiempo en la red social ${message.socialNetwork}: ${message.timeSpent} segundos`);
    // Aquí puedes enviar los datos al servidor o guardarlos en el almacenamiento
  }
});

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
}