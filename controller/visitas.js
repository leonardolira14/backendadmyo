const VisitasDB = require('../models/vistas');
const relacioDB = require('../models/relacion_empresa');
const { separar,dameNombreMes }  = require('../helpers/funciones');
const mongoose = require('mongoose');
const { mesesdias } = require('../helpers/funciones');
const moments = require('moment');
const getAll = async (req,res)=>{
    try {
        const eid = req.IDEmpresa;
        const tiempo = req.params.tiempo;
        const  fecha = new Date();
        let fechaIncio;
        let fechaFin;
        let fechaIncioP;
        let fechaFinP;
        let label=[];
        let periodo;  


        if(tiempo === 'M')
        {
             fechaIncio= new Date(fecha.getFullYear(),fecha.getMonth(),1);
             fechaFin= new Date(fecha.getFullYear(),fecha.getMonth()+1,0);
    
             fechaIncioP= new Date((fecha.getFullYear()-1),fecha.getMonth(),1);
             fechaFinP= new Date((fecha.getFullYear()-1),fecha.getMonth()+1,0);
            label = [await dameNombreMes(fecha.getMonth())+'-'+fecha.getUTCFullYear(),await dameNombreMes(fecha.getMonth())+'-'+fechaFinP.getUTCFullYear()];
            periodo = label[0];
        }else{
            fechaIncio= new Date(fecha.getFullYear(),0,1);
            fechaFin= new Date(fecha.getFullYear(),fecha.getMonth()+1,0);

            fechaIncioP= new Date((fecha.getFullYear()-1),0,1);
            fechaFinP= new Date((fecha.getFullYear()-1),fecha.getMonth()+1,0);

            label = [fecha.getUTCFullYear(),fechaFinP.getUTCFullYear()];
            periodo= await dameNombreMes(fechaIncio.getMonth())+"-"+fechaIncio.getUTCFullYear()+' / '+await dameNombreMes(fechaFin.getMonth())+"-"+fechaFin.getUTCFullYear() ;
           
        }
        /*
            tiempo tenemos 2 opciones
            M = Mes actual 
            MA = Acumulado desde enero del precente año
        
        */ 
           
             
        /*
            una vez teniendo las fechas tengo un array este lo tengo que ir recorriendo para obtener las visitas
            de por fecha ya sea de clientes o proveedores 
        */

        // primero obtengo las visitas que no son de ninguna empresa
        
        let  todasvisitas;

        todasvisitas = await VisitasDB.find({IDEmpresa:eid,
            $and: [
                {Fecha: {$gte: fechaIncio}},
                {Fecha: {$lte:fechaFin}}
              ]
        });
        //ahora traigo las empresas que son clientes
        const clientes  = await relacioDB.find({IDEmpresa:eid,Tipo:'cliente'}).populate({path:'IDEmpresaB'});
        const idclientes = await separar(clientes);
        
        // ahora obtengo los proveedores
        const proveedores  = await relacioDB.find({IDEmpresa:eid,Tipo:'proveedor'}).populate({path:'IDEmpresaB'});
        const idproveedores = await separar(proveedores);

        let grafica1=[];
        let grafica2=[];
        const data =  await getasyn(eid,fechaIncio,fechaFin,idclientes,idproveedores);
        const dataP =  await getasyn(eid,fechaIncioP,fechaFinP,idclientes,idproveedores);
        grafica1 =[{dataCliente:[data.dataCliente,dataP.dataCliente], dataProveedor:[data.dataProveedor,dataP.dataProveedor],dataOtras:[data.dataOtras,dataP.dataOtras]}];
       
                 //la grafica 2 es por mes asta el mes actual
             let dataAA;
             let dataAP;
             let datA=[];
             let datP=[];
            for(let index = 1;index<=fecha.getMonth()+1;index++){
                
                let fechaIncioA= new Date(fecha.getFullYear(),index-1,1);
                let  fechaFinA= new Date(fecha.getFullYear(),index,0);
        
                let fechaIncioPA= new Date((fecha.getFullYear()-1),index-1,1);
                let fechaFinPA= new Date((fecha.getFullYear()-1),index,0);

                dataAA = await VisitasDB.find({IDEmpresa:eid,
                    $and: [
                        {Fecha: {$gte: fechaIncioA}},
                        {Fecha: {$lte:fechaFinA}}
                      ]
                });
                dataAP = await VisitasDB.find({IDEmpresa:eid,
                    $and: [
                        {Fecha: {$gte: fechaIncioPA}},
                        {Fecha: {$lte:fechaFinPA}}
                      ]
                });
                if(tiempo ==='M'){
                    datA.push(dataAA.length);
                    datP.push(dataAP.length);
                }else{
                    if(datA.length===0){
                        datA.push(dataAA.length);
                        datP.push(dataAP.length);
                    }else{
                        datA.push(datA[datA.length-1]+dataAA.length);
                        datP.push(datP[datP.length-1]+dataAP.length);
                    }
                   
                }
                
                
            }
            grafica2 =[{datA,datP,Anio1:fecha.getFullYear(),Anio2:fecha.getFullYear()-1}];  
           
        return res.status(200).json({
            ok:true,
            label:label,
            periodo:periodo,
            Grafica1:grafica1,
            Grafica2:grafica2,
            total: todasvisitas.length
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

const  getasyn = async(eid,fechaIncio,FechaFin,idclientes,idproveedores) =>{
    
        const datos = await VisitasDB.find({'IDEmpresa':eid,IDEmpresaVista:{$in:idclientes},Fecha:{$gte: fechaIncio, $lt: FechaFin}}).populate({path:'IDEmpresaVista'});
        const datosp = await VisitasDB.find({'IDEmpresa':eid,IDEmpresaVista:{$in:idproveedores},Fecha:{$gte: fechaIncio, $lt: FechaFin}}).populate({path:'IDEmpresaVista'});
        const datosG  =  await VisitasDB.find({IDEmpresa:eid, Fecha:{$gte: fechaIncio, $lt: FechaFin}});
    
    return {dataCliente:datos.length,dataProveedor:datosp.length,dataOtras:datosG.length-(datos.length+datosp.length)};
}

module.exports = {
    getAll,
    addrelacion,
    addvisita
}