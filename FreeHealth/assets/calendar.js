// calendar.js

export function setupCalendar() {
    const currentDate = new Date();
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const currentDateDisplay = document.querySelector('.current-date');
    const daysContainer = document.querySelector('.calendar');
  
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
  
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    function renderCalendar() {
      currentDate.setFullYear(year, month);
      currentDateDisplay.textContent = `${months[month]} ${year}`;
      daysContainer.innerHTML = '';
  
      const firstDayIndex = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month + 1, 0).getDate();
  
      for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        daysContainer.appendChild(emptyDay);
      }
  
      for (let i = 1; i <= lastDay; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        daysContainer.appendChild(day);
      }
    }
  
    prevBtn.addEventListener('click', () => {
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
      renderCalendar();
    });
  
    nextBtn.addEventListener('click', () => {
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      renderCalendar();
    });
  
    renderCalendar();
  }
  