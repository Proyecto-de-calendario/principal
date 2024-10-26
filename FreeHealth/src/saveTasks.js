export async function saveTask(taskData) {
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

  return await response.json();
}
