const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { add,getCuestionario,getcalificacion,getdataForm,getdataCompany } = require('../controller/calificaciones');

route.post('/add',validarJWT,add);
route.post('/getcuestionario/',validarJWT,getCuestionario);
route.get('/getcalificacion/:id',validarJWT,getcalificacion);
route.get('/getdataForm/',validarJWT,getdataForm);
route.get('/getdataCompany/:id',validarJWT,getdataCompany);
module.exports = route;