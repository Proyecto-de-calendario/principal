export async function editTask() {
    try {
      const response = await fetch(`http://localhost:3000/tasks`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to load task');
      }
      const task = await response.json();
      console.log(task);
      document.getElementById('task-date').value = task[0].dia;
      document.getElementById('task-time-start').value = task[0].fechaInicio;
      document.getElementById('task-time-end').value = task[0].fechaFin;
      document.getElementById('task-name').value = task[0].nombre;
      document.getElementById('task-priority').value = task[0].prioridad;
      document.getElementById('task-id').value = task[0].idTarea;
      document.getElementById('task-modal').classList.remove('hidden');
    } catch (error) {
      console.error('Error loading task:', error);
      alert('An error occurred while loading the task. Please try again.');
    }
  }
  
  export async function updateTask(id, taskData) {
    try {
      const response = await fetch(`http://localhost:3000/tasks`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error('Task update failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('An error occurred while updating the task. Please try again.');
    }
  }
  