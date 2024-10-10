export const logupPage = () => {
    const container = document.createElement("div");
  
    container.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "h-screen",
      "bg-gradient-to-br",
      "from-pink-500",
      "via-purple-500",
      "to-indigo-600",
      "bg-opacity-75"
    );
  
    const form = document.createElement("form");
  
    form.classList.add(
      "flex",
      "flex-col",
      "w-1/3",
      "gap-4",
      "bg-white",
      "p-6",
      "rounded",
      "shadow-md"
    );
  
    const title = document.createElement("h2");
  
    title.classList.add("text-2xl", "font-bold", "mb-4");
    title.textContent = "FreeHealth";
  
    const nameInput = document.createElement("input");
  
    nameInput.type = "text";
    nameInput.id = "email";
    nameInput.name = "email";
    nameInput.required = true;
    nameInput.classList.add(
      "w-full",
      "p-2",
      "border",
      "border-gray-300",
      "rounded"
    );
    nameInput.placeholder = "nombre";

    const usernameInput = document.createElement("input");
  
    usernameInput.type = "text";
    usernameInput.id = "email";
    usernameInput.name = "email";
    usernameInput.required = true;
    usernameInput.classList.add(
      "w-full",
      "p-2",
      "border",
      "border-gray-300",
      "rounded"
    );
    usernameInput.placeholder = "email";
  
    const passwordInput = document.createElement("input");
  
    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.required = true;
    passwordInput.name = "password";
    passwordInput.classList.add(
      "w-full",
      "p-2",
      "border",
      "border-gray-300",
      "rounded"
    );
    passwordInput.placeholder = "Password";
  
    const login = document.createElement("button");

  login.classList.add(
    "w-full",
    "bg-green-500",
    "hover:bg-green-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded"
  );
  login.textContent = "¿No tienes cuenta?";
  login.addEventListener("click", ()=> window.location.pathname = "/");

    const submitButton = document.createElement("button");
  
    submitButton.type = "submit";
    submitButton.classList.add(
      "w-full",
      "bg-blue-500",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    submitButton.textContent = "signin";
  
    form.appendChild(title);
    form.appendChild(nameInput);
    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const name = nameInput.value;
      const email = usernameInput.value;
      const password = passwordInput.value;
  
      // Validación básica
      if (!name || !email || !password) {
        document.getElementById("message").innerText =
          "Por favor, completa todos los campos.";
        return;
      }
      try {
      
        const response = await fetch("http://localhost:3000/users/reg", {
          method: "POST",
          credentials: "include", // Importante para enviar las cookies de sesión
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        if (!response.ok) {
          divError.innerText = "Credenciales inválidas";
          divError.classList.add(
            "bg-danger",
            "text-white",
            "text-center",
            "rounded",
            "p-2",
            "mt-3"
          );
  
          setTimeout(() => {
            divError.hidden = true;
          }, 3500);
  
          return;
        }
  
        const data = await response.json();
        console.log(data);
        window.location.pathname = "/home";
      } catch (error) {
        alert(error)
      }
    });
  
    container.appendChild(form);
  
    return container;
  };