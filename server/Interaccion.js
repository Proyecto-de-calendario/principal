// Enviar el tiempo activo al backend cuando el usuario deje de interactuar
function stopTimer() {
    if (isUserActive) {
        endTime = new Date();
        totalActiveTime += (endTime - startTime) / 1000;
        isUserActive = false;

        console.log(`Tiempo activo acumulado: ${totalActiveTime} segundos`);

        // Enviar los datos al servidor
        fetch('/api/save-active-time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ activeTime: totalActiveTime }),
        }).then(response => {
            console.log('Tiempo activo guardado en el servidor');
        }).catch(error => {
            console.error('Error al guardar el tiempo activo:', error);
        });
    }
}
