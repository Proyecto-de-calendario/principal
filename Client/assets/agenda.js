import { saveTask } from '../src/saveTasks.js';
import { editTask } from '../src/editTasks.js'; // Importar la función de editar tarea
import { renderTasks } from '../src/renderTasks.js';
import { loadTasks } from './loadTasks.js';

export async function agenda(tasks) {
  try {
    renderTasks(tasks); // Renderiza las tareas inicialmente
  } catch (error) {
    console.error('Error al cargar las tareas:', error);
  }

  document.getElementById("open-modal").addEventListener('click', () => {
    document.getElementById('task-modal').classList.remove('hidden');
    clearForm(); // Limpiar el formulario al abrir el modal
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

  document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto de enviar el formulario

    // Convertir la prioridad a un valor numérico
    const priorityMapping = {
      "alta": 2,
      "media": 1,
      "baja": 0
    };

    const taskData = {
      id: document.getElementById('task-id').value, // Obtén el id de la tarea a editar (si lo hay)
      name: document.getElementById('task-name').value,
      priority: priorityMapping[document.getElementById('task-priority').value.toLowerCase()] || 0,
      startTime: document.getElementById('task-time-start').value,
      endTime: document.getElementById('task-time-end').value,
      date: document.getElementById('task-date').value,
    };

    try {
      if (taskData.id) {
        // Si la tarea tiene un ID, se está editando
        await editTask(taskData.id); // Editar la tarea
      } else {
        // Si no tiene ID, es una tarea nueva
        await saveTask(taskData); // Guardar la tarea
      }

      document.getElementById('task-modal').classList.add('hidden'); // Cerrar el modal
      clearForm(); // Limpiar el formulario

      // Recargar las tareas después de guardar o editar una tarea
      const newTasks = await loadTasks();
      renderTasks(newTasks);
    } catch (error) {
      console.error('Error al guardar o editar la tarea:', error);
    }
  });

  // Agregar evento para cargar la tarea en el modal para editar
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('edit-task')) {
      const taskId = e.target.dataset.id; // Obtener el id de la tarea a editar
      const taskToEdit = tasks.find(task => task.id === taskId); // Buscar la tarea por id

      if (taskToEdit) {
        document.getElementById('task-id').value = taskToEdit.id; // Poner el id de la tarea en el formulario
        document.getElementById('task-name').value = taskToEdit.name;
        document.getElementById('task-priority').value = taskToEdit.priority;
        document.getElementById('task-time-start').value = taskToEdit.startTime;
        document.getElementById('task-time-end').value = taskToEdit.endTime;
        document.getElementById('task-date').value = taskToEdit.date;

        // Abrir el modal para editar la tarea
        document.getElementById('task-modal').classList.remove('hidden');
      }
    }
  });
}

function clearForm() {
  document.getElementById('task-id').value = '';
  document.getElementById('task-form').reset();
}
