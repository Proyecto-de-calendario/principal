// Función principal para renderizar los gráficos con datos de la fecha seleccionada
export const grafico = (date) => {
  //Obtener datos filtrados para la fecha seleccionada
  const filteredData = fetchDataByDate(date);
  
  // Seleccionar los elementos canvas donde se renderizarán los gráficos
  const ctx1 = document.getElementById("tiempoRedesChart").getContext("2d");
  const ctx2 = document.getElementById("lineaTiempoSemanalChart").getContext("2d");


  // Crear el gráfico de pie para la distribución de tiempo en redes sociales
  window.chart1 = new Chart(ctx1, {
    type: "pie",
    data: filteredData.pieChartData,
    options: {
      responsive: true,
      maintainAspectRatio: false, // Importante para el tamaño dinámico
    },
  });

  // Crear el gráfico de línea para el uso a lo largo del día
  window.chart2 = new Chart(ctx2, {
    type: "line",
    data: filteredData.lineChartData,
    options: {
      responsive: true,
      maintainAspectRatio: false, // Ajuste para responsividad
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
function fetchDataByDate(date) {
  return {
    pieChartData: {
      labels: ['Instagram', 'Facebook', 'Twitter', 'TikTok', 'Otros'],
      datasets: [{
        label: 'Tiempo en redes (%)',
        data: [35, 25, 15, 20, 5],
        backgroundColor: ['#6366F1', '#A78BFA', '#EC4899', '#F59E0B', '#10B981'],
        borderWidth: 1
      }]
    },
    lineChartData: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          label: 'Instagram',
          data: [0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
          borderColor: '#6366F1',
          fill: false,
          tension: 0.4,
          pointRadius: 0
        },
        // Añadir más datasets para otras redes sociales según sea necesario
      ]
    }
  };
}
