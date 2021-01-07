const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { add,getCuestionario,getcalificacion } = require('../controller/calificaciones');

route.post('/add',validarJWT,add);
route.get('/getcuestionario/:subGiro/:Tipo',validarJWT,getCuestionario);
route.get('/getcalificacion/:id',validarJWT,getcalificacion);
module.exports = route;