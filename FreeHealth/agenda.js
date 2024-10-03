document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a elementos del DOM
    const currentDateElement = document.querySelector(".current-date");
    const daysContainer = document.querySelector(".days");
    const prevNextIcons = document.querySelectorAll(".icons span");
    const taskModal = document.getElementById("task-modal");
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.querySelector(".close");
    const taskForm = document.getElementById("task-form");
    const taskListContainer = document.getElementById("task-list");
  
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
  
    // Meses del año
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    // Mostrar calendario
    function renderCalendar() {
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Primer día del mes
      const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Último día del mes
      const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(); // Último día de la semana del mes
      const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // Último día del mes anterior
  
      let days = "";
  
      // Días del mes anterior
      for (let i = firstDayOfMonth; i > 0; i--) {
        days += `<div class="day prev-month">${lastDateOfLastMonth - i + 1}</div>`;
      }
  
      // Días del mes actual
      for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "today" : "";
        days += `<div class="day ${isToday}">${i}</div>`;
      }
  
      // Días del mes siguiente
      for (let i = lastDayOfMonth; i < 6; i++) {
        days += `<div class="day next-month">${i - lastDayOfMonth + 1}</div>`;
      }
  
      currentDateElement.textContent = `${months[currentMonth]} ${currentYear}`;
      daysContainer.innerHTML = days;
    }
  
    // Funcionalidad de los botones para cambiar el mes
    prevNextIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;
  
        if (currentMonth < 0 || currentMonth > 11) {
          date = new Date(currentYear, currentMonth);
          currentYear = date.getFullYear();
          currentMonth = date.getMonth();
        } else {
          date = new Date();
        }
  
        renderCalendar();
      });
    });
  
    renderCalendar(); // Inicializa el calendario
  
    // Abrir el modal para agregar tarea
    openModalBtn.addEventListener("click", () => {
      taskModal.classList.remove("hidden");
    });
  
    // Cerrar el modal de tarea
    closeModalBtn.addEventListener("click", () => {
      taskModal.classList.add("hidden");
    });
  
    // Guardar la tarea
    taskForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Obtener valores del formulario
      const taskDate = document.getElementById("task-date").value;
      const taskStartTime = document.getElementById("task-time-start").value;
      const taskEndTime = document.getElementById("task-time-end").value;
      const taskName = document.getElementById("task-name").value;
      const taskPriority = document.getElementById("task-priority").value;
  
      // Crear un elemento de tarea
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item", "p-2", "bg-gray-100", "rounded-lg", "mb-2", "shadow");
  
      taskItem.innerHTML = `
        <div class="flex justify-between">
          <div>
            <h4 class="text-lg font-semibold">${taskName}</h4>
            <p class="text-sm">Fecha: ${taskDate} | Hora: ${taskStartTime} - ${taskEndTime}</p>
            <p class="text-sm">Prioridad: ${taskPriority}</p>
          </div>
          <button class="delete-task bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
        </div>
      `;
  
      // Añadir la tarea a la lista
      taskListContainer.appendChild(taskItem);
  
      // Limpiar el formulario y cerrar el modal
      taskForm.reset();
      taskModal.classList.add("hidden");
  
      // Funcionalidad de eliminar tarea
      taskItem.querySelector(".delete-task").addEventListener("click", () => {
        taskItem.remove();
      });
    });
  });




  