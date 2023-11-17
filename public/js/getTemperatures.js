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
            const {temperatures, dates} = data;
            //arreglo temperatures
            const temperaturesList = document.getElementById("temperaturesList");
            temperaturesList.innerHTML = "";

            temperatures.forEach(temperature => {
                let i = 0;
                const containerDiv = document.createElement("div");
                containerDiv.style.display = "flex";
                containerDiv.style.justifyContent = "space-between";

                const div = document.createElement("div");
                div.style.display = "inline-block";
                div.textContent = temperature;
                containerDiv.appendChild(div);

                const listItem = document.createElement("div");
                listItem.style.display = "inline-block";
                listItem.textContent = dates[i];
                containerDiv.appendChild(listItem);


                temperaturesList.appendChild(containerDiv);
                i++;
            });

        })
    }
});