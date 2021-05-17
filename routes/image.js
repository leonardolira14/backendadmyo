const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { getImagenEmpresa,DetalleImagen }  = require('../controller/imagen');

route.get('/getimagen/:fecha/:tipo',validarJWT,getImagenEmpresa);
route.get('/DetalleImagen/:fecha/:tipo/:giro',validarJWT,DetalleImagen);

module.exports = route;