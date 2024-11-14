import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { agenda } from "../assets/agenda.js";
import { calendar } from "../assets/chart.js";
import { saveTask } from "./guardarTarea.js";
import { grafico } from "../assets/charts(date).js";

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
    case "/home" :
      document.addEventListener("DOMContentLoaded", app);;
      break;
    case "/tiempo":
      window.location.pathname = '/pages/limitetiempo.html';
      
      break;
    case "/agenda" || '/pages/limitetiempo.html':
      window.location.pathname = '/pages/agenda.html';
      document.addEventListener("DOMContentLoaded", agenda,saveTask);
      break;
    case "/estadisticas":
      document.addEventListener("DOMContentLoaded", app.appendChild(calendar(),grafico()));
      break;
    default:
      window.location.href = '/home';
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
