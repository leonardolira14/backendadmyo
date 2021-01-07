const usuariosDB = require('../models/usuarios');
const { cargar } = require('../helpers/uploadusuarios');
const bycript = require('bcryptjs');
const  {generatePasswordRand} = require('../helpers/funciones');
const { activeus,bajausuario} = require('../helpers/mail');

// funcion para registar un nuevo usuario

const add = async (req,res) => {
    const eid = req.IDEmpresa;
    const datos = req.body;
    try {
        // ahora verifico que el usuario no exista antes de guardar
        const usuariofind =  await usuariosDB.findOne({Correo:datos.Correo});
        if(usuariofind !== null){
            return res.status(404).json({
                ok:false,
                msg:'Correo electronico ya existe'
            });
        }
        
        if(req.files.Logo){
            var file = req.files.Logo;
            var myKey = eid + "_" + file.name;
            const respuesta = await cargar(myKey, file.path, eid);
            if (!respuesta.ok) {
                return res.status(500).json({
                    ok: false,
                    msg: respuesta.error
                });
            }
            // si ya lo cargo ahora guardo los datos
            datos.Logo = 'https://logousuariosadmyo.s3.amazonaws.com/' + myKey;
        }
        const password = generatePasswordRand(6);
        const salt = bycript.genSaltSync();
        const contrasena = bycript.hashSync(password,salt);
        datos.IDEmpresa = eid;
        datos.Password  = contrasena;

        const usuario = new usuariosDB(datos);
        const respuest = await usuario.save();
        const respuestamai = await activeus(datos.Nombre.toUpperCase(),datos.Correo,datos.Correo,respuest.id,password);
       
        if(respuestamai === false){
            return res.status(500).json({
                ok:false,
                msg:'Existe un error al enviar el correo de activación favor de contactar al administrador'
            });
        }
      
        return res.status(200).json({
            ok:true,
            respuest
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const deleteu = async (req,res) =>{
    try {
        const id= req.params.id;
        // obtengo los datos del usuario para notificacarle que ha sido eliminado
        const datosUser  = await usuariosDB.findById(id);
        if(!datosUser){
            return res.status(404).json({
                ok: false,
                msg: 'usuario no registrado'
            });
        }
        // notifico al usuario que lo han eliminado
        const respuesta  = bajausuario(datosUser.Correo,datosUser.Nombre);
        if(respuesta === false){
            return res.status(500).json({
                ok:false,
                msg:'Existe un error al enviar el correo de activación favor de contactar al administrador'
            });
        }
        //elimino el usuario
        const deletet = await usuariosDB.findByIdAndRemove(id);
        return res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado',
            data:deletet
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const update = async (req,res)=>{
    try {

        const id = req.params.id;
        const eid = req.IDEmpresa;
        const datos = req.body;
        if(req.files.Logo){
            var file = req.files.Logo;
            var myKey = eid + "_" + file.name;
            const respuesta = await cargar(myKey, file.path, eid);
            if (!respuesta.ok) {
                return res.status(500).json({
                    ok: false,
                    msg: respuesta.error
                });
            }
            // si ya lo cargo ahora guardo los datos
            datos.Logo = 'https://logousuariosadmyo.s3.amazonaws.com/' + myKey;
        }

        // ahora actualizo los datos
        const udapteuser = await usuariosDB.findByIdAndUpdate(
            id,
            datos,
            {new:true}
            )
        if(!udapteuser){
            return res.status(404).json({
                ok: false,
                msg: 'usuario no registrador'
            }); 
        }
        return res.status(200).json({
            ok:true,
            udapteuser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const get = async (req,res)=>{ 
    try {
        const id = req.params.id;
        const usuario  = await usuariosDB.findById(id);

        if(!usuario ){
            return res.status(500).json({
                ok:false,
                msg:'Usuario no registrado'
            });
        }
        delete usuario.Password;
        return res.status(200).json({
            ok:true,
            data:usuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const getall = async (req,res)=>{ 
    try {
        const id = req.IDEmpresa;
        console.log(id);
        const usuario  = await usuariosDB.find({IDEmpresa:id});
        delete usuario.Password;
        return res.status(200).json({
            ok:true,
            data:usuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const master = async (req,res)=>{
    try {
        const id = req.params.id;
        const eid = req.IDEmpresa;
        // pongo tdos los usarios en falso
        const respuesta = await usuariosDB.updateMany({IDEmpresa:eid},{Tipo_Usuario:false});
        if(!respuesta){
            return res.status(500).json({
                ok:false,
                msg:'Error al modificar el usuario'
            });
        }
        // ahora solo modifico el usario
        const mewmaster = await usuariosDB.findByIdAndUpdate(id,{Tipo_Usuario:true});
        if(!mewmaster){
            return res.status(500).json({
                ok:false,
                msg:'Error al modificar el usuario'
            });
        }
        delete newuser.Password;
        return res.status(200).json({
            ok:true,
            data: mewmaster
        });
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updatepasword = async (req,res)=>{
    try {
     const id = req.params.id;
     const clave1 = req.body.Password;
     const clave2 = req.body.PasswordN;
     const usuarioDB = await usuariosDB.findById(id);
        // valido que la contraseña sea igual a la anteriror
    const validPassword = bycript.compareSync(clave1,usuarioDB.Password);
    if(!validPassword){
        return res.status(404).json({
            ok: false,
            msg: 'Contraseña no valida'
        });
    }
    const salt = bycript.genSaltSync();
    const contrasena = bycript.hashSync(clave2,salt);


    const newuser  = await usuariosDB.findByIdAndUpdate(id,{Password: contrasena});
    if(!newuser){
        return res.status(404).json({
            ok: false,
            msg: 'usuario no registrador'
        }); 
    }
    return res.status(200).json({
        ok:true
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
    add,
    deleteu,
    update,
    get,
    getall,
    master,
    updatepasword
}