const notficacionesDB = require('../models/notificaciones');


const getall = async (req,res)=>{
    try {
        const eid = req.IDEmpresa;

        const notificaciones = await notficacionesDB.find({IDEmpresa:eid}).populate({path:'IDEmpresaB'});
        return res.status(200).json({
            ok: true,
            notificaciones
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
    getall,
   
}