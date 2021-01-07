const { Router }  = require('express');
const router = Router();
const multiparty = require('connect-multiparty');
const  multipartyMiddleware = multiparty();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { add,update,deleteC,get,getall } = require('../controller/producto');


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
    '/getall/',
    getall
);

module.exports = router;