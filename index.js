const express = require('express');
const cors = require('cors');
const dbConnection = require('./DB/config');
require('dotenv').config();
//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

app.use(cors())

//Directorio publico
app.use( express.static('public') );

//Lectura y parse del body
app.use( express.json() );


//Rutas
//TODO: auth // crear, login, renw
//Todo: CRUS: Eventos

app.use('/api/user', require('./routes/auth.route'));
app.use('/api/events', require('./routes/events.route'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriente en puerto ${ process.env.PORT }`);
} )