const  EmpresaDB = require('../models/empresa');
const { response }  = require('express');
const UsuarioDB = require('../models/usuarios');
const bycript = require('bcryptjs');
const { active } = require('../helpers/mail');
// funcion para registrar una empresa
const addCompany = async (req,res)=>{
    const datos = req.body;
    const passe  = req.body.Password
    try {
        const EmpresaDb = await EmpresaDB.find({RazonSocial:datos.RazonSocial});
        if(EmpresaDb.length !== 0){
            return res.status(404).json({
                ok:false,
                msg:'Razon Social Existente'
            });
        }
        // ahora valido el rfc
        EmpresaRFC = await EmpresaDB.find({Rfc:datos.Rfc});
        
        if(EmpresaRFC.length !== 0){
            return res.status(404).json({
                ok:false,
                msg:'RFC Existente'
            });
        }

        // ahora verifico que el usuario no exista antes de guardar
        const usuariofind =  await UsuarioDB.findOne({Correo:datos.Correo});
        if(usuariofind !== null){
            return res.status(404).json({
                ok:false,
                msg:'Correo electronico ya existe'
            });
        }

        // ahora guardo la empresa con los datos que traigo
       
        const empresaN = new EmpresaDB(datos);
        const respuesta = await empresaN.save();
        // ahora genero el password 
        const salt = bycript.genSaltSync();
        const contrasena = bycript.hashSync(datos.Password,salt);
        datos.IDEmpresa = respuesta._id;
        datos.Password  = contrasena;
        datos.Tipo_Usuario = true;
        const usuarioN  = new UsuarioDB(datos);
        const usuariores = await usuarioN.save();
        const respuestamai = await active(datos.Nombre.toUpperCase(),datos.Correo,datos.Correo,usuariores._id);
       
        if(respuestamai === false){
            return res.status(500).json({
                ok:false,
                msg:'Existe un error al enviar el correo de activación favor de contactar al administrador'
            });
        }
        return res.status(200).json({
            ok: true
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
    addCompany
}