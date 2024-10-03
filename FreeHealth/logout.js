// Función para cerrar sesión
function logout() {
    // Eliminar el token de autenticación almacenado en el navegador (si aplica)
    localStorage.removeItem('authToken');

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/";
}

// Llamar a la función logout cuando el usuario haga clic en el botón de cerrar sesión
document.getElementById('logoutButton').addEventListener('click', logout);
