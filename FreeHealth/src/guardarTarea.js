export const saveTask = () => {
  const taskForm = document.getElementById('task-form');
  
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const taskData = {
      dia: document.getElementById('task-date').value,
      horaInicio: document.getElementById('task-time-start').value,
      horaFin: document.getElementById('task-time-end').value,
      tarea: document.getElementById('task-name').value,
      prioridad: document.getElementById('task-priority').value,
    };
console.log(taskData);
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log('Tarea guardada con éxito');
        // Resetea el formulario después de guardar la tarea
        taskForm.reset();
        // Mostrar un mensaje de éxito al usuario
        alert('Tarea guardada con éxito');
      } else {
        console.error('Error al guardar la tarea:', response.statusText);
        alert('Error al guardar la tarea. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      alert('Error al enviar datos al servidor. Intenta de nuevo.');
    }
  });
};


export const tasks = async () => {
  try {
  const response = await fetch('http://localhost:3000/tasks', {
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },

  });
  console.log(response);
  } catch (error){
    console.log(error);
  }

}