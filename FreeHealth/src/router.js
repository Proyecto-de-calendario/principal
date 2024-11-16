import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { initCalendar, showModal, closeModal, bindCloseModalEvent  } from "../assets/chart(calendar).js";
import { saveTask } from "./saveTasks.js";
import { grafico } from "../assets/charts(date).js";
import { limiteTiempo } from "../assets/limitetiempo.js";
import { isValidSession } from "../session.js";
import { agenda } from "../assets/agenda.js";

export async function router(path, app) {
  app.innerHTML = ''; // Limpiar contenido anterior
 // Verificar sesión para rutas protegidas
 const protectedRoutes = [ "/tiempo", "/agenda", "/estadisticas"];
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
      calendarEl();
      agenda();
      saveTask();
      break;
    case "/estadisticas":
    case "/pages/estadistica.html":
      await loadPage('/pages/estadistica.html', app);

      // Inicializar calendario
      const calendarEl = document.getElementById("calendar");
      if (calendarEl) {
        initCalendar(calendarEl, (date) => {
          console.log(`Fecha seleccionada: ${date}`);
        });
      } else {
        console.error("No se encontró el elemento 'calendar' en estadistica.html");
      }

      // Manejo de modales
      showModal();
      closeModal();
      bindCloseModalEvent();

      // Generar gráficos
      grafico();
      break;
    case "/nosotros":
    case "/pages/about.html":
      await loadPage('/pages/about.html', app);
      break;
    default:
      window.location.href = "/home";
      break;
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
