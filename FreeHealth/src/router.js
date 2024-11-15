// router.js en el cliente
import { loginPage } from "./loginPage.js";
import { logupPage } from "./logupPage.js";
import { agenda } from "../assets/agenda.js";
import { charts } from "../assets/chart.js";
import { limiteTiempo } from "../assets/limitetiempo.js";

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
      agenda();
      break;
    case "/estadisticas":
    case "/pages/estadistica.html":
      await loadPage('/pages/estadistica.html', app);
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
async function isValidSession() {
  try {
    const response = await fetch('http://localhost:3000/auth/session', {
      method: "GET",
      credentials: "include", // Importante para enviar las cookies de sesión
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Invalid session");
    }

    const data = await response.json();
    return data.user ? true : false;
  } catch (error) {
    console.error('Error validating session:', error);
    return false;
  }
}
