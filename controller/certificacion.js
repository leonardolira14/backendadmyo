const certificacionDB = require('../models/certificacion');
const { cargar } = require('../helpers/uploadcertificacion');

const add = async (req, res) => {
    const eid = req.IDEmpresa;
    const datos = req.body;
    // https://certificacionesadmyo.s3.amazonaws.com/
   
    var file = req.files.Logo;
    var myKey = eid + "_" + file.name;
    datos.IDEmpresa = eid;

    try {
        const respuesta = await cargar(myKey, file.path, eid);
        if (!respuesta.ok) {
            return res.status(500).json({
                ok: false,
                msg: respuesta.error
            });
        }
        // si ya lo cargo ahora guardo los datos
        datos.Archivo = 'https://certificacionesadmyo.s3.amazonaws.com/' + myKey;
        const cerficacion = new certificacionDB(datos);
        cerficacion.save();

        return res.status(200).json({
            ok:true,
            cerficacion
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        });
    }
}

const deleteC = async(req,res) =>{
    const id = req.params.id;
    try {
        const respuesta = await certificacionDB.findByIdAndRemove(id);
        return res.status(200).json({
            ok:true,
            status: respuesta
        });
    } catch (error) {
        console.log(error);
      return res.status(500).json({
          ok:false,
          msg:'Hable con el adminstrador'
      });
    }
}

const get = async(req,res) =>{
    const id = req.params.id;
    try {
        const respuesta = await certificacionDB.findById(id);
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
const getall = async(req,res) =>{
    const id = req.IDEmpresa
    try {
        const respuesta = await certificacionDB.find({IDEmpresa:id});
       
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
const update = async (req,res)=>{
    const eid= req.IDEmpresa;
    const id = req.params.id;
    const datos = req.body;
    try {
        const respuesta = await certificacionDB.findById(id);
    if(!respuesta){
        return res.status(404).json({
            ok:false,
            msg:'Certificacion no registrada'
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
        datos.Archivo = ' https://certificacionesadmyo.s3.amazonaws.com/' + myKey;
        
    }
    
    const updatecertificacion = await certificacionDB.findByIdAndUpdate(
        id,
        datos,
        {new: true }
      );
      if(!updatecertificacion){
        return res.status(404).json({
            ok:false,
            msg:'Marca no registrada'
        });
      }
      return res.status(200).json({
        ok:true,
        data:updatecertificacion
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
    deleteC,
    get,
    getall,
    update
}