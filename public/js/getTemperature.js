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
            const {temperature, buttons, max, dosis, actuales} = data;
            
            const text = document.getElementById("temperaturetext")
            text.textContent = temperature;

            const contenedor1 = document.getElementById("container1");
            const contenedor2 = document.getElementById("container2");
            const contenedor3 = document.getElementById("container3");

            const uso1 = document.getElementById("uso1");
            const uso2 = document.getElementById("uso2");
            const uso3 = document.getElementById("uso3");

            const actuales1 = document.getElementById("actuales1");
            const actuales2 = document.getElementById("actuales2");
            const actuales3 = document.getElementById("actuales3");

            const max1 = document.getElementById("max1");
            const max2 = document.getElementById("max2");
            const max3 = document.getElementById("max3");

            const d1 = document.getElementById("d1");
            const d2 = document.getElementById("d2");
            const d3 = document.getElementById("d3");

            const bt1 = document.getElementById("b1");
            const bt2 = document.getElementById("b2");
            const bt3 = document.getElementById("b3");

            actuales1.textContent = actuales[0].toString();
            actuales2.textContent = actuales[1].toString();
            actuales3.textContent = actuales[2].toString();

            max1.textContent = max[0].toString();
            max2.textContent = max[1].toString();
            max3.textContent = max[2].toString();

            if(max[0] <= 0){
                contenedor1.style.display = "none";
            }else{
                contenedor1.style.display = "block";
            }

            if(max[1] <= 0){
                contenedor2.style.display = "none";
            }else{
                contenedor2.style.display = "block";
            }

            if(max[2] <= 0){
                contenedor3.style.display = "none";
            }else{
                contenedor3.style.display = "block";
            }

            d1.textContent = dosis[0].toString();
            d2.textContent = dosis[1].toString();
            d3.textContent = dosis[2].toString();

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

function verificar(){
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
        fetch('https://ticsproject.onrender.com/getcont', {
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data =>{
            const {cont} = data;

            if(cont==0){
                window.location.href = '/rellenar';
            }

        })
    }
}


document.addEventListener("DOMContentLoaded", function() {
   verificar();
});

//AJUSTAR DESPUES LA DIRECCION DE LA PAGINA, NO LOCALHOST
gettemperaturebutton.addEventListener("click", function(event) {
    actualizar();
});

//realizar cada 5 seg
setInterval(actualizar, 5000);

