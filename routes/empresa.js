const { Router }  = require('express');
const router = Router();
const { check } = require('express-validator');
const { validaCampos }  = require('../middlewares/validar-campos');
const { addCompany } = require('../controller/empresa');


router.post(
    '/add/',
    [
        check('RazonSocial','El campo Razon Social es obligatorio').not().isEmpty(),
        check('Rfc','El campo RFC es obligatorio').not().isEmpty(),
        check('Nombre','El campo RFC es obligatorio').not().isEmpty(),
        check('Apellidos','El campo RFC es obligatorio').not().isEmpty(),
        check('Correo','El campo Correo Electronico es obligatorio').isEmail(),
        check('Password','El campo RFC es obligatorio').not().isEmpty(),
        validaCampos
    ],
    addCompany
);

module.exports = router;