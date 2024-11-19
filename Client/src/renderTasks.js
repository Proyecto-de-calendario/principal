import { editTask } from './editTasks';
import { deleteTask } from './deleteTask';

export function renderTasks(tasks) {
  const taskList = document.getElementById('task-list');
  if (!taskList) {
    console.error('No se encontró el elemento task-list');
    return;
  }
  taskList.innerHTML = ''; // Limpiar la lista antes de renderizar

  // Mapa para convertir prioridades numéricas a texto
  const priorityMapping = {
    2: 'Alta',
    1: 'Media',
    0: 'Baja'
  };

  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item border p-4 mb-2 rounded'; // Estilo para el item

    taskItem.innerHTML = `
      <h3 class="text-lg font-semibold">${task.nombre}</h3>
      <p><strong>Fecha Inicio:</strong> ${new Date(task.fechaInicio).toLocaleString()}</p>
      <p><strong>Fecha Fin:</strong> ${new Date(task.fechaFin).toLocaleString()}</p>
      <p><strong>Prioridad:</strong> ${priorityMapping[task.prioridad]}</p>
      <p><strong>Día:</strong> ${task.dia}</p>
      <div class="flex space-x-4">
        <button class="edit-task bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition ease-in-out duration-300" data-id="${task.idTarea}">
          Editar
        </button>
        <button class="delete-task bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 transition ease-in-out duration-300" data-id="${task.idTarea}">
          Eliminar
        </button>
      </div>
    `;
    taskList.appendChild(taskItem);

    taskItem.querySelector('.edit-task').addEventListener('click', () => editTask(task.idTarea));
    taskItem.querySelector('.delete-task').addEventListener('click', async () => {
      try {
        await deleteTask(task.idTarea);
        const updatedTasks = tasks.filter(t => t.idTarea !== task.idTarea);
        renderTasks(updatedTasks);
        alert('Tarea eliminada exitosamente');
      } catch (error) {
        alert('Hubo un error al eliminar la tarea. Intenta nuevamente.');
      }
    });
  });
}
