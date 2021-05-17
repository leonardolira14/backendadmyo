const  EmpresaDB = require('../models/empresa');
const UsuarioDB = require('../models/usuarios');
const bycript = require('bcryptjs');
const { active } = require('../helpers/mail');
const tipoempresaDB = require('../models/tipoempresa');
const facturacionlistDB = require('../models/facturacionanual');
const lisnumempleados = require('../models/numempleados');
const listestadosDB =require('../models/estados');
const { cargar }  = require('../helpers/uploadempresa');
const MarcasDB = require('../models/marcas');
const Certificaciones = require('../models/certificacion');
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
        const usuariofind =  await UsuarioDB.findOne({Correo:datos.usuario.Correo});
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
        const contrasena = bycript.hashSync(datos.usuario.Password,salt);
        datos.usuario.IDEmpresa = respuesta._id;
        datos.usuario.Password  = contrasena;
        datos.usuario.Tipo_Usuario = true;
        const usuarioN  = new UsuarioDB(datos.usuario);
        const usuariores = await usuarioN.save();
        const respuestamai = await active(datos.usuario.Nombre.toUpperCase(),datos.usuario.Correo,datos.usuario.Correo,usuariores._id);
       
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
const getdata = async(req,res)=>{
    const eid = req.IDEmpresa;

    try {
        const dataempresa = await EmpresaDB.findById(eid);
        const tiposempresa = await tipoempresaDB.find();
        console.log(tiposempresa);
        const lisfacturacion = await facturacionlistDB.find();
        const lisempleados = await lisnumempleados.find();
        const listestados = await listestadosDB.find();
        const certificacione = await Certificaciones.find({'IDEmpresa':eid});
        const marcas = await MarcasDB.find({IDEmpresa:eid});
        if(!dataempresa){
            return res.status(500).json({
                ok:false,
                msg:'Empresa no registrada'
            });
        }
        delete dataempresa.Estatus;
        delete dataempresa.id;
        return res.status(200).json({
            ok: true,
            empresa: dataempresa,
            tiposEmpresa: tiposempresa,
            lisfacturacion,
            lisempleados,
            listestados,
            marcas,
            certificaciones: certificacione
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const update = async(req,res)=>{
    const eid= req.IDEmpresa;
    const uid = req.uid;
    const datos = req.body;


    try {
       const updateempresa  = await EmpresaDB.findByIdAndUpdate(eid,datos);
       if(!updateempresa){
        return res.status(404).json({
            ok: false,
            msg: 'empresa no registrada'
        });
       
       }
       return res.status(200).json({
            ok: true,
            msg: updateempresa
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updatelogo = async(req,res)=>{
    try {
        const eid = req.IDEmpresa;
        const respuesta = await EmpresaDB.findById(eid);
        const datos={};
        if(!respuesta){
            return res.status(404).json({
                ok:false,
                msg:'Empresa no registrada'
            });
        }
        
        if(req.files.Logo !== undefined){
            var file = req.files.Logo;
            var myKey = eid + "_" + file.name;
            const respuesta = await cargar(myKey, file.path, eid);
            if (!respuesta.ok) {
                return res.status(500).json({
                    ok: false,
                    msg: respuesta.error
                });
            }
            datos.Logo = ' https://logoempresaadmyo.s3.amazonaws.com/' + myKey;
            
        }
        console.log(datos);
        const updateempresa = await EmpresaDB.findByIdAndUpdate(
            eid,
            datos,
            {new: true }
          );
          if(!updateempresa){
            return res.status(404).json({
                ok:false,
                msg:'Empresa no registrar'
            });
          }
          return res.status(200).json({
            ok:true,
            data:updateempresa
        });
        
          
        
    } catch (error) {
        
    }
}
const getAllEmpresa = async(filtros)=>{
    try {
        const RespEmpresaDb = await EmpresaDB.find({},filtros);
        return RespEmpresaDb;
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'Hable con el administrador'
        };
    }
}
module.exports = {
    addCompany,
    getdata,
    update,
    updatelogo,
    getAllEmpresa
}