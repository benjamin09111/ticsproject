function alerta1() {
    const fondo = document.getElementById("modalBg");
    const av = document.getElementById("espacio1aviso");
    av.style.display = "block";
    fondo.style.display = "block";
}

function alerta2() {
    const fondo = document.getElementById("modalBg");
    const av = document.getElementById("espacio2aviso");
    av.style.display = "block";
    fondo.style.display = "block";
}

function alerta3() {
    const fondo = document.getElementById("modalBg");
    const av = document.getElementById("espacio3aviso");
    av.style.display = "block";
    fondo.style.display = "block";
}

function buttons(){
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
        fetch('https://ticsproject.onrender.com/butonalert', {
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data =>{
            const {sb1, sb2, sb3} = data;

            if(sb1){
                alerta1();
            }
            if(sb2){
                alerta2();
            }
            if(sb3){
                alerta3();
            }

        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    buttons();
 });