import { Chart, registerables } from 'chart.js';

export const charts = () => {
  document.addEventListener("DOMContentLoaded", () => {
    Chart.register(...registerables);

    // Gráfico de Distribución del Tiempo en Redes Sociales
    const ctx1 = document.getElementById('tiempoRedesChart').getContext('2d');
    const tiempoRedesChart = new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: ['Instagram', 'Facebook', 'Twitter', 'TikTok', 'Otros'],
        datasets: [{
          label: 'Tiempo en redes (%)',
          data: [35, 25, 15, 20, 5],
          backgroundColor: [
            '#6366F1', // Morado
            '#A78BFA', // Lavanda
            '#EC4899', // Rosa
            '#F59E0B', // Naranja
            '#10B981'  // Verde
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    // Gráfico de Promedio Semanal de Uso
    const ctx2 = document.getElementById('promedioSemanalChart').getContext('2d');
    const promedioSemanalChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [{
          label: 'Horas por día',
          data: [2, 3, 4, 2, 5, 6, 4],
          backgroundColor: '#4F46E5', // Azul oscuro
          borderColor: '#312E81',    // Azul aún más oscuro
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true
      }
    });
  });
};

