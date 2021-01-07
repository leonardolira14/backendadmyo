const { Router  }  = require('express');
const  UsuarioDB = require('../models/usuarios');
const AccesosDB = require('../models/accesos');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const accesos = require('../models/accesos');
const { active } = require('../helpers/mail');
// funcion para activar el usuario

const actviartoken = async(req,res) => {
    try {
        
        const token = req.params.token;
        // busco ese id
        const usuario = await UsuarioDB.findById(token);
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Token no valido'
            });
        }

        // si si lo encuentra pongo el status en true
       
        const usuarioActializado = await UsuarioDB.findByIdAndUpdate(
            token,
            {Status: true},

        );
        return res.status(200).json({
            ok: true,
            msg: 'Cuenta Activada'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'token no valido'
        });
    }
}

const login = async (req,res)=>{
    const { correo,password } = req.body;
    try {
        const usuarioDB = await UsuarioDB.findOne({Correo: correo});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email y/o Contraseña no validos'
            });
        }
       
        
        // verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.Password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Email y/o Contraseña no validos'
            });
        }
        if(!usuarioDB.Status){
            const respuestamai = await active(usuarioDB.Nombre.toUpperCase(),usuarioDB.Correo,usuarioDB.Correo,usuarioDB._id);
            if(respuestamai === false){
                return res.status(500).json({
                    ok:false,
                    msg:'Existe un error al enviar el correo de activación favor de contactar al administrador'
                });
            }
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no activado favor de validar su cuenta, se ha  enviado un correo, para activarla'
            });
        }
        // generando token
        const token = await generarJWT(usuarioDB.id,usuarioDB.IDEmpresa,usuarioDB.Tipo_Usuario);
        const accesosd = { IDUsuario: usuarioDB.id,IDEmpresa: usuarioDB.IDEmpresa};
        const newacceso = new AccesosDB(accesosd);
        newacceso.save();
        return res.status(200).json({
            ok: true,
            msg: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {
    actviartoken,
    login
}