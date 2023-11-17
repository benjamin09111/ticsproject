const contenedor = document.getElementById('error-container');
contenedor.textContent = "";

const loginForm = document.getElementById('lgn');

function getCookieExpirationDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toUTCString();
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se envíe el formulario de manera convencional
    contenedor.textContent = "";
    
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch('https://ticsproject.onrender.com/ingresar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === 'true') {
                // Almacenar el token en localStorage
                document.cookie = `token=${data.token}; expires=${getCookieExpirationDate()}; path=/`;
                window.location.href = '/home';
            } else {
                windows.location.href = '/fallo';
            }
        })
        //dejar otro error naturaleza
        .catch(error => {
            window.location.href = '/fallo';
        });
});
