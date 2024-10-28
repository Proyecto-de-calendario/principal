export async function saveTask() {
  const taskForm = document.getElementById('task-form');
  
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const taskData = {
      name: document.getElementById('task-name').value,
      priority: document.getElementById('task-priority').value,
      startTime: document.getElementById('task-time-start').value,
      endTime: document.getElementById('task-time-end').value,
      date: document.getElementById('task-date').value,
    };

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la tarea');
      }

      const savedTask = await response.json();

      // Cerrar el modal y limpiar el formulario
      document.getElementById('task-modal').classList.add('hidden');
      taskForm.reset();

      // Aquí puedes realizar alguna acción adicional con la tarea guardada, como agregarla a la lista de tareas
      return savedTask;
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  });
}
