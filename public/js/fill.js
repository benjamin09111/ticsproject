const loginForm = document.getElementById('lgn');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se envíe el formulario de manera convencional

    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

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
        window.location.href = "/";
    }else{
        fetch('https://ticsproject.onrender.com/fill', {
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
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
    }
});
