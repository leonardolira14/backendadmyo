const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { getImagenEmpresa }  = require('../controller/imagen');

route.post('/getimagenempresa',validarJWT,getImagenEmpresa);

module.exports = route;