// Variables para el tiempo de interacción
let interactionStart;
let interactionTime = 0;

function startInteraction() {
  if (!interactionStart) {
    interactionStart = Date.now();  // Inicia el temporizador de interacción
  }
}

function stopInteraction() {
  if (interactionStart) {
    interactionTime += Date.now() - interactionStart;  // Calcula el tiempo de interacción
    interactionStart = null;
  }
}

// Agrega eventos para monitorear la interacción del usuario
window.addEventListener('focus', startInteraction);
window.addEventListener('blur', stopInteraction);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopInteraction();
  } else {
    startInteraction();
  }
});

// Eventos adicionales para capturar interacción más precisa (clics, teclas, scroll)
document.addEventListener('mousedown', startInteraction);
document.addEventListener('mouseup', stopInteraction);
document.addEventListener('keydown', startInteraction);
document.addEventListener('keyup', stopInteraction);
document.addEventListener('scroll', startInteraction);

window.addEventListener('beforeunload', () => {
  stopInteraction();
  chrome.runtime.sendMessage({ interactionTime });
});
