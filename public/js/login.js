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

    fetch('http://localhost:4000/ingresar', {
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
                if(data.message == "inc"){
                    const n1 = document.createElement('b');
        
                    n1.textContent = "No ha ingresado lo correcto.";
                    
                    contenedor.appendChild(n1);
                }

                else if(data.message == "no existe el usuario"){
                    const n1 = document.createElement('b');
        
                    n1.textContent = "El usuario ingresado no existe.";
                    
                    contenedor.appendChild(n1);

                }

                else if(data.error == "contraseña incorrecta"){
                    const n2 = document.createElement('b');
        
                    n2.textContent = "La contraseña ingresada no es correcta.";
        
                    contenedor.appendChild(n2);

                }

            }
        })
        //dejar otro error naturaleza
        .catch(error => {
            window.location.href = '/error2';
        });
});
