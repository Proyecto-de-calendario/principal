import { loginPage } from "./loginPage.js";

export async function router(path, app) {
  if (path !== "/") {
    const result = await validateSession();

    if (!result) {
      window.location.pathname = "/";
    }
  }

  if (path === "/") {
    app.appendChild(loginPage());
    return;
  }

  if (path === "/home") {
    'landingPage.html';
    return;
  }
}