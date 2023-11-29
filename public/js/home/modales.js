function cerrarModal() {
    const modalBg = document.getElementById("modalBg");
    const modal = document.getElementById("cuidadoModal");
    const espacio1 = document.getElementById("espacio1aviso");
    const espacio2 = document.getElementById("espacio2aviso");
    const espacio3 = document.getElementById("espacio3aviso");
    modalBg.style.display = "none";
    modal.style.display = "none";
    espacio1.style.display = "none";
    espacio2.style.display = "none";
    espacio3.style.display = "none";
}

function mostrarModal() {
    const modalBg = document.getElementById("modalBg");
    const modal = document.getElementById("cuidadoModal");
    const cambiarcolor = document.getElementById("temperaturetext");

    cambiarcolor.style.color = "red";
    modalBg.style.display = "block";
    modal.style.display = "block";
}

function cerrarModal1() {
    const modalBg = document.getElementById("modalBg");
    const aviso = document.getElementById("espacio1aviso");

    // Ocultar tanto el fondo oscuro como el modal
    modalBg.style.display = "none";
    aviso.style.display = "none";
}

function cerrarModal2() {
    const modalBg = document.getElementById("modalBg");
    const aviso = document.getElementById("espacio2aviso");

    // Ocultar tanto el fondo oscuro como el modal
    modalBg.style.display = "none";
    aviso.style.display = "none";
}

function cerrarModal3() {
    const modalBg = document.getElementById("modalBg");
    const aviso = document.getElementById("espacio3aviso");

    // Ocultar tanto el fondo oscuro como el modal
    modalBg.style.display = "none";
    aviso.style.display = "none";
}