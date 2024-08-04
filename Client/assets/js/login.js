// Login Function
async function handleLogin() {
  const token = localStorage.getItem('userToken');
if (!token) {
  } else {
  localStorage.removeItem('userToken');
}
  const email = document.querySelector('input[name="email"]').value;
  const contrasenia = document.querySelector('input[name="pswd"]').value;

  const response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, contrasenia })
  });
  if (!response.ok) {
    alert(await response.text());
  } else {
    const data = await response.json();
    alert(data.msg);

    const token = data.token;
localStorage.setItem('userToken', token);
const id = response.idUsuario
localStorage.setItem('idUser',id);

    window.location.href = 'index.html';

  }
}

// Event Listener for Login Button
document.getElementById('login_button').addEventListener('click', async (e) => {
  e.preventDefault();
  handleLogin(); 
});