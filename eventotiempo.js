let timeSpent = 0;
let isInteracting = false;
let interval;

function startInteraction() {
    if (!isInteracting) {
        isInteracting = true;
        interval = setInterval(() => {
            timeSpent += 1;
        }, 1000);
    }
}

function stopInteraction() {
    if (isInteracting) {
        isInteracting = false;
        clearInterval(interval);
    }
}

// Eventos de mouse
document.addEventListener('mousedown', startInteraction);
document.addEventListener('mouseup', stopInteraction);
document.addEventListener('mousemove', startInteraction);
document.addEventListener('mouseleave', stopInteraction);

// Eventos de teclado
document.addEventListener('keydown', startInteraction);
document.addEventListener('keyup', stopInteraction);

// Evento de scroll
document.addEventListener('scroll', startInteraction);

// Eventos táctiles (móviles)
document.addEventListener('touchstart', startInteraction);
document.addEventListener('touchend', stopInteraction);

// Visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopInteraction();
    } else {
        startInteraction();
    }
});

// Registrar el tiempo antes de salir de la página
window.addEventListener('beforeunload', () => {
    console.log(`Time spent on the social network: ${timeSpent} seconds`);
});
