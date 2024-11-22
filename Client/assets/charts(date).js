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
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value.toFixed(2)} minutos`; // Mostrar con 2 decimales
            },
          },
        },
      },
    },
  });

  // Crear el gráfico de línea para el uso a lo largo del día
  window.chart2 = new Chart(ctx2, {
    type: "line",
    data: {
      datasets: filteredData.lineChartData.datasets,
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Hora del día',
          },
          ticks: {
            callback: value => `${Math.floor(value)}:00`, // Mostrar horas completas
          },
          min: 0,
          max: 24,
        },
        y: {
          type: 'category',
          labels: filteredData.pieChartData.labels, // Mostrar nombres de redes sociales en el eje Y
          title: {
            display: true,
            text: 'Red Social',
          },
        },
      },
    },
  });
};

// Función para obtener datos filtrados por fecha (simulada)
function fetchDataByDate(data) {
  const socialNetworks = [...new Set(data.map(item => item.red_social))];
  const colors = ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2']; // Paleta de colores

  const pieChartData = {
    labels: socialNetworks,
    datasets: [{
      label: 'Tiempo en redes',
      data: socialNetworks.map(network => {
        return data
          .filter(item => item.red_social === network)
          .reduce((acc, item) => {
            const start = new Date(item.tiempo_inicio);
            const end = new Date(item.tiempo_final);
            const duration = (end - start) / 60000; // Duración en minutos
            return acc + duration;
          }, 0);
      }),
      backgroundColor: socialNetworks.map((_, idx) => colors[idx % colors.length]), // Asignar colores por red
      borderWidth: 1,
    }],
  };

  const lineChartData = {
    datasets: socialNetworks.map((network, idx) => ({
      label: network,
      data: data
        .filter(item => item.red_social === network)
        .map(item => ({
          x: new Date(item.tiempo_inicio).getHours() + new Date(item.tiempo_inicio).getMinutes() / 60,
          y: network, // Usar el nombre de la red social para el eje Y
        })),
      borderColor: colors[idx % colors.length], // Colores consistentes
      backgroundColor: colors[idx % colors.length],
      fill: false,
      tension: 0.4,
      pointRadius: 3,
    })),
  };

  return {
    pieChartData,
    lineChartData,
  };
}
