document.getElementById('webForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var pageName = document.getElementById('pageName').value;
  var pageURL = document.getElementById('pageURL').value;
  var timeLimitHours = parseInt(document.getElementById('timeLimitHours').value, 10);
  var timeLimitMinutes = parseInt(document.getElementById('timeLimitMinutes').value, 10);

  var timeLimit = (timeLimitHours * 60 * 60 * 1000) + (timeLimitMinutes * 60 * 1000);

  alert(`Has establecido un límite de tiempo de ${timeLimitHours} horas y ${timeLimitMinutes} minutos para ${pageName}.`);

  const setTimeout = () => {
    
  }

 