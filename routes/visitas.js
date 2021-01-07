const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { getAll,addrelacion,addvisita } = require('../controller/visitas');

route.get('/getall',validarJWT,getAll);

route.post('/addrelacion',validarJWT,addrelacion);

route.post('/addvisita',validarJWT,addvisita);
module.exports = route;