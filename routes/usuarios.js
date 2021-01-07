const { Router } = require('express');
const  route = Router();
const { validarJWTMaster}  = require('../middlewares/validarMaster');
const { validarJWT }  = require('../middlewares/validat-jwt');
const { add,update,deleteu,getall,get,master, updatepasword } = require('../controller/usuarios');
const multiparty = require('connect-multiparty');

const  multipartyMiddleware = multiparty();
route.post('/',
    [validarJWTMaster,multipartyMiddleware],
    add
);

route.put('/:id',
    [validarJWTMaster,multipartyMiddleware],
    update
);
route.delete('/:id',
    [validarJWTMaster,multipartyMiddleware],
    deleteu
);
route.get('/get/:id',
    [validarJWTMaster],
    get
);
route.get('/getall',
    [validarJWT],
    getall
);
route.get('/master/:id',
[validarJWTMaster],
    master
);
route.get('/udpatepassword/:id',
[validarJWT],
    updatepasword
);
module.exports = route;