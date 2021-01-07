const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'No ha iniciado sesion'
        });
    }
    try {
        const { uid,IDEmpresa,TipoUsuario } = jwt.verify(token,process.env.API_WEB_KEY);
        req.uid = uid;
        req.IDEmpresa = IDEmpresa;
        req.TipoUsuario = TipoUsuario;
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Sin Token Valido'
        });
    }
    next();
}
module.exports = {
    validarJWT
}