function alerta1() {
    const fondo = document.getElementById("modalBg");
    const av = document.getElementById("espacio1aviso");
    av.style.display = "block";
    fondo.style.display = "block";
}

function alerta2() {
    const fondo = document.getElementById("modalBg");
    const av = document.getElementById("espacio2aviso");
    av.style.display = "block";
    fondo.style.display = "block";
}

function alerta3() {
    const fondo = document.getElementById("modalBg");
    const av = document.getElementById("espacio3aviso");
    av.style.display = "block";
    fondo.style.display = "block";
}

function pasedTime() {
    const works = document.getElementById("lol");
    const c1 = document.getElementById("container1");
    const c2 = document.getElementById("container2");
    const c3 = document.getElementById("container3");

    const dis1 = document.getElementById("b1");
    const dis2 = document.getElementById("b2");
    const dis3 = document.getElementById("b3");

    if (
        getComputedStyle(c1).display == "block" &&
        dis1.textContent == "VACÍO"
    ) {
        alerta1();
    }

    if (
        getComputedStyle(c2).display == "block" &&
        dis2.textContent == "VACÍO"
    ) {
        alerta2();
    }

    if (
        getComputedStyle(c3).display == "block" &&
        dis3.textContent == "VACÍO"
    ) {
        alerta3();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    actualizar();
    pasedTime();
});