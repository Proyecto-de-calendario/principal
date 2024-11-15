export const agenda = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const taskList = document.getElementById('task-list');
      const taskForm = document.getElementById('task-form');
      const taskModal = document.getElementById('task-modal');
      const openModalBtn = document.getElementById('open-modal');
      const closeModal = taskModal.querySelector('.close');

      console.log(openModalBtn)
  
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
        }
      });
  
      // Agregar tarea
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const taskId = document.getElementById('task-id').value;
        const newTask = {
          id: taskId ? parseInt(taskId) : Date.now(),
          date: document.getElementById('task-date').value,
          startTime: document.getElementById('task-time-start').value,
          endTime: document.getElementById('task-time-end').value,
          name: document.getElementById('task-name').value,
          priority: document.getElementById('task-priority').value,
        };
  
        if (taskId) {
          const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
          tasks[taskIndex] = newTask; // Actualizar tarea existente
        } else {
          tasks.push(newTask); // Agregar nueva tarea
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
              
              </button>
            </div>
          `;
  
          taskList.appendChild(taskItem);
  
          // Agregar eventos para editar, eliminar y el nuevo botón
          taskItem.querySelector('.edit-task').addEventListener('click', () => editTask(task.id));
          taskItem.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.id));
          taskItem.querySelector('.extra-action').addEventListener('click', () => handleExtraAction(task.id));
        });
      }
  
      // Editar tarea
      function editTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
          document.getElementById('task-date').value = task.date;
          document.getElementById('task-time-start').value = task.startTime;
          document.getElementById('task-time-end').value = task.endTime;
          document.getElementById('task-name').value = task.name;
          document.getElementById('task-priority').value = task.priority;
          document.getElementById('task-id').value = task.id;
  
          taskModal.classList.remove('hidden'); // Abrir el modal en modo de edición
        }
      }
  
      // Eliminar tarea
      function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
      }
  
      // Acción para el nuevo botón
      function handleExtraAction(id) {
        const task = tasks.find(t => t.id === id);
        alert(`Acción extra para la tarea: ${task.name}`);
      }
  
      // Limpiar formulario después de agregar o editar una tarea
      function clearForm() {
        document.getElementById('task-id').value = '';
        taskForm.reset();
      }
    });
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const currentDateElement = document.querySelector('.current-date');
    const calendarElement = document.querySelector('.calendar');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
  
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth(); // Mes actual
  
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    // Función para renderizar el calendario
    function renderCalendar() {
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Primer día del mes
      const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Último día del mes
      const lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // Último día del mes anterior
  
      // Actualizar encabezado con el mes y año
      currentDateElement.textContent = `${months[currentMonth]} ${currentYear}`;
  
      // Limpiar los días anteriores
      calendarElement.innerHTML = `
        <div class="weeks font-bold">Dom</div>
        <div class="weeks font-bold">Lun</div>
        <div class="weeks font-bold">Mar</div>
        <div class="weeks font-bold">Mie</div>
        <div class="weeks font-bold">Jue</div>
        <div class="weeks font-bold">Vie</div>
        <div class="weeks font-bold">Sab</div>
      `;
  
      // Días del mes anterior
      for (let i = firstDayOfMonth; i > 0; i--) {
        calendarElement.innerHTML += `<div class="day text-gray-400">${lastDayOfLastMonth - i + 1}</div>`;
      }
  
      // Días del mes actual
      for (let i = 1; i <= lastDateOfMonth; i++) {
        let dayClass = 'day';
        
        // Si es el día actual, agregar la clase de "resaltar"
        if (
          i === currentDate.getDate() &&
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear()
        ) {
          dayClass += ' bg-blue-500 text-white rounded-full';
        }
  
        calendarElement.innerHTML += `<div class="${dayClass}">${i}</div>`;
      }
  
      // Días del mes siguiente
      const totalCells = firstDayOfMonth + lastDateOfMonth;
      const nextDays = 7 - (totalCells % 7);
  
      for (let i = 1; i <= nextDays && nextDays < 7; i++) {
        calendarElement.innerHTML += `<div class="day text-gray-400">${i}</div>`;
      }
    }
  
    // Cambiar al mes anterior
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  
    // Cambiar al mes siguiente
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  
    // Renderizar el calendario inicial
    renderCalendar();
  });