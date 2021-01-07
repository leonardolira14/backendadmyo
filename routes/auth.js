const { Router } = require('express');
const { actviartoken, login }  = require('../controller/auth');
const { check } = require('express-validator');
const { validaCampos  } = require('../middlewares/validar-campos');
const { validarJWT }  = require('../middlewares/validat-jwt');
const  route = Router();

route.get('/activar/:token',actviartoken);
route.post('/login',
[
    check('correo','El campo correo electronico es obligatorio').not().isEmpty(),
    check('correo','El campo correo electrónico no es valido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validaCampos
]
,login);
module.exports = route;
