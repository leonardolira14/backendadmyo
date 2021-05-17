const { Router } = require('express');
const router = Router();
const { getgiros,getramas,getsubgiros }  = require('../controller/giro');
router.get('/giro',getgiros);
router.get('/subgiro/:id',getsubgiros);
router.get('/rama/:id',getramas);
module.exports = router;
