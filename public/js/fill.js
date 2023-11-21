const loginForm = document.getElementById('lgn');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se envíe el formulario de manera convencional

    const espacio1 = document.querySelector('input[name="espacio1"]').checked;
    const espacio2 = document.querySelector('input[name="espacio2"]').checked;
    const espacio3 = document.querySelector('input[name="espacio3"]').checked;

    // Para los elementos relacionados con espacio 1
const max1 = document.querySelector('input[name="max1"]').value;
const d1 = document.querySelector('input[name="d1"]').value;

// Para los elementos relacionados con espacio 2
const max2 = document.querySelector('input[name="max2"]').value;
const d2 = document.querySelector('input[name="d2"]').value;

// Para los elementos relacionados con espacio 3
const max3 = document.querySelector('input[name="max3"]').value;
const d3 = document.querySelector('input[name="d3"]').value;

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
                window.location.href = "/home"
            } else {
                window.location.href = "/fallo"
            }
        })
        //dejar otro error naturaleza
        .catch(error => {
            window.location.href = '/fallo';
        });
});
