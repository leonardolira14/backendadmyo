const giroDB = require('../models/giros');
const subgiroDB = require('../models/subgiros');
const ramaDB = require('../models/rama');
const relacionGiroDB = require('../models/giroempresas');

// funcion para agregar una relacion 

const add = async (req,res)=>{
    const eid =  req.IDEmpresa;
    const body = req.body;
    try {
        body.IDEmpresa = eid;
           const relacion =  new relacionGiroDB(body);
            relacion.save();
            return res.status(200).json({
                ok:true,
                relacion
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteR = async (req,res)=>{
    const id =  req.params.id;
    try {
           const relacion = await relacionGiroDB.findByIdAndRemove(id);
           if(!relacion){
            return res.status(404).json({
                ok:false,
                msg:'Giro no registrado'
            });
        }
            return res.status(200).json({
                ok:true,
                relacion
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const PrincipalG = async (req,res)=>{
    const id =  req.params.id;
    const eid = req.IDEmpresa;
    try {
        // ahora pongo todos los giros sin principal
        await relacionGiroDB.updateMany(
            {IDEmpresa:eid},
            {Principal:false}
            );
       await relacionGiroDB.findByIdAndUpdate(
            id,
            {Principal:true}
            );
       const buscar = await relacionGiroDB.find({IDEmpresa:eid})
            .populate({
                 path: 'Giro'
             })
             .populate({
                 path: 'SubGiro'
             })
             .populate({
                 path: 'Rama'
             });
            return res.status(200).json({
                ok:true,
                data:buscar
            });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
 const get  = async (req,res)=>{
    const id =  req.params.id;
    console.log(id);
    try {
       const buscar = await relacionGiroDB.findById(id)
       .populate({
        path: 'Giro'
        })
        .populate({
            path: 'SubGiro'
        })
        .populate({
            path: 'Rama'
        });
        if(!buscar){
            return res.status(404).json({
                ok:false,
                msg:'giro no registrado'
            });
        }
        return res.status(200).json({
            ok:true,
            data: buscar
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
 }
 const getall  = async (req,res)=>{
    const eid =  req.IDEmpresa;
    try {
       const buscar = await relacionGiroDB.find({IDEmpresa:eid})
       .populate({
            path: 'Giro'
        })
        .populate({
            path: 'SubGiro'
        })
        .populate({
            path: 'Rama'
        });
        if(!buscar){
            return res.status(404).json({
                ok:false,
                msg:'giro no registrado'
            });
        }
        return res.status(200).json({
            ok:true,
            data: buscar
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
 }
const  getgiros =async(req,res)=>{

    try {
        
        const giros = await  giroDB.find({});
       
        return res.status(200).json({
            ok:true,
            giros
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const  getsubgiros =async(req,res)=>{
    const id = req.params.id;
    try {
        const subgiros = await  subgiroDB.find({IDGiro:id});
        return res.status(200).json({
            ok:true,
            subgiros
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const  getramas =async(req,res)=>{
    const id = req.params.id;
    try {
        const ramas = await  ramaDB.find({IDGiro:id});
        return res.status(200).json({
            ok:true,
            ramas
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
module.exports = {
    PrincipalG,
    add,
    deleteR,
    get,
    getall,
    getgiros,
    getsubgiros,
    getramas
}