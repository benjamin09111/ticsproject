function resetFunction(){
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
    fetch('https://ticsproject.onrender.com/reset', {
    method: 'GET',
    headers: {
        'token': token,
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data =>{
        if(data.success == "true"){
            const modal1 = document.getElementById("modalBg");
            const modal2 = document.getElementById("cuidadoModal");

            modal1.style.display = "block";
            modal2.style.display = "block";
        }else{
            window.location.href = '/fallo';
        }


    })
}
}