const jwt = require("jsonwebtoken");
const User = require("./user");
const SECRET = "transfer-api";
const path = require("path");

async function authenticateToken (req, res, next) {
    // Obtener el token de la cookie
    const token = req.cookies.token;

    // Verificar si el token existe
    if (!token) {
        const filePath = path.resolve(__dirname, 'public', 'err', 'errortoken.html');
        res.sendFile(filePath);
    }else{
        try {
            // Verificar y decodificar el token
            const decoded = jwt.verify(token, SECRET);
            // Agregar el ID del usuario al objeto `req` para futuras rutas
            req.userId = decoded.id;
    
            const user = await User.findById(decoded.id, {password: 0}) 
    
            if(!user){
                const filePath = path.resolve(__dirname, 'public', 'err', 'errortoken.html');
                res.sendFile(filePath);
            }else{
                next();
            }
        } catch (error) {
            const filePath = path.resolve(__dirname, 'public', 'err', 'errortoken.html');
            res.sendFile(filePath);
        }
    }
}

module.exports = authenticateToken;