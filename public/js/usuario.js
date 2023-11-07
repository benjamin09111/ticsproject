function obtenerDatosUsuario() {

    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    let token = null;

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        const cookieName = cookie[0];
        const cookieValue = cookie[1];

        if (cookieName === 'token') {
            token = cookieValue;
            break;
        }
    }
    if(token == null || !token){
        window.location.href = "/error"
    }else{
        fetch('http://localhost:4000/usuario', {
        method: 'GET', // Método de la solicitud es GET
        headers: {
            'token': token, // Incluir el token en la cabecera
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {

            if(data.message == "e"){
                window.location.href = "/errortoken";
            }else{
                const { name, email, dinero } = data;

                const n1 = document.getElementById("n1");
                const e1 = document.getElementById("e1");
                const m1 = document.getElementById("m1");

                n1.textContent = name;
                e1.textContent = email;
                m1.textContent = dinero;
            }

            
        })
        .catch(error => {
            // Manejar errores de conexión o de otra naturaleza
            window.location.href = '/ops';
        });
    }

    
}

// Llamar a la función al cargar la página
window.addEventListener('DOMContentLoaded', obtenerDatosUsuario);
