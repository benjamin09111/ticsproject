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
                bt2.style.color = "black";
            }else{
                bt1.textContent = "OCUPADO";
                bt1.style.color = "rgb(26, 178, 79)";
            }

            if(buttons[1] == 1){
                bt2.textContent = "VACÍO";
                bt2.style.color = "black";
            }else{
                bt2.textContent = "OCUPADO";
                bt2.style.color = "rgb(26, 178, 79)";
            }

            if(buttons[2] == 1){
                bt3.textContent = "VACIO";
                bt3.style.color = "black";
            }else{
                bt3.textContent = "OCUPADO";
                bt3.style.color = "rgb(26, 178, 79)";
            }

            //modal aviso
            const parsedTemperature = parseFloat(temperature);
            if(parsedTemperature > 20 || parsedTemperature < 0){
                mostrarModal();
            }else{
                console.log("No se muestra modal...")
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

