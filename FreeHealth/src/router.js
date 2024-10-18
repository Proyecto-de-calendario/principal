import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { agenda } from "../assets/agenda.js";
import { charts } from "../assets/chart.js";
import { saveTask } from "./guardarTarea.js";

export async function router(path, app) {
//  if (path !== "/" || path !== "/home") {
//    const result = await validateSession();
//    if (!result) {
//      window.location.pathname = "/";
//      return;
//  }
//}

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
      document.addEventListener("DOMContentLoaded", agenda,saveTask);
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

const validateSession = async () => {
  const response = await fetch("http://localhost:3000/users/session", {
    method: "GET",
    credentials: "include",
  });
  return response.ok;
};
