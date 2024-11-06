import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { agenda } from "../assets/agenda.js";
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
      await loadPage('/pages/landingPage.html', app);
      break;
    case "/tiempo":
      await loadPage('/pages/limitetiempo.html', app);
      limiteTiempo();
      break;
    case "/agenda":
      await loadPage('/pages/agenda.html', app);
      agenda();
      break;
    case "/estadisticas":
      await loadPage('/pages/estadistica.html', app);
      charts();
      break;
    default:
      await loadPage('/pages/landingPage.html', app);
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
