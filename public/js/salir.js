
// Obtiene una referencia al botón de logout por su ID
const logoutButton = document.getElementById("logoutbutton");

// Agrega un evento de clic al botón de logout
logoutButton.addEventListener("click", function(event) {
    event.preventDefault();

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.href = '/';
});
