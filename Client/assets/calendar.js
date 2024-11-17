// Definir variables globales
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
const currentDate = new Date();

export function renderCalendar(tasks) {
// Seleccionar elementos del DOM
document.addEventListener('DOMContentLoaded', () => {
  const currentDateElement = document.getElementById('current-date');
  const calendarElement = document.getElementById('calendar');

  // Asegurarse de que los elementos no son null
  if (!currentDateElement) {
    console.error("No se encontró el elemento 'current-date'");
    return;
  }
  if (!calendarElement) {
    console.error("No se encontró el elemento 'calendar'");
    return;
  }

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Primer día del mes
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Último día del mes
    const lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // Último día del mes anterior

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

      // Revisar si hay tareas en este día
      const currentDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      if (tasks.some(task => task.fechaInicio.split('T')[0] === currentDateStr)) {
        dayClass += ' bg-yellow-500'; // Clase CSS especial para días con tareas
      }

      calendarElement.innerHTML += `<div class="${dayClass}">${i}</div>`;
    }

    // Días del mes siguiente
    const totalCells = firstDayOfMonth + lastDateOfMonth;
    const nextDays = 7 - (totalCells % 7);

    for (let i = 1; i <= nextDays && nextDays < 7; i++) {
      calendarElement.innerHTML += `<div class="day text-gray-400">${i}</div>`;
    }

  // Selecciona los botones después de que el DOM esté listo
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(tasks); // Asegúrate de pasar las tareas como parámetro
    });
  } else {
    console.error("No se encontró el botón 'prev'");
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(tasks); // Asegúrate de pasar las tareas como parámetro
    });
  } else {
    console.error("No se encontró el botón 'next'");
  }
});
}
