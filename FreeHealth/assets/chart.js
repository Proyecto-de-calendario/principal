import { Chart, registerables } from 'chart.js';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


export const charts = () => {
  document.addEventListener("DOMContentLoaded", () => {
    Chart.register(...registerables);

    // Configuración del calendario
  const calendarEl = document.getElementById("calendar");
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: function(info) {
      // Mostrar una ventana modal o actualizar los gráficos para la fecha seleccionada
      charts(info.dateStr); // Llama a charts con la fecha seleccionada
      showModal(info.dateStr); // Función para mostrar el modal
    }
  });

calendar.render();
  });

// Función para mostrar el modal (si no está configurado previamente)
function showModal(date) {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  // Actualiza el título de la ventana modal con la fecha seleccionada
  document.querySelector("#modal h2").innerText = `Estadísticas de Uso - ${date}`;
}

// Función para cerrar el modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});
  }
