import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { initCalendar, showModal, closeModal, bindCloseModalEvent } from "../assets/chart(calendar).js";
import { grafico } from "../assets/charts(date).js";
import { limiteTiempo } from "../assets/limitetiempo.js";
import { isValidSession } from "../session.js";
import { agenda } from "../assets/agenda.js";
import { renderCalendar } from "../assets/calendar.js";
import { trackerData } from "./saveTime.js";
import { loadTasks } from "../assets/loadTasks.js";
import { timeData } from "../assets/timedata.js";

export async function router(path, app) {
  app.innerHTML = ''; // Limpiar contenido anterior

  // Verificar sesión para rutas protegidas
  const protectedRoutes = ["/tiempo", "/agenda", "/estadisticas"];
  if (protectedRoutes.includes(path) && !(await isValidSession())) {
    app.appendChild(loginPage());
    return;
  }

  switch (path) {
    case "/":
      app.appendChild(loginPage());
      break;
    case "/signup":
      app.appendChild(logupPage());
      break;
    case "/home":
    case "/pages/landingPage.html":
      await loadPage('/pages/landingPage.html', app);
      break;
    case "/tiempo":
    case "/pages/limitetiempo.html":
      await loadPage('/pages/limitetiempo.html', app);
      limiteTiempo();
      break;
    case "/agenda":
    case "/pages/agenda.html":
      await loadPage('/pages/agenda.html', app);
      try {
        const tasksData = await loadTasks();
        renderCalendar(tasksData);
        agenda(tasksData);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
      break;
    case "/estadisticas":
    case "/pages/estadistica.html":
      await loadPage('/pages/estadistica.html', app);
      try {
        const estadistica = await timeData();
        console.log('Datos de estadística:', estadistica);
        if (estadistica) {
          grafico(estadistica); // Llama a la función grafico con los datos obtenidos

          // Inicializar calendario con los datos obtenidos
          const calendarEl = document.getElementById("calendar");
          if (calendarEl) {
            initCalendar(calendarEl, (date) => {
              // Filtra los datos por la fecha seleccionada y actualiza el gráfico
              const filteredData = estadistica.filter(item => item.tiempo_inicio.startsWith(date));
              grafico(filteredData);
              showModal(date);
            });
          } else {
            console.error("No se encontró el elemento 'calendar' en estadistica.html");
          }

          // Manejo de modales
          showModal();
          closeModal();
          bindCloseModalEvent();
        } else {
          console.error("No se recibieron datos de estadísticas");
        }
      } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
      }
      break;
    case "/nosotros":
    case "/pages/about.html":
      await loadPage('/pages/about.html', app);
      break;
    default:
      window.location.href = "/home";
      break;
  }

  const sessionValid = await isValidSession();
  if (sessionValid) {
    trackerData();
  } else {
    console.log('No se pudo ejecutar trackerData, la sesión no es válida.');
  }
}

async function loadPage(url, app) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    app.innerHTML = html;
  } catch (error) {
    console.error('Error loading page:', error);
  }
}
