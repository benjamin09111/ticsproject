function cerrarModalAvisoLlenar() {
    const modalBg = document.getElementById("modalBg");
    const modal2 = document.getElementById("avisollenar");
    modalBg.style.display = "none";
    modal2.style.display = "none";
}

function cerrarAvisoTemperatura(){
    const modalBg = document.getElementById("modalBg1");
    const modal = document.getElementById("cuidadoModal");
    modalBg.style.display = "none";
    modal.style.display = "none";
}

function cerrarModal1() {
    const modalBg = document.getElementById("modalBg2");
    const aviso = document.getElementById("espacio1aviso");

    // Ocultar tanto el fondo oscuro como el modal
    modalBg.style.display = "none";
    aviso.style.display = "none";
}

function cerrarModal2() {
    const modalBg = document.getElementById("modalBg3");
    const aviso = document.getElementById("espacio2aviso");

    // Ocultar tanto el fondo oscuro como el modal
    modalBg.style.display = "none";
    aviso.style.display = "none";
}

function cerrarModal3() {
    const modalBg = document.getElementById("modalBg4");
    const aviso = document.getElementById("espacio3aviso");

    // Ocultar tanto el fondo oscuro como el modal
    modalBg.style.display = "none";
    aviso.style.display = "none";
}