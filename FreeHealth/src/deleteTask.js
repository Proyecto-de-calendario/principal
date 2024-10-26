export async function deleteTask(idTarea) { // Recibe idTarea directamente
  try {
    const response = await fetch(`http://localhost:3000/tasks/${idTarea}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la tarea');
    }
    return true; // Indica que la tarea se eliminó correctamente
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error; // Propaga el error para que pueda ser manejado donde se llama la función
  }
}
