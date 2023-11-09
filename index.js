const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")
const indexRoutes = require("./indexroutes");
const viewRoutes = require("./viewroutes");
const cookieParser = require('cookie-parser');

const app = express();

// Añadir variables a mi servidor "app"
app.set('port', process.env.PORT || 4000);

//path
app.use(cookieParser());
app.use(express.static("public"));

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

// Otras configuraciones
app.use(express.json());

// Inicializar el servidor
app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
