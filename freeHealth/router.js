import { loginPage } from "./loginPage.js";

export async function router(path, app) {
  if (path !== "/") {
    

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