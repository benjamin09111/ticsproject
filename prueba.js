const currentDate = new Date(Date.now());

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el formato estándar
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

console.log("Formatted Date: ", formattedDate);
