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
        fetch('http://localhost:4000/gettemperature', {
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const {temperature} = data;
            const text = document.getElementById("temperaturetext")
            text.textContent = temperature;
            console.log("complete");
        })
    }
});