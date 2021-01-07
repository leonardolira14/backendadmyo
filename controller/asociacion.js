
const asociacionDB = require('../models/asocicion');
const listacertificacionDB = require('../models/lisasociaciones');

const add  = async (req,res)=>{
   const eid  = req.IDEmpresa;
   const datos = req.body;
   try {
       // si traigo algun id de una asocioacion solo guardo la relacion
       if(datos.IDAsociacion){
        datos.IDEmpresa = eid;
        const realcion = new asociacionDB(datos);
        const newralcion = realcion.save();
        return res.status(200).json({
            ok:true,
            newralcion
        });
       }else{
           // tengo que guardar los datos de la nueva asociacion
           const newListcentificacion  = new listacertificacionDB(datos);
           const datoslist = newListcentificacion.save();
           
           const dat = {IDEmpresa: eid, IDAsociacion:newListcentificacion._id}
           const realcion = new asociacionDB(dat);
           const newralcion = realcion.save();
           return res.status(404).json({
            ok: false,
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
            path: 'IDAsociacion'
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

module.exports = {
    add,
    deleteR,
    get,
    getall
}