import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { agenda } from "../assets/agenda.js";
import { charts } from "../assets/chart.js";
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
      window.location.pathname = '/pages/landingPage.html';
      break;
    case "/tiempo":
      window.location.pathname = '/pages/limitetiempo.html';
      break;
    case "/agenda":
      window.location.pathname = '/pages/agenda.html';
      document.addEventListener("DOMContentLoaded", agenda);
      break;
    case "/estadisticas":
      window.location.pathname = '/pages/estadistica.html';
      document.addEventListener("DOMContentLoaded", charts);
      break;
    default:
      window.location.pathname = '/pages/landingPage.html';
      break;
  }
}
