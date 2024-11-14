import { Chart, registerables } from 'chart.js';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export const calendar = () => {
  document.addEventListener("DOMContentLoaded", () => {
    Chart.register(...registerables);

    // Configuración del calendario
    const calendarEl = document.getElementById("calendar");
    if (!calendarEl) {
      console.error("Elemento 'calendar' no encontrado.");
      return;
    }

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      dateClick: function(info) {
        grafico(info.dateStr); // Renderiza los gráficos con la fecha seleccionada
        showModal(info.dateStr); // Llama a la función para mostrar el modal
      }
    });

    calendar.render();

    // Función para mostrar el modal
    function showModal(date) {
      const modal = document.getElementById("modal");
      if (!modal) {
        console.error("Elemento 'modal' no encontrado.");
        return;
      }

      modal.classList.remove("hidden");

      // Actualiza el título de la ventana modal con la fecha seleccionada
      document.querySelector("#modal h2").innerText = `Estadísticas de Uso - ${date}`;
    }

    // Función para cerrar el modal
    const closeModalBtn = document.getElementById("closeModal");
    if (!closeModalBtn) {
      console.error("Elemento 'closeModal' no encontrado.");
      return;
    }

    closeModalBtn.addEventListener("click", () => {
      document.getElementById("modal").classList.add("hidden");
    });
  });
};
