import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { agenda } from "../assets/agenda.js";
import { charts } from "../assets/chart.js";

export async function router(path, app) {
  if (path !== "/") {
    const result = await validateSession();

    if (!result) {
      window.location.pathname = "/";
      return;
    }
  }

  app.innerHTML = ''; // Limpiar contenido anterior

  if (path === "/") {
    app.appendChild(loginPage());
  } else if (path === "/signup") {
    app.appendChild(logupPage());
  } else if (path === "/home") {
    window.location.pathname = '/pages/landingPage.html';
  } else if (path === "/setTimeout") {
    window.location.pathname = '/pages/limitetiempo.html';
  } else if (path === "/agenda") {
    window.location.pathname = '/pages/agenda.html';
    agenda();
  } else if (path === "/estadisticas") {
    window.location.pathname = '/pages/estadistica.html';
    charts();
  }
}

const validateSession = async () => {
  const response = await fetch("http://localhost:3000/users/session", {
    method: "GET",
    credentials: "include",
  });
  return response.ok;
};
