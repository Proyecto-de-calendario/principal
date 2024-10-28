import { saveTask } from '../src/saveTasks.js';
import { editTask } from '../src/editTasks.js';
import { deleteTask } from '../src/deleteTask.js';

export function agenda() {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const tasks = await loadTasks();
      renderTasks(tasks);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }

    document.getElementById('open-modal').addEventListener('click', () => {
      document.getElementById('task-modal').classList.remove('hidden');
      saveTask(); // Llama a saveTask solo cuando necesites guardar una tarea nueva
    });

    document.querySelector('.close').addEventListener('click', () => {
      document.getElementById('task-modal').classList.add('hidden');
      clearForm();
    });

    window.addEventListener('click', (e) => {
      if (e.target === document.getElementById('task-modal')) {
        document.getElementById('task-modal').classList.add('hidden');
        clearForm();
      }
    });
  });

  function clearForm() {
    document.getElementById('task-id').value = '';
    document.getElementById('task-form').reset();
  }

  async function loadTasks() {
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
      return tasksData;
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      throw error;
    }
  }

  function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Limpiar la lista antes de renderizar
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item border p-4 mb-2 rounded'; // Estilo para el item
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
      taskItem.querySelector('.delete-task').addEventListener('click', async () => {
        try {
          await deleteTask(task.idTarea);
          tasks = tasks.filter(t => t.idTarea !== task.idTarea);
          renderTasks(tasks);
          alert('Tarea eliminada exitosamente');
        } catch (error) {
          alert('Hubo un error al eliminar la tarea. Intenta nuevamente.');
        }
      });
    });
  }
}
