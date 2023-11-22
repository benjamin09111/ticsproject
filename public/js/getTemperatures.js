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
                const containerDiv = document.createElement("div");
                containerDiv.classList.add("table-row"); // Añadir una clase para aplicar estilos si es necesario
            
                const valueCell = document.createElement("div");
                valueCell.classList.add("table-cell");
                valueCell.textContent = temperature.value;
                containerDiv.appendChild(valueCell);
            
                const dateCell = document.createElement("div");
                dateCell.classList.add("table-cell");
                dateCell.textContent = new Date(temperature.date).toLocaleString(); // Formatear la fecha como desees
                containerDiv.appendChild(dateCell);
            
                temperaturesList.appendChild(containerDiv);
            });
            

        })
    }
});