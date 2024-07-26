
let login = document.getElementsByClassName("login");
document.getElementById('inscribirseButton').addEventListener('click', async () => {

    const email = document.querySelector('input[name="email"]').value;
    const contrasenia = document.querySelector('input[name="pswd"]').value;

 // Envía los datos al servidor mediante fetch
 await fetch('/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, contrasenia })
});
    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la peticion, mostrar el mensaje de error.
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        // Caso contrario mostrar el mensaje.
        alert(respuesta.msg)

        // Seteamos el token en el localStorage.
        localStorage.setItem('token', respuesta.token);

        // Redirigimos al usuario a la landingPage.
        window.location.href = '/client/index.html'
    }

})