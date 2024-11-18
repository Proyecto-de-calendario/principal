export async function saveTask(taskData) {
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
    return savedTask;
  } catch (error) {
    console.error('Error al guardar la tarea:', error);
  }
}
