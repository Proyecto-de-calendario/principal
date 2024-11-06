let socialNetwork = null;

document.getElementById('webForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const timeLimitHours = parseInt(document.getElementById('timeLimitHours').value);
  const timeLimitMinutes = parseInt(document.getElementById('timeLimitMinutes').value);
  browser.runtime.sendMessage({ action: "setTimeLimit", hours: timeLimitHours, minutes: timeLimitMinutes });
  
});
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "getSocialNetwork") {
    const url = window.location.href;
    socialNetwork = getSocialNetwork(url);
    browser.runtime.sendMessage({ action: "socialNetwork", socialNetwork });
  } else if (message.action === "logTime") {
    console.log(`Tiempo en la red social ${socialNetwork}: ${message.timeSpent} segundos`);
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
