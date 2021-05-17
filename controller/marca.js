const { models } = require('mongoose');
const marcaDB = require('../models/marcas');
const { cargar } = require('../helpers/uploadmarca');
const add= async (req,res)=>{
    const eid = req.IDEmpresa;
    const datos = req.body;
    datos.IDEmpresa = eid;
    
    try {
      if(req.files.Logo){
        var file = req.files.Logo;
        var myKey = eid + "_" + file.name;
    
        const respuestacon = await cargar(myKey, file.path, eid);
        if (!respuestacon.ok) {
            return res.status(500).json({
                ok: false,
                msg: respuestacon.error
            });
        }
        // si ya lo cargo ahora guardo los datos
          datos.Logo = 'https://marcasadmyo.s3.amazonaws.com/' + myKey;
      }
     

        // guardo la marca
        const marca = new marcaDB(datos);
        const respuesta = await marca.save();
        return res.status(200).json({
            ok:true,
            marca,
            status: respuesta,
            msg:'Marca registrada'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el adminstrador'
        });
    }
   
};

const update = async (req,res)=>{
    const datos = req.body;
    const id= req.params.id;
    const eid = req.IDEmpresa;

    try {
      if(req.files.Logo){
        var file = req.files.Logo;
        var myKey = eid + "_" + file.name;
    
        const respuestacon = await cargar(myKey, file.path, eid);
        if (!respuestacon.ok) {
            return res.status(500).json({
                ok: false,
                msg: respuestacon.error
            });
        }
        // si ya lo cargo ahora guardo los datos
          datos.Logo = 'https://marcasadmyo.s3.amazonaws.com/' + myKey;
      }
      const updatemarca = await marcaDB.findByIdAndUpdate(
        id,
        datos,
        {new: true }
      );
      if(!updatemarca){
        return res.status(404).json({
            ok:false,
            msg:'Marca no registrada'
        });
      }
      return res.status(200).json({
        ok:true,
        data:updatemarca
    });
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:'Hable con el adminstrador'
    });
  }

}
const deleteM = async (req,res)=>{
    const id = req.params.id;

    try {
        const updatemarca = await marcaDB.findByIdAndRemove(
          id
        );
        return res.status(200).json({
          ok:true,
          status: updatemarca
      });
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok:false,
          msg:'Hable con el adminstrador'
      });
    }
  
}
const get = async (req,res)=>{
    const id = req.params.id;
    try {
        
        const marcas = await marcaDB.findById(
          id
        );
        if(!marcas){
            return res.status(404).json({
                ok:false,
                msg:'sin registro de esta marca'
            });
        }
        return res.status(200).json({
          ok:true,
          data:marcas
      });
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok:false,
          msg:'Hable con el adminstrador'
      });
    }
}

const getall = async (req,res)=>{
    const eid = req.IDEmpresa;
    console.log(eid);
    try {
        const marcas = await marcaDB.find({
            IDEmpresa:eid
        });
         
          return res.status(200).json({
            ok:true,
            data:marcas
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
    update,
    deleteM,
    get,
    getall
}