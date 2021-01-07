const { Router } = require('express');
const  route = Router();
const { getall } =require('../controller/notificacion');
const { validarJWT } = require('../middlewares/validat-jwt');

route.get('/getall',[
    validarJWT,
],
getall);

module.exports = router;