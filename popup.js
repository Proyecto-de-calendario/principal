// Detectar si se usa 'chrome' o 'browser' como API de extensión
const storage = chrome.storage || browser.storage;

document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time');
    const resetButton = document.getElementById('reset');

    // Obtener el tiempo almacenado
    storage.local.get('pageTime', (result) => {
        const totalTime = result.pageTime || 0;
        timeDisplay.textContent = formatTime(totalTime);
    });

    // Formatear el tiempo de milisegundos a horas, minutos y segundos
    function formatTime(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds = seconds % 60;
        minutes = minutes % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    // Reiniciar el tiempo cuando se hace clic en el botón
    resetButton.addEventListener('click', () => {
        storage.local.set({ pageTime: 0 }, () => {
            timeDisplay.textContent = "0h 0m 0s";
        });
    });
});
