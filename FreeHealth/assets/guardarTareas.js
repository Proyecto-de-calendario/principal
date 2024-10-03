import "../style.css";
const taskForm = document.getElementById('task-form');

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  // Aquí puedes obtener los valores de los campos del formulario
  const taskData = {
    dia: document.getElementById('task-date').value,
    horaInicio: document.getElementById('task-time-start').value,
    horaFin: document.getElementById('task-time-end').value,
    tarea: document.getElementById('task-name').value,
    prioridad: document.getElementById('task-priority').value,
  };

  try {
    
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      // La tarea se guardó correctamente
      console.log('Tarea guardada con éxito');
    } else {
      console.error('Error al guardar la tarea:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar datos al servidor:', error);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('open-modal');
  const modal = document.getElementById('task-modal');
  const closeModalBtn = document.querySelector('.close');
  
  // Mostrar modal
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  // Cerrar modal
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Ocultar modal al hacer clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});
