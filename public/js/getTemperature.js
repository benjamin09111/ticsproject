const gettemperaturebutton = document.getElementById("getTemperature");

//AJUSTAR DESPUES LA DIRECCION DE LA PAGINA, NO LOCALHOST
gettemperaturebutton.addEventListener("click", function(event) {
    //cambiar a que se refresce la pagina
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
        .then(data => {
            const {temperature, buttons} = data;
            const text = document.getElementById("temperaturetext")
            text.textContent = temperature;

            const bt1 = document.getElementById("b1");
            const bt2 = document.getElementById("b2");
            const bt3 = document.getElementById("b3");

            const ocupado = "OCUPADO";
            const vacio = "VACÍO";

            if(buttons[0] == 1){
                bt1.textContent = ocupado;
            }else{
                bt1.textContent = vacio;
            }

            if(buttons[1] == 1){
                bt2.textContent = ocupado;
            }else{
                bt2.textContent = vacio;
            }

            if(buttons[2] == 1){
                bt3.textContent = ocupado;
            }else{
                bt3.textContent = vacio;
            }
        })
    }
});