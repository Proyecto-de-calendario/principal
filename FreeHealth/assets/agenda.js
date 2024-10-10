export const agenda = () => {
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('task-modal');
  const openModalBtn = document.getElementById('open-modal');
  const closeModalBtn = modal.querySelector('.close');

  // Abrir el modal al hacer clic en el botón "Añadir Tarea"
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  // Cerrar el modal al hacer clic en el botón de cerrar (X)
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Cerrar el modal cuando se hace clic fuera del contenido del modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});


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
}