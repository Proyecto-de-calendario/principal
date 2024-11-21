export async function editTask(id) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
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
    document.getElementById('task-date').value = task[0].dia;
    document.getElementById('task-time-start').value = task[0].fechaInicio;
    document.getElementById('task-time-end').value = task[0].fechaFin;
    document.getElementById('task-name').value = task[0].nombre;
    document.getElementById('task-priority').value = task[0].prioridad;
    document.getElementById('task-id').value = task[0].idTarea;
    document.getElementById('task-modal').classList.remove('hidden');

    const taskForm = document.getElementById('task-form');
    
    // Remove existing event listeners before adding new one
    taskForm.removeEventListener('submit', handleSubmit);
    taskForm.addEventListener('submit', handleSubmit);

    async function handleSubmit(event) {
      event.preventDefault();

      const taskData = {
        id: document.getElementById('task-id').value, // Ensure id is sent
        name: document.getElementById('task-name').value,
        priority: document.getElementById('task-priority').value,
        startTime: document.getElementById('task-time-start').value,
        endTime: document.getElementById('task-time-end').value,
        date: document.getElementById('task-date').value,
      };
      await updateTask(taskData);
    }
  } catch (error) {
    console.error('Error loading task:', error);
    alert('An error occurred while loading the task. Please try again.');
  }
}

async function updateTask(taskData) {
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

    const updatedTask = await response.json();

    // Close the modal and clear the form upon successful update
    document.getElementById('task-modal').classList.add('hidden');
    document.getElementById('task-form').reset();

    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    alert('An error occurred while updating the task. Please try again.');
  }
}

  