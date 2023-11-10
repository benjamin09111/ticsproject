//AJUSTAR DESPUES LA DIRECCION DE LA PAGINA, NO LOCALHOST
document.addEventListener("DOMContentLoaded", function() {
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
        fetch('https://ticsproject.onrender.com/gettemperatures', {
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const {temperatures} = data;
            //arreglo temperatures
            const temperaturesList = document.getElementById("temperaturesList");

            temperaturesList.innerHTML = "";

            // Recorrer el arreglo de temperaturas y agregar cada temperatura como un elemento de lista
            temperatures.forEach(temperature => {
                const listItem = document.createElement("li");
                listItem.textContent = temperature;
                temperaturesList.appendChild(listItem);
            });

        })
    }
});