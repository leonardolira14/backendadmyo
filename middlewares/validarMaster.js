const jwt = require('jsonwebtoken');
const {response} = require('express');
const validarJWTMaster = (req,res,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'No ha iniciado sesion'
        });
    }
    try {
        const { uid,IDEmpresa,TipoUsuario } = jwt.verify(token,process.env.API_WEB_KEY);
        console.log(TipoUsuario)
        if(!TipoUsuario){
            return res.status(404).json({
                ok:false,
                msg:'No tiene acceso a estas funciones contate al usuario master'
            });
        }
        req.uid = uid;
        req.IDEmpresa = IDEmpresa;
        req.TipoUsuario = TipoUsuario;
    } catch (error) {
        return res.status(404).json({
            ok:false,
            msg:'Sin Token Valido'
        });
    }
    next();
}
module.exports = {
    validarJWTMaster
}