import { Chart, registerables } from 'chart.js';

export const grafico = (data) => {
  Chart.register(...registerables);

  // Filtrar datos según la fecha seleccionada
  const filteredData = fetchDataByDate(data);

  const ctx1 = document.getElementById("tiempoRedesChart").getContext("2d");
  const ctx2 = document.getElementById("lineaTiempoSemanalChart").getContext("2d");

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
            stepSize: 1,
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
}

// Función para obtener datos filtrados por fecha (simulada)
function fetchDataByDate(data) {
  const socialNetworks = [...new Set(data.map(item => item.red_social))];
  const pieChartData = {
    labels: socialNetworks,
    datasets: [{
      label: 'Tiempo en redes (%)',
      data: socialNetworks.map(network => {
        return data.filter(item => item.red_social === network).reduce((acc, item) => acc + item.duracion, 0);
      }),
      backgroundColor: ['#6366F1', '#A78BFA', '#EC4899', '#F59E0B', '#10B981'],
      borderWidth: 1
    }]
  };

  const lineChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: socialNetworks.map((network, idx) => ({
      label: network,
      data: data.filter(item => item.red_social === network).map(item => ({
        x: new Date(item.tiempo_inicio).getHours() + new Date(item.tiempo_inicio).getMinutes() / 60,
        y: idx + 1
      })),
      borderColor: ['#6366F1', '#A78BFA', '#EC4899', '#F59E0B', '#10B981'][idx],
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
