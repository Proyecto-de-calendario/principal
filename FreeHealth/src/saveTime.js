const sendData = async (data) => {
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
  
  window.addEventListener('storage', (event) => {
    if (event.key === 'interactions') {
      const storedInteractions = JSON.parse(event.newValue);
      sendData(storedInteractions);
    }
  });
  