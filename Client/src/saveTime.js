// Conectar al servidor WebSocket
export const trackerData = () =>  {
const socket = new WebSocket('ws://localhost:4000');

// Manejar mensajes del servidor
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Mensaje recibido del servidor:', data);
  alert(`Red social: ${data.socialNetwork}, Inicio: ${data.startTime}, Fin: ${data.endTime}, Duración: ${data.duration} segundos`);
  sendData(data);
});

socket.addEventListener('open', () => {
  console.log('Conexión WebSocket establecida en freehealth');
});

socket.addEventListener('error', (error) => {
  console.error('Error en la conexión WebSocket en freehealth:', error);
});

socket.addEventListener('close', () => {
  console.log('Conexión WebSocket cerrada en freehealth');
});

}

export const sendData = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/perfiles", {
        method: "POST",
        credentials: "include", // Importante para enviar las cookies de sesión
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Data sent to server successfully:', responseData);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };