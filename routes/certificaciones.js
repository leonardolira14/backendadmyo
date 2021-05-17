const { Router }  = require('express');
const router = Router();
const multiparty = require('connect-multiparty');
const  multipartyMiddleware = multiparty();
const { check } = require('express-validator');
const { validaCampos }  = require('../middlewares/validar-campos');
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { add,update,deleteC,get,getall } = require('../controller/certificacion');
const { validarJWT }  = require('../middlewares/validat-jwt');



router.post(
    '/',
    [
        validarJWTMaster,
        multipartyMiddleware
       
    ],
    add
);
router.delete(
    '/:id',
    [
        validarJWTMaster,       
    ],
    deleteC
);
router.put(
    '/:id',
    [
        validarJWTMaster,
        multipartyMiddleware
       
    ],
    update
);
router.get(
    '/get/:id',
    [
        validarJWTMaster,
       
    ],
    get
);
router.get(
    '/getall',
    [
        validarJWT,
       
    ],
    getall
);

module.exports = router;