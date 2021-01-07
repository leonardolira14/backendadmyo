require('dotenv').config();

const { Mongoose } = require('mongoose');
const express   = require('express');
const  bodyparser = require('body-parser');

const app = express();
const helmet = require('helmet');

// aqui el archivo de rutas
const router_company = require('./routes/empresa');
const router_auth = require('./routes/auth');
const router_marca = require('./routes/marcas');
const router_certificaciones = require('./routes/certificaciones');
const router_asociaciones  = require('./routes/asociacion');
const router_giroempresa  = require('./routes/giroempresa');
const router_usuario  = require('./routes/usuarios');
const router_producto  = require('./routes/producto');
const router_visita  = require('./routes/visitas');
const router_imagen  = require('./routes/image');
const router_calificaciones  = require('./routes/calficaciones');
//midelware

app.use(bodyparser.urlencoded({limit:'10mb', extended: true}));
app.use(bodyparser.json({limit:'10mb',extended:true}));

app.use(helmet());

//cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

})

// rutas 

app.use('/api/company',router_company);
app.use('/api/auth',router_auth);
app.use('/api/marca',router_marca);
app.use('/api/certificacion',router_certificaciones);
app.use('/api/asociacion',router_asociaciones);
app.use('/api/producto',router_producto);
app.use('/api/usuarios',router_usuario);
app.use('/api/giros/empresa',router_giroempresa);
app.use('/api/visitas',router_visita);
app.use('/api/imagen',router_imagen);
app.use('/api/calificaciones',router_calificaciones);
module.exports = app;