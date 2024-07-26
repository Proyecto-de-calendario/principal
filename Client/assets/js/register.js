let sigup = document.getElementsByClassName("signup");
document.getElementById('redirectbuttom').addEventListener('click', async () => {
    const nombre = document.querySelector('input[name="txt"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const contraseña = document.querySelector('input[name="pswd"]').value;

    // Envía los datos al servidor mediante fetch
    await fetch('localhost/:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, contraseña })
    });

    // Redirige a otra página (por ejemplo, 'about.html')
    window.location.href = 'login.html';
});