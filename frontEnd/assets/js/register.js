
        let formulario = document.getElementById("form");
        
            const registro = async(event) => {
                event.preventDefault();
    
            let nombre = document.getElementById("nombre").value;
            let email = document.getElementById("email").value;
            let edad = document.getElementById("edad").value;
        
                const peticion = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    body: JSON.stringify({usuario, correo, contrasenia}),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            

             // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la peticion, mostrar el mensaje de error.
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        //Caso contrario, mostramos el mensaje.
        alert(respuesta.msg)

        // Redirigimos al usuario al login.
        window.location.href = '/client/login.html'
    }

            }
        

        form.addEventListener('submit', registro);