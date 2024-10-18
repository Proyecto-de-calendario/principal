export function createLogoutButton() {
  const navbar = document.querySelector("nav");
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

  // Manejar el clic del botón de logout
  logoutBtn.addEventListener("click", handleLogout);
}

async function handleLogout() {
 
  try {
    const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include', // Necesario para enviar cookies
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    } else {
      // Redirigir al usuario a la página de inicio
      window.location.pathname = '/';
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}

document.addEventListener("DOMContentLoaded", createLogoutButton);
  