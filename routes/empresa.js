const { Router }  = require('express');
const router = Router();
const { check } = require('express-validator');
const { validaCampos }  = require('../middlewares/validar-campos');
const { addCompany,getdata,update,updatelogo } = require('../controller/empresa');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { validarJWTMaster } = require('../middlewares/validarMaster');
const multiparty = require('connect-multiparty');
const  multipartyMiddleware = multiparty();


router.post(
    '/add/',
    addCompany
);

router.get('/getdata',validarJWT,getdata);
router.put('/updatedate',validarJWTMaster,update);
router.put('/updatelogo',[multipartyMiddleware,validarJWTMaster],updatelogo);

module.exports = router;