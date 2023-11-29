//funciones para restar la dosis consumida

function restar1() {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        const cookieName = cookie[0];
        const cookieValue = cookie[1];

        if (cookieName === "token") {
            token = cookieValue;
            break;
        }
    }

    if (token == null || !token) {
        window.location.href = "/";
    } else {
        fetch("https://ticsproject.onrender.com/restar1", {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success != "true") {
                    window.location.href = "/fallo";
                } else {
                    if (data.aviso == 1 && data.visible == 1) {
                        const aviso = document.getElementById("avisollenar");
                        const fondo = document.getElementById("modalBg");
                        aviso.style.display = "block";
                        fondo.style.display = "block";
                    } else {
                        window.location.href = "/home";
                    }
                }
            });
    }
}
function restar2() {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        const cookieName = cookie[0];
        const cookieValue = cookie[1];

        if (cookieName === "token") {
            token = cookieValue;
            break;
        }
    }

    if (token == null || !token) {
        window.location.href = "/";
    } else {
        fetch("https://ticsproject.onrender.com/restar2", {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success != "true") {
                    window.location.href = "/fallo";
                } else {
                    if (aviso == 1) {
                        const aviso = document.getElementById("avisollenar");
                        const fondo = document.getElementById("modalBg");
                        aviso.style.display = "block";
                        fondo.style.display = "block";
                    } else {
                        window.location.href = "/home";
                    }
                }
            });
    }
}
function restar3() {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        const cookieName = cookie[0];
        const cookieValue = cookie[1];

        if (cookieName === "token") {
            token = cookieValue;
            break;
        }
    }

    if (token == null || !token) {
        window.location.href = "/";
    } else {
        fetch("https://ticsproject.onrender.com/restar3", {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success != "true") {
                    window.location.href = "/fallo";
                } else {
                    if (aviso == 1) {
                        const aviso = document.getElementById("avisollenar");
                        const fondo = document.getElementById("modalBg");
                        aviso.style.display = "block";
                        fondo.style.display = "block";
                    } else {
                        window.location.href = "/home";
                    }
                }
            });
    }
}
