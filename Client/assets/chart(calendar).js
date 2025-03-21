import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; // Importar idioma español

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

  // Función para convertir minutos a horas y minutos
  const convertMinutesToHM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  // Crear eventos con colores según la duración
  const events = Object.entries(durationsByDay).map(([date, totalDuration]) => {
    let color;
    if (totalDuration < 60) color = "#10B981"; // Verde para menos de 1 hora
    else if (totalDuration < 180) color = "#F59E0B"; // Amarillo para 1-3 horas
    else color = "#EF4444"; // Rojo para más de 3 horas

    return {
      title: `${convertMinutesToHM(Math.round(totalDuration))}`, // Mostrar duración total en horas y minutos
      start: date,
      backgroundColor: color,
      borderColor: color,
    };
  });

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    locale: esLocale, // Configurar idioma a español
    events,
    dateClick: (info) => {
      if (typeof onDateClick === "function") {
        const selectedDateData = data.filter((item) =>
          item.tiempo_inicio.startsWith(info.dateStr)
        );
        onDateClick(selectedDateData);
      }
    },
    headerToolbar: {
      left: 'prev,next today', // Mantener la barra con el botón "Hoy"
      center: 'title',
      right: 'dayGridMonth', // Vista mensual
    },
  });

  calendar.render();
};
