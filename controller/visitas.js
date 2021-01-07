const VisitasDB = require('../models/vistas');
const relacioDB = require('../models/relacion_empresa');
const { separar }  = require('../helpers/funciones');
const mongoose = require('mongoose');

const getAll = async (req,res)=>{
    try {
        const eid = req.IDEmpresa;
        // primero obtengo las visitas que no son de ninguna empresa
        const todasvisitas = await VisitasDB.find({IDEmpresa:eid});
       
        //ahora traigo las empresas que son clientes
        const clientes  = await relacioDB.find({IDEmpresa:eid,Tipo:'cliente'}).populate({path:'IDEmpresaB'});
        const idclientes = await separar(clientes);
        const datos = await VisitasDB.find({'IDEmpresa':eid,IDEmpresaVista:{$in:idclientes}}).populate({path:'IDEmpresaVista'});
        const vclientes = [{'Numvistas':datos.length,data:datos}];
        
        // ahora obtengo los proveedores
        const proveedores  = await relacioDB.find({IDEmpresa:eid,Tipo:'proveedor'}).populate({path:'IDEmpresaB'});
        const idproveedores = await separar(proveedores);
        const datosp = await VisitasDB.find({'IDEmpresa':eid,IDEmpresaVista:{$in:idproveedores}}).populate({path:'IDEmpresaVista'});
        const vproveedores = [{'Numvistas':datosp.length,data:datosp}];
       
       
        return res.status(200).json({
            ok:true,
            clientes:vclientes,
            proveedores:vproveedores,
            otras:todasvisitas.length -(datosp.length+datos.length)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// funcion para agregrar una relacion
const addrelacion = async (req,res)=>{
    try {
        const datos  = req.body;
        const eid = req.IDEmpresa;
        datos.IDEmpresa = eid;
        const newrealcion = new relacioDB(datos);
        await newrealcion.save();
        return res.status(200).json({
            ok:true,
            newrealcion
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// funcion para agregrar una relacion
const addvisita= async (req,res)=>{
    try {
        const datos  = req.body;
        const eid = req.IDEmpresa;
        datos.IDEmpresa = eid;
        const newrealcion = new VisitasDB(datos);
        await newrealcion.save();
        return res.status(200).json({
            ok:true,
            newrealcion
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
    getAll,
    addrelacion,
    addvisita
}