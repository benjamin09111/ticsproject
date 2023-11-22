const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const admin = require('firebase-admin');
const indexRoutes = require("./indexroutes");
const viewRoutes = require("./viewroutes");
const cookieParser = require('cookie-parser');
const User = require("./user");

const app = express();

// Añadir variables a mi servidor "app"
app.set('port', process.env.PORT || 4000);

//path
app.use(cookieParser());
app.use(express.static("public"));

// Otras configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyATBTZXw0S3SSMm8p3AlpAZUzB3c63mEjs",
  authDomain: "tics-d2e74.firebaseapp.com",
  projectId: "tics-d2e74",
  storageBucket: "tics-d2e74.appspot.com",
  messagingSenderId: "698445301799",
  appId: "1:698445301799:web:dae23697a2b2ab16be2602",
  measurementId: "G-3JPMK1K9BB"
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Rutas
app.use(indexRoutes);
app.use(viewRoutes);

// Notificación
app.get('/notification', async(req, res) => {
    // Enviar notificación
    const registrationToken = req.headers['token'];

    const decoded = jwt.verify(registrationToken, SECRET);
        
    const user = await User.findOne({ _id: decoded.id });

    if(!user){
        return res.status(404).json({ success: "false", message: "Usuario no encontrado" });
    }

    const message = {
      token: registrationToken,
      notification: {
        title: 'Recordatorio DiabetesCare: Colocar Dosis',
        body: 'Se ha detectado un espacio en uso vacío por mucho tiempo. Por favor, precaución.',
      },
    };

    admin.messaging().send(message)
    .then((response) => {
      return res.status(200).json({ success: "true", message: "Notificación enviada." });
    })
    .catch((error) => {
      return res.status(400).json({ success: "false", message: "Error al enviar la notificación." });
    });
});


// Inicializar el servidor
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
