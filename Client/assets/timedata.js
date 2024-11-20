// Función para obtener los datos desde el servidor
export const timeData = async () => {
    try {
      const response = await fetch("http://localhost:3000/perfiles", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Datos recibidos:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error al obtener datos del servidor:', error);
      throw error;
    }
  };
