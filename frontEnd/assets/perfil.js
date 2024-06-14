function actualizar() {
let actualizarPerfil = document.getElementById("actualizar-perfil");
actualizarPerfil.addEventListener("btn")
}
function actualizarPerfil() {
    let formulario = document.getElementById("formulario");
    
      formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        let nuevoNombre = document.getElementById("nombre").value;
        let nuevoEmail = document.getElementById("email").value;
        let nuevaedad = document.getElementById("edad").value;

        localStorage.setItem("nombre", nuevoNombre);
        localStorage.setItem("email", nuevoEmail);
        localStorage.setItem("edad", nuevaedad);

        console.log("¡Datos guardados!");
    })
  }