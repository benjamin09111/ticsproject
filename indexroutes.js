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

//podemos unir luego para siempre tener visualizado el arreglo y la temperatura actual.

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

    //retornar la temperature del perfil asociado
    res.status(200).json({temperature: profile.temperature});

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
    res.status(200).json({temperatures: profile.temperatures});

})

//aqui envía la info el dispositivo
router.post("/temperatureget", async (req, res) => {
    console.log("Full request:", req);
    const {temperature} = req.body;

    console.log(req.body);

    did = 5;

    if(!temperature){
        console.log("Falla. No llego la temperatura.");
        return null;
    }else if(!did){
        console.log("Falla. No llego el did.");
        return null;
    }

    console.log("Llegaron")

    //guardar en base de datos
    const profile = await Profile.findOne({did: did});

    if(!profile){
        console.log("Falla. Perfil no encontrado.");
        return  res.status(400).json({ success: "false", message: "Dispositivo no encontrado" });
    }

    profile.temperature = temperature; //temperatura actual
    profile.temperatures.unshift(temperature);
    profile.save();
    console.log("Todo correcto. Ha llegado la temperatura y perfil: ",temperature," ", did);
})

router.get("/usuario", authenticateToken, async (req, res) => {
    const token = req.headers['token'];

    const decoded = jwt.verify(token, SECRET);
        
    const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            res.status(404).json({ success: false, message: "e" });
        }else{
            res.status(200).json({
            name: user.name,
            email: user.email,
            dinero: user.myMoney,
            card: user.card,
            });
        }
});

router.post("/usuario", async (req, res) => {
    const { name, email, password, did } = req.body;

    if (!name || !email || !password || !did) {
        return res.status(400).json({ success: "false", message: "inc" });
    }

    console.log(did)

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

router.post("/ingresar", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: "false", message: "inc" });

    const emailUser = await User.findOne({ email });

    if (!emailUser) {
        return res
            .status(404)
            .json({ sucess: "false", message: "no existe el usuario" });
    }

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
        .json({ success: "true", header: "token", token: token });
});

module.exports = router;
