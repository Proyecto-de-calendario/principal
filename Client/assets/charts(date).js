import { Chart, registerables } from 'chart.js';

export const grafico = (data) => {
  Chart.register(...registerables);

  // Filtrar datos según la fecha seleccionada
  const filteredData = fetchDataByDate(data);

  const ctx1 = document.getElementById("tiempoRedesChart").getContext("2d");
  const ctx2 = document.getElementById("lineaTiempoSemanalChart").getContext("2d");

  // Destruir gráficos existentes antes de crear nuevos
  if (window.chart1) {
    window.chart1.destroy();
  }
  if (window.chart2) {
    window.chart2.destroy();
  }

  // Crear el gráfico de pie para la distribución de tiempo en redes sociales
  window.chart1 = new Chart(ctx1, {
    type: "pie",
    data: filteredData.pieChartData,
    options: {
      responsive: false,
      maintainAspectRatio: false,
    },
  });

  // Crear el gráfico de línea para el uso a lo largo del día
  window.chart2 = new Chart(ctx2, {
    type: "line",
    data: filteredData.lineChartData,
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Hora del día'
          },
          min: 0,
          max: 24
        },
        y: {
          ticks: {
            stepSize: 0.5,
            beginAtZero: true,
            max: 5
          },
          title: {
            display: true,
            text: 'Red Social'
          }
        }
      }
    },
  });
};


// Función para obtener datos filtrados por fecha (simulada)
function fetchDataByDate(data) {
  const socialNetworks = [...new Set(data.map(item => item.red_social))];
  const pieChartData = {
    labels: socialNetworks,
    datasets: [{
      label: 'Tiempo en redes',
      data: socialNetworks.map(network => {
        return data.filter(item => item.red_social === network).reduce((acc, item) => acc + item.duracion, 0);
      }),
      backgroundColor: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD'], // Colores más distintivos
      borderWidth: 1
    }]
  };

  const lineChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: socialNetworks.map((network, idx) => ({
      label: network,
      data: data.filter(item => item.red_social === network).map(item => ({
        x: new Date(item.tiempo_inicio).getHours() + new Date(item.tiempo_inicio).getMinutes() / 60,
        y: (idx + 1) * 0.5 // Líneas más juntas en el eje Y
      })),
      borderColor: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD'][idx], // Colores más distintivos
      fill: false,
      tension: 0.4,
      pointRadius: 0
    }))
  };

  return {
    pieChartData,
    lineChartData
  };
}
