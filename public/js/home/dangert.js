function temperatureDanger(){
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
        fetch('https://ticsproject.onrender.com/tempalert', {
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data =>{
            const {peligro} = data;

            if(peligro){
                const fondo = document.getElementById("modalBg");
                const av = document.getElementById("cuidadoModal");
                av.style.display = "block";
                fondo.style.display = "block";
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    temperatureDanger();
 });