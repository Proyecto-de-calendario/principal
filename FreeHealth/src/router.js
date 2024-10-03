import { loginPage } from "./loginPage.js";

export async function router(path, app) {
  if (path !== "/") {
    

    }

  if (path === "/") {
    app.appendChild(loginPage());
    return;
  }

  if (path === "/home") {
    window.location.pathname = 'landingPage.html';
    return;
  }
}

export const validateSession = async () => {
  const response = await fetch("http://localhost:3000/users", {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
