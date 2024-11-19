import "./style.css";
import { router } from "./src/router";
import { createLogoutButton } from './src/logout.js';

// Añadir el evento DOMContentLoaded para asegurarse de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
  // Llamar a la función de inicialización una vez que el DOM esté completamente cargado
  await initializeApp();
  createLogoutButton(); // Crear el botón de logout una vez que la app esté inicializada
});

// Función principal para inicializar la aplicación
async function initializeApp() {
  // Ruta en la que se encuentra el usuario
  const path = window.location.pathname;

  // Elemento en el que se renderizará la página
  const app = document.getElementById("app");

  // Función que se encarga de renderizar la página dependiendo de la ruta
  await router(path, app);
}
