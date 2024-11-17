export async function loadTasks() {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Error al cargar las tareas');
      }
      const tasksData = await response.json();
      return tasksData[0];
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      throw error;
    }
  }