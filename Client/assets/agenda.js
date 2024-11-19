import { saveTask } from '../src/saveTasks.js';
import { renderTasks } from '../src/renderTasks.js';
import { loadTasks } from './loadTasks.js';

export async function agenda(tasks) {
  try {
    if (!Array.isArray(tasks)) {
      tasks = []; // Asegúrate de que tasks sea un array
    }
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
      name: document.getElementById('task-name').value,
      priority: priorityMapping[document.getElementById('task-priority').value.toLowerCase()] || 0,
      startTime: document.getElementById('task-time-start').value,
      endTime: document.getElementById('task-time-end').value,
      date: document.getElementById('task-date').value,
    };

    try {
      await saveTask(taskData); // Guardar la tarea después de que el usuario complete el formulario
      document.getElementById('task-modal').classList.add('hidden'); // Cerrar el modal
      clearForm(); // Limpiar el formulario

      // Recargar las tareas después de guardar una nueva tarea
      const newTasks = await loadTasks();
      renderTasks(newTasks);
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  });
}

function clearForm() {
  document.getElementById('task-id').value = '';
  document.getElementById('task-form').reset();
}
