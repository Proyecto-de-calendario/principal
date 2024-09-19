import './style.css'
import { createApp } from 'vue';

// ... (resto de tu código de configuración de Vite)

const app = createApp({});

app.mount('#app'); // Asegúrate de tener un elemento con id="app" en tus HTML

// Manejar el clic en el botón
document.getElementById('btn-limites').addEventListener('click', () => {
  window.location.href = '/limites.html';
});
