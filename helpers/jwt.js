const jwt = require('jsonwebtoken');

const generarJWT = (uid,IDEmpresa,TipoUsuario)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            uid,
            IDEmpresa,
            TipoUsuario
        }
        console.log(payload);
        jwt.sign(
            payload,
            process.env.API_WEB_KEY,
            {
                expiresIn: '24hr'
            },
            (error,token)=>{
                if(error){
                    console.log(error);
                    reject('no se pudo generar el token');
                }else{
                    resolve(token);
                }
            }
        );
    });
    
}

module.exports = {
     generarJWT
}