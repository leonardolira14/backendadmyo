const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { add,deleteR,get,getall,listAsociacon }  = require('../controller/asociacion');
const multiparty = require('connect-multiparty');
const  multipartyMiddleware = multiparty();
route.post('/add',
[
    multipartyMiddleware,
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
route.get('/list',listAsociacon);
module.exports = route;