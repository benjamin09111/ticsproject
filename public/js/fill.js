const loginForm = document.getElementById('lgn');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se envíe el formulario de manera convencional

    var espacio1 = document.querySelector('input[name="espacio1"]');
    var espacio2 = document.querySelector('input[name="espacio2"]');
    var espacio3 = document.querySelector('input[name="espacio3"]');

    // Para los elementos relacionados con espacio 1
var max1 = document.querySelector('input[name="max1"]');
var d1 = document.querySelector('input[name="d1"]');

// Para los elementos relacionados con espacio 2
var max2 = document.querySelector('input[name="max2"]');
var d2 = document.querySelector('input[name="d2"]');

// Para los elementos relacionados con espacio 3
var max3 = document.querySelector('input[name="max3"]');
var d3 = document.querySelector('input[name="d3"]');

if(!espacio1){
    espacio1 = 0;
}
if(!espacio2){
    espacio2 = 0;
}
if(!espacio3){
    espacio3 = 0;
}

if(!max1){
    max1 = 0;
}

if(!max2){
    max2 = 0;
}

if(!max3){
    max3 = 0;
}

if(!d1){
    d1 = 0;
}

if(!d2){
    d2 = 0;
}

if(!d3){
    d3 = 0;
}

    fetch('https://ticsproject.onrender.com/fill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            espacio1: espacio1,
            espacio2: espacio2,
            espacio3: espacio3,
            max1: max1,
            max2: max2,
            max3: max3,
            d1: d1,
            d2: d2,
            d3: d3
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === 'true') {
                windows.location.href = "/home"
            } else {
                windows.location.href = "/fallo"
            }
        })
        //dejar otro error naturaleza
        .catch(error => {
            window.location.href = '/fallo';
        });
});
