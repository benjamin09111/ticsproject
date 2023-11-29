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

            console.log("Se hace o no se hace boton 1: ", sb1);
            console.log("Se hace o no se hace boton 3: ", sb3);

            if(sb1){
                const fondo = document.getElementById("modalBg");
                const av = document.getElementById("espacio1aviso");
                av.style.display = "block";
                fondo.style.display = "block";
            }
            if(sb2){
                const fondo = document.getElementById("modalBg");
                const av = document.getElementById("espacio2aviso");
                av.style.display = "block";
                fondo.style.display = "block";
            }
            if(sb3){
                const fondo = document.getElementById("modalBg");
                const av = document.getElementById("espacio3aviso");
                av.style.display = "block";
                fondo.style.display = "block";
            }

        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    buttons();
 });