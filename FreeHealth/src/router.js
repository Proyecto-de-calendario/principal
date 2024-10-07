import { loginPage } from "./loginPage.js";

export async function router(path, app) {
  if (path !== "/") {
    //const result = await validateSession();

    //if (!result) {
      //window.location.pathname = "/";
    
  //}
  }

  if (path === "/") {
    app.appendChild(loginPage());
    return;
  }

  if (path === "/home") {
    window.location.pathname = '/pages/landingPage.html';
    return;
  }
  if (path === "/setTimeout") {
    window.location.pathname = '/pages/limitetiempo.html';
    return;
  }
  if (path === "/agenda") {
    window.location.pathname = '/pages/agenda.html';
    return;
  }
};

const validateSession = async () => {
  const response = await fetch("http://localhost:3000/users/session", {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
