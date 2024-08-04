const token = localStorage.getItem('userToken');
const id = localStorage.getItem('idUser');
async () => {
try {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error(`HTTP error! Status: ${response.status}`);
    
    throw error;
  }

  const data = await response.json();
  const HTML =+ '<h3>'+ data.nombre +'</h3>';
  document.getElementsByClassName("name").innerHTML = HTML;

} catch (error) {
  console.error('Error interno del servidor:', error);
  
  alert('se produjo un error al obtener su información. Por favor, inténtelo de nuevo más tarde.');
}
}