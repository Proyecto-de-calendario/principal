import "./style.css";
import { router } from "./src/router";
import {createLogoutButton} from './src/logout.js';
// ruta en la que se encuentra el usuario
const path = window.location.pathname;

// elemento en el que se renderizará la página
const app = document.getElementById("app");



// función que se encarga de renderizar la página dependiendo de la ruta
await router(path, app);
    document.addEventListener("DOMContentLoaded", () => {
  createLogoutButton();
});
  