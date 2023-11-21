const User = require("./user");
const Profile = require("./profile");
const authenticateToken = require("./middleware");
const express = require("express");
const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = "transfer-api";
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(express.json({}));
router.use(express.static("public"))
router.use(bodyParser.json());

/*
FUNCIONES A AGREGAR

- En caso de detectar cambio de un botón, enviar confirmación !
- Al sobrepasar temperatura, automaticamente lanzar un aviso, igual que el cambio de botón 
- Ingresar primeramente al iniciar sesión: atributo "nuevo: bool" para inscribir información !
- Batería baja 
- Agregar gráfico de temperatura en vez de historial, o hacer una tabla más bonita ! READY
- Alarma si es que el estado del boton no ha cambiado !
- Permitir ver cuantas dosis le quedan según lo que toma por cada una, matematica ! 
*/

router.get("/obtain", async(req,res)=>{
    const token = req.headers['token'];

    const decoded = jwt.verify(token, SECRET);
        
    const user = await User.findOne({ _id: decoded.id });

    if(!user){
        return res.status(400).json({ success: "false", message: "Usuario no encontrado" });
    }
    //obtener did del usuario
    const emailuser = user.email;
    //buscar temperature del usuario asociado al perfil
    const profile = await Profile.findOne({user: emailuser});

    if(!profile){
        return res.status(400).json({ success: "false", message: "Perfil no encontrado" });
    }

    //retornar la temperature y botones del perfil asociado
    res.status(200).json({nuevo: profile.nuevo});

});

//get para obtener la temperatura del usuario actual
router.get("/gettemperature", async(req,res)=>{
    const token = req.headers['token'];

    const decoded = jwt.verify(token, SECRET);
        
    const user = await User.findOne({ _id: decoded.id });

    if(!user){
        return res.status(400).json({ success: "false", message: "Usuario no encontrado" });
    }
    //obtener did del usuario
    const emailuser = user.email;
    //buscar temperature del usuario asociado al perfil
    const profile = await Profile.findOne({user: emailuser});

    if(!profile){
        return res.status(400).json({ success: "false", message: "Perfil no encontrado" });
    }

    //retornar la temperature y botones del perfil asociado
    res.status(200).json({temperature: profile.temperature, buttons: profile.buttons, max: profile.max, dosis: profile.dosis, actuales: profile.actuales});

});

router.get("/getcont", async(req,res)=>{
    const token = req.headers['token'];

    const decoded = jwt.verify(token, SECRET);
        
    const user = await User.findOne({ _id: decoded.id });

    if(!user){
        return res.status(400).json({ success: "false", message: "Usuario no encontrado" });
    }
    //obtener did del usuario
    const emailuser = user.email;
    //buscar temperature del usuario asociado al perfil
    const profile = await Profile.findOne({user: emailuser});

    if(!profile){
        return res.status(400).json({ success: "false", message: "Perfil no encontrado" });
    }

    //retornar el array de temperature del perfil asociado
    res.status(200).json({cont: profile.cont});

});

router.get("/gettemperatures", async(req,res)=>{
    const token = req.headers['token'];

    const decoded = jwt.verify(token, SECRET);
        
    const user = await User.findOne({ _id: decoded.id });

    if(!user){
        return res.status(400).json({ success: "false", message: "Usuario no encontrado" });
    }
    //obtener did del usuario
    const emailuser = user.email;
    //buscar temperature del usuario asociado al perfil
    const profile = await Profile.findOne({user: emailuser});

    if(!profile){
        return res.status(400).json({ success: "false", message: "Perfil no encontrado" });
    }

    //retornar el array de temperature del perfil asociado
    res.status(200).json({temperatures: profile.temperatures, dates: profile.date});

});

//
router.post("/begin", async(req,res)=>{
    const {buttonState1, buttonState2, buttonState3, max1, max2, max3, d1, d2, d3} = req.body;

    if(!buttonState1 || !buttonState2 || !buttonState3 || !max1 || !max2 || !max3 || !d1 || !d2 || !d3){
        console.log("Fallo. No llego todo.");
        return null;
    }

     //guardar en base de datos
     const profile = await Profile.findOne({did: did});

     if(!profile){
         console.log("Falla. Perfil no encontrado.");
         return  res.status(400).json({ success: "false", message: "Dispositivo no encontrado" });
     }

     if(buttonState1 != -1){
        profile.buttons[0] = buttonState1;
     }
     if(buttonState2 != -1){
        profile.buttons[1] = buttonState2;
     }
     if(buttonState3 != -1){
        profile.buttons[2] = buttonState3;
     }
     if(max1 != -1){
        profile.max[0] = max1;
     }
     if(max2 != -1){
        profile.max[1] = max2;
     }
     if(max3 != -1){
        profile.max[2] = max3;
     }
     if(d1 != -1){
        profile.dosis[0] = d1;
     }
     if(d2 != -1){
        profile.dosis[1] = d2;
     }
     if(d3 != -1){
        profile.dosis[2] = d3;
     }

    await profile.save();
})

router.post("/dosisalert", async(req,res)=>{
    const token = req.headers['token'];

    const decoded = jwt.verify(token, SECRET);
        
    const user = await User.findOne({ _id: decoded.id });

    if(!user){
        return res.status(400).json({ success: "false", message: "Usuario no encontrado" });
    }
    //obtener did del usuario
    const emailuser = user.email;
    //buscar temperature del usuario asociado al perfil
    const profile = await Profile.findOne({user: emailuser});

    if(!profile){
        return res.status(400).json({ success: "false", message: "Perfil no encontrado" });
    }

    const value1 = parseFloat(profile.actuales[0]) - parseFloat(profile.dosis[0]);
    const value2 = parseFloat(profile.actuales[1]) - parseFloat(profile.dosis[1]);
    const value3 = parseFloat(profile.actuales[2]) - parseFloat(profile.dosis[2]);

    var resultado = "bien";

    if(value1 < profile.dosis[0]){
        resultado = "alerta";
    }
    if(value2 < profile.dosis[1]){
        resultado = "alerta";
    }
    if(value3 < profile.dosis[2]){
        resultado = "alerta";
    }

    //retornar la temperature y botones del perfil asociado
    res.status(200).json({resultado: resultado});

})

//app envía los botones y se actualiza el arreglo
router.post("/buttonsget", async(req,res)=>{
    const {buttonState1, buttonState2, buttonState3} = req.body;
    did = 5;

    if(!buttonState1 || !buttonState2 || !buttonState3){
        console.log("Fallo. No llego algun boton.");
        return null;
    }

    //guardar en base de datos
    const profile = await Profile.findOne({did: did});

    if(!profile){
        console.log("Falla. Perfil no encontrado.");
        return  res.status(400).json({ success: "false", message: "Dispositivo no encontrado" });
    }

    profile.buttons[0] = parseFloat(buttonState1);
    profile.buttons[1]= parseFloat(buttonState2);
    profile.buttons[2] = parseFloat(buttonState3);
    await profile.save();

});

//aqui envía la info el dispositivo
router.post("/temperatureget", async (req, res) => {
    const {temperature} = req.body;
    did = 5;

    if(!temperature){
        console.log("Falla. No llego la temperatura.");
        return null;
    }else if(!did){
        console.log("Falla. No llego el did.");
        return null;
    }

    //guardar en base de datos
    const profile = await Profile.findOne({did: did});

    if(!profile){
        console.log("Falla. Perfil no encontrado.");
        return  res.status(400).json({ success: "false", message: "Dispositivo no encontrado" });
    }

    profile.temperature = temperature; //temperatura actual

    //solo se agrega al historial si es diferente a lo ultimo leído
    if(profile.temperatures[0] != temperature){
        profile.temperatures.unshift(temperature);
        profile.date.unshift(Date.now());
    }
    await profile.save();
});

router.post("/usuario", async (req, res) => {
    const { name, email, password, did } = req.body;

    if (!name || !email || !password || !did) {
        return res.status(400).json({ success: "false", message: "inc" });
    }

    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
        return res.status(400).json({ success: "false", message: "Email en uso" });
    } else {
        //verificar si existe ya ese dispositivo/perfil
        const existProfile = await Profile.findOne({ email: email });
        if(existProfile){
            return res.status(400).json({ success: "false", message: "Dispositivo ya existente" });
        }

        const user = new User({ name: name, email: email, password: password});
        user.password = await user.encryptPassword(password);
        await user.save();

        const profile = new Profile({user: email, did: did});
        await profile.save();

        return res.status(200).json({ success: "true", message: "Usuario creado" });
    }
});

router.post("/fill", async (req, res) => {
    const {espacio1, espacio2, espacio3, max1, max2, max3, d1, d2, d3} = req.body;
    did = 5;

    const profile = await Profile.findOne({did: did});

    if(!profile){
        console.log("Falla. Perfil no encontrado.");
        return  res.status(400).json({ success: "false", message: "Dispositivo no encontrado" });
    }

    if(espacio1){
        profile.buttons[0] = 1;
    }
    if(espacio2){
        profile.buttons[1] = 1;
    }
    if(espacio3){
        profile.buttons[2] = 1;
    }
    if(max1 && max1 > 0){
        profile.max[0] = max1;
        profile.actuales[0] = max1;
    }
    if(max2 && max2 > 0){
        profile.max[1] = max2;
        profile.actuales[1] = max2;
    }
    if(max3 && max3 > 0){
        profile.max[2] = max3;
        profile.actuales[2] = max3;
    }
    if(d1  && d1 > 0){
        profile.dosis[0] = d1;
    }
    if(d2  && d2 > 0){
        profile.dosis[1] = d2;
    }
    if(d3  && d3 > 0){
        profile.dosis[2] = d3;
    }

    const variable = profile.cont;
    profile.cont = variable + 1;

    await profile.save();
    return res.status(200).json({ success: "true", message: "Informacion actualizada" });
});

router.post("/ingresar", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: "false", message: "inc" });

    const emailUser = await User.findOne({ email });

    if (!emailUser) {
        return res
            .status(404)
            .json({ sucess: "false", message: "no existe el usuario" });
    }
    const nuevo = emailUser.nuevo;

    const passwordMatch = await emailUser.matchPassword(password);

    if (!passwordMatch) {
        return res
            .status(400)
            .json({ success: "false", error: "contraseña incorrecta" });
    }

    const token = jwt.sign({ id: emailUser._id }, SECRET, {
        expiresIn: 84600,
    });

    return res
        .status(200)
        .json({ success: "true", header: "token", token: token, nuevo: nuevo });
});

module.exports = router;
