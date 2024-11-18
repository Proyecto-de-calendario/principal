import "./style.css";
import { router } from "./src/router";
import { createLogoutButton } from './src/logout.js';

// Función principal para inicializar la aplicación
async function initializeApp() {
  // Ruta en la que se encuentra el usuario
  const path = window.location.pathname;

  // Elemento en el que se renderizará la página
  const app = document.getElementById("app");

  // Función que se encarga de renderizar la página dependiendo de la ruta
  await router(path, app);

  // Añadir el evento DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    createLogoutButton();
   
  });
}
// Llamar a la función de inicialización
initializeApp();
