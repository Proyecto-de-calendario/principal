let sigup = document.getElementsByClassName("signup");
document.getElementById('inscribirseButton').addEventListener('click', async () => {
    const nombre = document.querySelector('input[name="txt"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const contraseña = document.querySelector('input[name="pswd"]').value;

    // Envía los datos al servidor mediante fetch
    await fetch('/formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, contraseña })
    });

    // Redirige a otra página (por ejemplo, 'about.html')
    window.location.href = 'login.html';
});