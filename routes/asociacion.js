const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { add,deleteR,get,getall }  = require('../controller/asociacion');

route.post('/add',
[
    validarJWTMaster
],
add
);

route.get('/get/:id',
[
    validarJWT
],
get
);
route.get('/getall',[
    validarJWT
],
getall);

route.delete('/:id',[
    validarJWTMaster
],
deleteR)

module.exports = route;