const conectarBd = require("../../../backEnd/bd");

const conexion = conectarBd()

function actualizarPerfil() {
  let formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", function(event) {
      event.preventDefault();

      let nuevoNombre = document.getElementById("nombre").value;
      let nuevoEmail = document.getElementById("email").value;
      let nuevaEdad = document.getElementById("edad").value;

      localStorage.setItem("nombre", nuevoNombre);
      localStorage.setItem("email", nuevoEmail);
      localStorage.setItem("edad", nuevaEdad);

      console.log("¡Datos guardados!");
  });
}