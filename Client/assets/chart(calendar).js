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

  // Calcular duración total por día
  const durationsByDay = data.reduce((acc, item) => {
    const date = item.tiempo_inicio.split("T")[0]; // Obtener solo la fecha (YYYY-MM-DD)
    const duration =
      (new Date(item.tiempo_final) - new Date(item.tiempo_inicio)) / 60000; // Duración en minutos
    acc[date] = (acc[date] || 0) + duration;
    return acc;
  }, {});

  // Crear eventos con colores según la duración
  const events = Object.entries(durationsByDay).map(([date, totalDuration]) => {
    let color;
    if (totalDuration < 60) color = "#10B981"; // Verde para menos de 1 hora
    else if (totalDuration < 180) color = "#F59E0B"; // Amarillo para 1-3 horas
    else color = "#EF4444"; // Rojo para más de 3 horas

    return {
      title: `${Math.round(totalDuration)} min`, // Mostrar duración total
      start: date,
      backgroundColor: color,
      borderColor: color,
    };
  });

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    events,
    dateClick: (info) => {
      if (typeof onDateClick === "function") {
        const selectedDateData = data.filter((item) =>
          item.tiempo_inicio.startsWith(info.dateStr)
        );
        onDateClick(selectedDateData);
      }
    },
  });

  calendar.render();
};

