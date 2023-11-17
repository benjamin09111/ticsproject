function mostrarModal() {
    const modalBg = document.getElementById("modalBg");
    const modal = document.getElementById("cuidadoModal");
    const cambiarcolor = document.getElementById("temperaturetext");

    cambiarcolor.style.color = "red";
    modalBg.style.display = "block";
    modal.style.display = "block";
}

const gettemperaturebutton = document.getElementById("getTemperature");

function actualizar(){
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
        fetch('https://ticsproject.onrender.com/gettemperature', {
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data =>{
            const {temperature, buttons} = data;
            const text = document.getElementById("temperaturetext")
            text.textContent = temperature;

            const bt1 = document.getElementById("b1");
            const bt2 = document.getElementById("b2");
            const bt3 = document.getElementById("b3");

            if(buttons[0] == 1){
                bt1.textContent = "VACÍO";
            }else{
                bt1.textContent = "OCUPADO";
            }

            if(buttons[1] == 1){
                bt2.textContent = "VACÍO";
            }else{
                bt2.textContent = "OCUPADO";
            }

            if(buttons[2] == 1){
                bt3.textContent = "VACIO";
            }else{
                bt3.textContent = "OCUPADO";
            }

            //modal aviso
            const parsedTemperature = parseFloat(temperature);
            if(parsedTemperature > 30 || parsedTemperature < 0){
                mostrarModal();
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
   actualizar();
});

//AJUSTAR DESPUES LA DIRECCION DE LA PAGINA, NO LOCALHOST
gettemperaturebutton.addEventListener("click", function(event) {
    actualizar();
});

//realizar cada 4 seg
setInterval(actualizar, 4000);

