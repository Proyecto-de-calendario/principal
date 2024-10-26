export function renderTasks(tasks, taskList, editTask, deleteTask) {
    taskList.innerHTML = ''; // Clear the list before rendering
  
    tasks.forEach((task) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item border p-4 mb-2 rounded';
      taskItem.innerHTML = `
        <h3 class="text-lg font-semibold">${task.nombre}</h3>
        <p><strong>Fecha Inicio:</strong> ${new Date(task.fechaInicio).toLocaleString()}</p>
        <p><strong>Fecha Fin:</strong> ${new Date(task.fechaFin).toLocaleString()}</p>
        <p><strong>Prioridad:</strong> ${task.prioridad}</p>
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
      taskItem.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.idTarea));
    });
  }
  