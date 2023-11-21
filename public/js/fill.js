const loginForm = document.getElementById('lgn');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se envíe el formulario de manera convencional
    contenedor.textContent = "";
    
    alert("Presionado!");

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch('https://ticsproject.onrender.com/fill', {
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
