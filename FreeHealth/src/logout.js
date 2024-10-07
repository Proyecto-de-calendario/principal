import '../style.css';
export function logout() {
    const navbar = document.querySelector("nav"); // Cambia a 'nav' para coincidir con el elemento
    if (!navbar) {
      console.error("Navbar not found!");
      return;
    }
  
    const logoutBtn = document.createElement("button");
    logoutBtn.classList.add(
        "bg-red-500",
        "text-white",
        "hover:bg-red-700"
        );
    logoutBtn.textContent = "Logout";
  
    navbar.appendChild(logoutBtn);
  
    // Llamar a la función logout cuando el usuario haga clic en el botón de cerrar sesión
    logoutBtn.addEventListener("click", async () => {
        const response = await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error al cerrar sesión');
        } else {
            window.location.pathname = '/';
        }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    logout();
  });
  