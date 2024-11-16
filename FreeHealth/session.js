export async function isValidSession() {
  try {
    const response = await fetch('http://localhost:3000/auth/session', {
      method: "GET",
      credentials: "include", // Importante para enviar las cookies de sesión
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Invalid session");
    }

    const data = await response.json();
    return data.user ? true : false;
  } catch (error) {
    console.error('Error validating session:', error);
    return false;
  }
}
