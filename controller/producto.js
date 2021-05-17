const ProductoDB = require('../models/productos');
const EmpresaBD = require('../models/empresa');

const { cargar } = require('../helpers/uploadproducts');

const add = async (req,res) => {
    const eid = req.IDEmpresa;
    const datos = req.body;
    datos.IDEmpresa = eid;
    // https://productosadmyo.s3.amazonaws.com/
   
    try {
        // primero reviso que el plan en el que esta no sea el basico si lo es solo
        // tiene derecho a dos productos
        //busco la empresa y checo el plan
        const datos_empresa = await EmpresaBD.findById(eid);
        const respuesta = await ProductoDB.countDocuments({IDEmpresa:eid});
        console.log(respuesta, eid);
        if(!datos_empresa.DatosPago || !datos_empresa.DatosPago.plan || datos_empresa.DatosPago.plan === 'Basic'){
            if(respuesta === 2){
                return res.status(404).json({
                    ok:false,
                    code:1991
                });
            }   
            
            
        }
      
        if(req.files.Logo){
            const file = req.files.Logo;
            const myKey = eid + "_" + file.name;
        
            const respuesta = await cargar(myKey, file.path, eid);
            if (!respuesta.ok) {
                return res.status(500).json({
                    ok: false,
                    msg: respuesta.error
                });
            }
            // si ya lo cargo ahora guardo los datos
            datos.Logo = 'https://productosadmyo.s3.amazonaws.com/' + myKey;
        }
        
        const producto = new ProductoDB(datos);
        producto.save();

        return res.status(200).json({
            ok:true,
            producto
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        });
    }
};
const deleteC = async(req,res) =>{
    const id = req.params.id;
    
    try {
        const respuesta = await ProductoDB.findByIdAndRemove(id);
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
        const respuesta = await ProductoDB.findById(id);
        if(!respuesta){
            return res.status(404).json({
                ok:false,
                msg:'Producto o servicio no registrada'
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
    const id = req.IDEmpresa;
    console.log(id );
    try {
        const respuesta = await ProductoDB.find({IDEmpresa:id});
       
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
        const respuesta = await ProductoDB.findById(id);
    if(!respuesta){
        return res.status(404).json({
            ok:false,
            msg:'Producto o servicio no registrada'
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
        datos.Logo = ' https://productosadmyo.s3.amazonaws.com/' + myKey;
        
    }
    
    const updatecertificacion = await ProductoDB.findByIdAndUpdate(
        id,
        datos,
        {new: true }
      );
      if(!updatecertificacion){
        return res.status(404).json({
            ok:false,
            msg:'Producto o servicio no registrada'
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