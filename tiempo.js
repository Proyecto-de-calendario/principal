let startTime, endTime;
let totalActiveTime = 0;
let isUserActive = false;
let inactivityTimeout;

// Función para comenzar a medir el tiempo activo
function startTimer() {
    if (!isUserActive) {
        isUserActive = true;
        startTime = new Date();
    }
}

// Función para detener el cronómetro y sumar el tiempo activo
function stopTimer() {
    if (isUserActive) {
        endTime = new Date();
        totalActiveTime += (endTime - startTime) / 1000; // Tiempo en segundos
        isUserActive = false;
        console.log(`Tiempo activo acumulado: ${totalActiveTime} segundos`);
    }
}

// Detectar eventos de interacción del usuario
function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    startTimer();
    
    // Si no hay actividad en 30 segundos, detiene el cronómetro
    inactivityTimeout = setTimeout(stopTimer, 30000);
}

// Eventos de interacción que reinician el temporizador de inactividad
['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
    window.addEventListener(event, resetInactivityTimeout);
});

// Detectar cuando la pestaña está oculta o visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopTimer(); // Pausar el tiempo si el usuario cambia de pestaña
    } else {
        startTimer(); // Reiniciar el cronómetro cuando la pestaña está activa
    }
});

// Iniciar el temporizador la primera vez
resetInactivityTimeout();
