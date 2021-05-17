
const asociacionDB = require('../models/asocicion');
const listacertificacionDB = require('../models/lisasociaciones');
const listestadosDB =require('../models/estados');
const { cargar } = require('../helpers/uploadasociacion');
const add  = async (req,res)=>{
   const eid  = req.IDEmpresa;
   const datos = req.body;
   let datosd = [];
   try {

      

       // si traigo algun id de una asocioacion solo guardo la relacion
       if(datos.id!==''){
        datosd.IDEmpresa = eid;
        datosd.Asociacion = datos.id; 
        const realcion = new asociacionDB(datosd);
        const newralcion = realcion.save();
        return res.status(200).json({
            ok:true,
            newralcion
        });
       }else{
        
        if(req.files.Imagen){
            var file = req.files.Imagen;
            var myKey = eid + "_" + file.name;
            const respuesta = await cargar(myKey, file.path, eid);
            if (!respuesta.ok) {
                return res.status(500).json({
                    ok: false,
                    msg: respuesta.error
                });
            }
            // si ya lo cargo ahora guardo los datos
            datos.Imagen = 'https://asociacionesadmyo.s3.amazonaws.com/' + myKey;
        }

                 // tengo que guardar los datos de la nueva asociacion
           const newListcentificacion  = new listacertificacionDB(datos);
           newListcentificacion.save();
           
           const dat = {IDEmpresa: eid, Asociacion:newListcentificacion._id}
           const realcion = new asociacionDB(dat);
           const newralcion =  realcion.save();
           return res.status(200).json({
            ok: true,
            newralcion
        });
       }
     
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });
   }

}

const deleteR = async (req,res)=>{
    const id = req.params.id;
    try {
        const deletet = await asociacionDB.findById(id);
        if(!deletet){
            return res.status(404).json({
                ok: false,
                msg: 'Asociación no registrada'
            });
        }
        const respuesta = await asociacionDB.findByIdAndRemove(id);
        return res.status(200).json({
            ok:true,
            status: respuesta
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
    const id = req.params.id;

    try {
        const respuesta = await asociacionDB.findById(id)
        .populate({
            path: 'IDAsociacion'
          });
        if(!respuesta){
            return res.status(404).json({
                ok:false,
                msg:'Certificacion no registrada'
            });
        }
        return res.status(200).json({
            ok:true,
            data: respuesta
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el adminstrador'
        });
    }
}

const getall = async(req,res)=>{
    const id = req.IDEmpresa;
    try {
        let respuesta = await asociacionDB.find({IDEmpresa:id})
        .populate({
            path: 'Asociacion'
          });
       
    
       console.log(respuesta);
        if(!respuesta){
            return res.status(404).json({
                ok:false,
                msg:'Certificacion no registrada'
            });
        }
        return res.status(200).json({
            ok:true,
            data: respuesta
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el adminstrador'
        });
    }
}
const listAsociacon = async(req,res)=>{
    try {
        let asociacion = await listacertificacionDB.find();
        if(!asociacion){
            return res.status(404).json({
                ok:false,
                msg:'Certificacion no registrada'
            });
        }
        const listestados = await listestadosDB.find();
        return res.status(200).json({
            ok:true,
            data: asociacion,
            estados: listestados
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el adminstrador'
        });
    }
}
module.exports = {
    add,
    deleteR,
    get,
    getall,
    listAsociacon
}