const { Router } = require('express');
const { add,update,deleteM,get,getall }  = require('../controller/marca');
const { check } = require('express-validator');
const { validaCampos  } = require('../middlewares/validar-campos');
const { validarJWTMaster }  = require('../middlewares/validarMaster');
const { validarJWT } = require('../middlewares/validat-jwt');

const multiparty = require('connect-multiparty');
const  multipartyMiddleware = multiparty();


const  route = Router();

route.post('/',[
    validarJWTMaster,
    multipartyMiddleware,
    check('Marca','El campo marca es necesario').not().isEmpty(),
    validaCampos
],
add);
route.put('/:id',[
    validarJWTMaster,
    multipartyMiddleware,
    check('Marca','El campo marca es necesario').not().isEmpty(),
    validaCampos
],
update);
route.delete('/:id',[
    validarJWTMaster,
],
deleteM);

route.get('/get/:id',[
    validarJWTMaster,
],
get);

route.get('/getall',[validarJWT],getall);

module.exports = route;