function cerrarModal(){
    const modalBg = document.getElementById("modalBg");
    const modal = document.getElementById("cuidadoModal");
    modalBg.style.display = "none";
    modal.style.display = "none";
    }


//logica para agregar boxes
document.addEventListener("DOMContentLoaded", function() {
    const checkbox1 = document.getElementById("c1");
    const checkbox2 = document.getElementById("c2");
    const checkbox3 = document.getElementById("c3");
    
    const max1 = document.getElementById("1");
    const max2 = document.getElementById("2");
    const max3 = document.getElementById("3");

    const d1 = document.getElementById("11");
    const d2 = document.getElementById("22");
    const d3 = document.getElementById("33");

    checkbox1.addEventListener("change", function() {
        var value1 = checkbox1.checked;

        if(value1){
            d1.style.display = "block";
            max1.style.display = "block";
        }else{
            d1.style.display = "none";
            max1.style.display = "none";
        }

        
    });
    checkbox2.addEventListener("change", function() {
        var value2 = checkbox2.checked;

        if(value2){
            d2.style.display = "block";
            max2.style.display = "block";
        }else{
            d2.style.display = "none";
            max2.style.display = "none";
        }

    });
    checkbox3.addEventListener("change", function() {
        var value3 = checkbox3.checked;

        if(value3){
            d3.style.display = "block";
            max3.style.display = "block";
        }else{
            d3.style.display = "none";
            max3.style.display = "none";
        }

    });
});