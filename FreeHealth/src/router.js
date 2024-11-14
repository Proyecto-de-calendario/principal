import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { agenda } from "../assets/agenda.js";
import { calendar } from "../assets/chart.js";
import { saveTask } from "./guardarTarea.js";
import { grafico } from "../assets/charts(date).js";
import { charts } from "../assets/chart.js";
import { limiteTiempo } from "../assets/limitetiempo.js";
import { validateSession } from "../session.js";

export async function router(path, app) {
  app.innerHTML = ''; // Limpiar contenido anterior

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
      agenda();
      break;
    case "/estadisticas":
    case "/pages/estadistica.html":
      await loadPage('/pages/estadistica.html',app);
      app.appendChild(charts());
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
