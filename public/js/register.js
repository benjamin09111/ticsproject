const contenedor = document.getElementById('error-container');
contenedor.textContent = "";

const signupForm = document.getElementById('lgn');

signupForm.addEventListener('submit', (event) => {
    contenedor.textContent = "";
    
    event.preventDefault(); // Evita que se envíe el formulario de manera convencional

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
    const did = document.querySelector('input[name="did"]').value;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        const n2 = document.createElement('b');
        
        n2.textContent = "Las contraseñas no coinciden.";
        
        contenedor.appendChild(n2);
    }

    else if(password.length < 4){
        const n2 = document.createElement('b');
        
        n2.textContent = "La contraseña es menor a 4 dígitos.";
        
        contenedor.appendChild(n2);
    }
    else{
        fetch('https://ticsproject.onrender.com/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            did: did
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === 'true') {
                window.location.href = '/login';
            } else {
                if(data.message == "Email en uso"){
                    const n2 = document.createElement('b');
        
                    n2.textContent = "Email en uso.";
        
                    contenedor.appendChild(n2);
                }else if(data.message == "inc"){
                    const n2 = document.createElement('b');
        
                    n2.textContent = "No ha ingresado lo correcto.";
        
                    contenedor.appendChild(n2);
                }else{
                    const n2 = document.createElement('b');
        
                    n2.textContent = "Error. Vuelva a intentar.";
        
                    contenedor.appendChild(n2);
                }
            }
        })
        .catch(error => {
            // Manejar errores de conexión o de otra naturaleza
            window.location.href = '/fallo';
        });
    }
    
});