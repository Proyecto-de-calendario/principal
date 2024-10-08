    document.getElementById('redirectbuttom').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const nombre = document.querySelector('input[name="txt"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const contrasenia = document.querySelector('input[name="pswd"]').value;

        const response = await fetch('http://localhost:3000/users/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, contrasenia })
    });

    if (!response.ok) {
      throw new Error(await response.text()); // Throw an error if the request fails
    } else {
    async () => {
      const token = localStorage.getItem('userToken');
    if (!token) {
      } else {
      localStorage.removeItem('userToken');
        }
      }
    }
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    alert(error); // Display a user-friendly error message
  }
});