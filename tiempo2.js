let timeSpent = 0;  // Tiempo total de interacción
let isInteracting = false;  // Estado de interacción
let interval;

// Función que inicia el contador de tiempo
const startInteraction = () => {
    if (!isInteracting) {
        isInteracting = true;
        interval = setInterval(() => {
            timeSpent += 1;
        }, 1000);  // Incrementa el tiempo cada segundo
    }
};

// Función que detiene el contador de tiempo
const stopInteraction = () => {
    if (isInteracting) {
        isInteracting = false;
        clearInterval(interval);  // Detiene el incremento del tiempo
    }
};

// Agrega los eventos de interacción
document.addEventListener('mousedown', startInteraction);
document.addEventListener('mouseup', stopInteraction);
document.addEventListener('mousemove', startInteraction);
document.addEventListener('mouseleave', stopInteraction);
document.addEventListener('keydown', startInteraction);
document.addEventListener('keyup', stopInteraction);
document.addEventListener('scroll', startInteraction);
document.addEventListener('touchstart', startInteraction);
document.addEventListener('touchend', stopInteraction);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopInteraction();
    } else {
        startInteraction();
    }
});

// Cuando el usuario cierra o navega fuera de la página
window.addEventListener('beforeunload', (event) => {
    console.log(`Tiempo en la red social: ${timeSpent} segundos`);
    event.preventDefault();  // Necesario para algunos navegadores
    event.returnValue = '';  // Asegura que el navegador maneje el evento beforeunload
});

window.addEventListener('pagehide', () => {
    console.log(`Tiempo total antes de cerrar o cambiar de página: ${timeSpent} segundos`);
});
