import { saveTask } from "../src/guardarTarea"; // Importar correctamente saveTask si es necesario

export const agenda = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskModal = document.getElementById('task-modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModal = taskModal.querySelector('.close');
    let tasks = [];

    // Abrir el modal al hacer clic en el botón "Añadir Tarea"
    openModalBtn.addEventListener('click', () => {
      taskModal.classList.remove('hidden');
    });

    // Cerrar el modal al hacer clic en el botón de cerrar (X)
    closeModal.addEventListener('click', () => {
      taskModal.classList.add('hidden');
      clearForm();
    });

    // Cerrar el modal cuando se hace clic fuera del contenido del modal
    window.addEventListener('click', (e) => {
      if (e.target === taskModal) {
        taskModal.classList.add('hidden');
        clearForm();
      }
    });

    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const taskData = {
        nombre: document.getElementById('task-name').value,
        prioridad: document.getElementById('task-priority').value,
        fechaInicio: document.getElementById('task-time-start').value,
        fechaFin: document.getElementById('task-time-end').value,
        dia: document.getElementById('task-date').value
      };
    
      if (!taskData.nombre || !taskData.prioridad || !taskData.fechaInicio || !taskData.fechaFin || !taskData.dia) {
        alert('Todos los campos son obligatorios');
        return;
      }
    
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
        tasks.push(savedTask); // Agregar nueva tarea
        renderTasks();
        taskModal.classList.add('hidden');
        clearForm();
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
        alert('Hubo un error al guardar la tarea. Intenta nuevamente.');
      return;
        }
      renderTasks();
      taskModal.classList.add('hidden');
      clearForm();
    });

    // Renderizar tareas en el DOM
    function renderTasks() {
      taskList.innerHTML = ''; // Limpiar la lista antes de renderizar
      tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item border p-4 mb-2 rounded'; // Estilo para el item
        taskItem.innerHTML = `
          <h3 class="text-lg font-semibold">${task.name}</h3>
          <p><strong>Fecha:</strong> ${task.date}</p>
          <p><strong>Hora:</strong> ${task.startTime} - ${task.endTime}</p>
          <p><strong>Prioridad:</strong> ${task.priority}</p>
          <div class="flex space-x-4">
            <button class="edit-task bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition ease-in-out duration-300" data-id="${task.id}">
              Editar
            </button>
            <button class="delete-task bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 transition ease-in-out duration-300" data-id="${task.id}">
              Eliminar
            </button>
          </div>
        `;
        taskList.appendChild(taskItem);
        // Agregar eventos para editar y eliminar
        taskItem.querySelector('.edit-task').addEventListener('click', () => editTask(task.id));
        taskItem.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.id));
      });
    }

    // Editar tarea
    async function editTask(id) {
      try {
        // Obtener la tarea de la base de datos
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener la tarea');
        }

        const task = await response.json();

        // Rellenar el formulario con los datos de la tarea
        document.getElementById('task-date').value = task.date;
        document.getElementById('task-time-start').value = task.startTime;
        document.getElementById('task-time-end').value = task.endTime;
        document.getElementById('task-name').value = task.name;
        document.getElementById('task-priority').value = task.priority;
        document.getElementById('task-id').value = task.id;
        taskModal.classList.remove('hidden'); // Abrir el modal en modo de edición
      } catch (error) {
        console.error('Error al obtener la tarea:', error);
        alert('Hubo un error al obtener la tarea. Intenta nuevamente.');
      }
    }

    // Eliminar tarea
    async function deleteTask(id) {
      try {
        // Enviar solicitud de eliminación al servidor
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la tarea');
        }

        // Filtrar las tareas locales y renderizar nuevamente
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        alert('Tarea eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        alert('Hubo un error al eliminar la tarea. Intenta nuevamente.');
      }
    }

    // Limpiar formulario después de agregar o editar una tarea
    function clearForm() {
      document.getElementById('task-id').value = '';
      taskForm.reset();
    }

    // Cargar tareas desde el servidor (si aplica)
    async function loadTasks() {
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const tasksData = await response.json();
        tasks = tasksData; // Asigna las tareas recibidas a la variable tasks
        renderTasks();
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    }

    // Cargar tareas al iniciar la página
    loadTasks();
  });
};
