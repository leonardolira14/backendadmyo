const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { add,deleteR,get,getall,PrincipalG,getgiros,getsubgiros, getramas }  = require('../controller/giro');

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
deleteR);
route.get('/principal/:id',[
    validarJWTMaster
],
PrincipalG);

route.get('/giro',getgiros);
route.get('/subgiro/:id',getsubgiros);
route.get('/rama/:id',getramas);

module.exports = route;