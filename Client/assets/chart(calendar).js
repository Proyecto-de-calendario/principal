import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export const initCalendar = (calendarEl, onDateClick, data) => {
  if (!calendarEl) {
    throw new Error("Elemento 'calendar' no encontrado.");
  }
  if (!Array.isArray(data)) {
    throw new Error("Los datos no son un array.");
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
