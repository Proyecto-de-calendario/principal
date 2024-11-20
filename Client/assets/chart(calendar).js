import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export const initCalendar = (calendarEl, onDateClick, data) => {
  if (!calendarEl) {
    throw new Error("Elemento 'calendar' no encontrado.");
  }

  const events = data.map(item => ({
    start: item.tiempo_inicio,
    end: item.tiempo_final
  }));

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events,
    dateClick: (info) => {
      if (typeof onDateClick === "function") {
        const selectedDateData = data.filter(item => item.tiempo_inicio.startsWith(info.dateStr));
        onDateClick(selectedDateData);
      }
    },
  });

  calendar.render();
};

export const showModal = (date) => {
  const modal = document.getElementById("modal");
  if (!modal) {
    throw new Error("Elemento 'modal' no encontrado.");
  }

  modal.classList.remove("hidden");
  const modalTitle = modal.querySelector("h2");
  if (modalTitle) {
    modalTitle.textContent = `Estadísticas de Uso - ${date}`;
  }
};

export const closeModal = () => {
  const modal = document.getElementById("modal");
  if (!modal) {
    throw new Error("Elemento 'modal' no encontrado.");
  }

  modal.classList.add("hidden");
};

export const bindCloseModalEvent = () => {
  const closeModalButton = document.getElementById("closeModal");
  if (!closeModalButton) {
    throw new Error("Elemento 'closeModal' no encontrado.");
  }

  closeModalButton.addEventListener("click", closeModal);
};
