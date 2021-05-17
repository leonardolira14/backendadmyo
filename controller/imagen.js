const calificacionesDB = require('../models/calificaiones');
const giroempresaDB = require('../models/giroempresas');
const preguntasBD = require('../models/preguntas');
const cuestionariosDB = require('../models/cuestionarios');

const { 
    mesesdias, 
    dameNombreMes,
     CovertFechaISotodate, 
     mesesdiasPasados,
     dataCalificacionesGenMes,
     GetnumCalificacionesFechaArray,
     dataCalificacionesGen,
     dataCalificacionesGenMesGiro,
     dataCalificacionesGenGiro,
     listaPreguntas,dataCalificacionesGenPregunta,
     capitalize,listaPreguntasD
    } = require('../helpers/funciones');




const getImagenEmpresa = async (req, res) => {
    try {


        // paara obtner la imagen necesito el tiempo la empresa, tipo 
    const eid = req.IDEmpresa;
      // const eid ='5fe99768bf21c3342b3c05f8'
        const uid = req.uid;
        const fecha = req.params.fecha;
        const tipo = req.params.tipo;

        let fechaInicio;
        let fechaFin;
        var f = new Date();
        let array_fechas = [];
        let periodo;

        array_fechas = await mesesdias(fecha);
        
        array_fechas_pasados = await mesesdiasPasados(fecha);
        fechaInicio = new Date(array_fechas[0]);
        fechaFin = new Date(array_fechas[array_fechas.length - 1]);

       
        // obtengo las calificaciones que ha recibido en estas ultimas fechas actual
        let  calificiacionesRecibidasActuales,calificiacionesRecibidasPasadas ;
        if(fecha === 'M'){
            periodo = await dameNombreMes(fechaInicio.getMonth()) + "-" + fechaInicio.getUTCFullYear() + ' / ' + await dameNombreMes(fechaFin.getMonth()) + "-" + fechaFin.getUTCFullYear();
            calificiacionesRecibidasActuales = await dataCalificacionesGen( array_fechas[0],array_fechas[array_fechas.length - 1],eid,tipo);
            calificiacionesRecibidasPasadas = await dataCalificacionesGen( array_fechas_pasados[0],array_fechas_pasados[array_fechas_pasados.length - 1],eid,tipo);
        }else if(fecha === 'MA'){
            const f1 = new Date(f.getFullYear()+'-'+(f.getMonth()+1)+'-01').toISOString();
            const f2 = new Date(f.getFullYear()+'-'+(f.getMonth()+1)+'-'+f.getDate()).toISOString();
            const f1P = new Date((f.getFullYear()-1)+'-'+(f.getMonth()+1)+'-01').toISOString();
            const f2P = new Date((f.getFullYear()-1)+'-'+(f.getMonth()+1)+'-'+f.getDate()).toISOString();
            periodo = await dameNombreMes(fechaFin.getMonth()) + "-" + fechaFin.getUTCFullYear();
            calificiacionesRecibidasActuales = await dataCalificacionesGenMes( f1,f2,eid,tipo);
            calificiacionesRecibidasPasadas = await dataCalificacionesGenMes( f1P,f2P,eid,tipo);
        }else{
            periodo = await dameNombreMes(fechaInicio.getMonth()) + "-" + fechaInicio.getUTCFullYear() + ' / ' + await dameNombreMes(fechaFin.getMonth()) + "-" + fechaFin.getUTCFullYear();
            calificiacionesRecibidasActuales = await dataCalificacionesGenMes( array_fechas[0],array_fechas[array_fechas.length - 1],eid,tipo);
            calificiacionesRecibidasPasadas = await dataCalificacionesGenMes( array_fechas_pasados[0],array_fechas_pasados[array_fechas_pasados.length - 1],eid,tipo);
        }
       
        // primero lleno el data del grafico 1
       let  dataGenActual = await GetnumCalificacionesFechaArray(eid,array_fechas,fecha,tipo);
       let  dataGenPasado = await GetnumCalificacionesFechaArray(eid,array_fechas_pasados,fecha,tipo);

       /*
         para llenar el grafico de media general tengo que calcular la media general y las demas medias
       */

        // obtengo las calificaciones pasadas en el mismo periodo pero pasadas un año menos 
       
        
        const labelGraphicsActual = await CovertFechaISotodate(array_fechas,fecha);

        // console.log(calificiacionesRecibidas)
        return res.status(200).json({
            ok: true,
            periodo,
            numeroCalificaciones: calificiacionesRecibidasActuales.Numero,
            MediaGeneral:calificiacionesRecibidasActuales.proemdioGeneral,
            MediaCalidad:calificiacionesRecibidasActuales.promediocalidad,
            MediaCumplimiento:calificiacionesRecibidasActuales.promediocumplimiento,
            MediaSanidad:calificiacionesRecibidasActuales.promediosanidad,
            MediaSocioambiental:calificiacionesRecibidasActuales.promediosocioambiental,
            MediaOferta:calificiacionesRecibidasActuales.promediooferta,
            labelGraficos: labelGraphicsActual,
            dataGraphicNumeroEvolucion:{Periodo_Actual:f.getFullYear(),Periodo_Pasado:(f.getFullYear()-1),data_actual:dataGenActual.dataActual,data_pasado:dataGenPasado.dataActual},
            dataGraphicMediaEvolucionGeneral:{Periodo_Actual:f.getFullYear(),Periodo_Pasado:(f.getFullYear()-1),data_actual:dataGenActual.promedioGenral,data_pasado:dataGenPasado.promedioGenral},
            dataGraphicMediaEvolucionCaldiad:{Periodo_Actual:f.getFullYear(),Periodo_Pasado:(f.getFullYear()-1),data_actual:dataGenActual.promedioCalidad,data_pasado:dataGenPasado.promedioCalidad},
            dataGraphicMediaEvolucioncumplimiento:{Periodo_Actual:f.getFullYear(),Periodo_Pasado:(f.getFullYear()-1),data_actual:dataGenActual.promedioCumplimieto,data_pasado:dataGenPasado.promedioCumplimieto},
            dataGraphicMediaEvolucionSanidad:{Periodo_Actual:f.getFullYear(),Periodo_Pasado:(f.getFullYear()-1),data_actual:dataGenActual.promedioSanidad,data_pasado:dataGenPasado.promedioSanidad},
            dataGraphicMediaEvolucionSocioambiental:{Periodo_Actual:f.getFullYear(),Periodo_Pasado:(f.getFullYear()-1),data_actual:dataGenActual.promedioSocioambiental,data_pasado:dataGenPasado.promedioSocioambiental},
            dataGraphicMediaEvolucionOferta:{Periodo_Actual:f.getFullYear(),Periodo_Pasado:(f.getFullYear()-1),data_actual:dataGenActual.promedioOferta,data_pasado:dataGenPasado.promedioOferta},
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const DetalleImagen = async(req,res)=>{
    try {
       // const eid = req.IDEmpresa;
       const eid = '5fe99768bf21c3342b3c05f8' ;
       const fecha = req.params.fecha;
        const tipo = req.params.tipo;
        let giro;
        if(req.params.giro || req.params.giro!==undefined || req.params.giro!=='NA'){
            giro=req.params.giro
        }else{
            // si no traigo giro le doy el giro principal
            // si no tengo giro doy el giro que tenga calificaciones
           const giroP=await giroempresaDB.find({IDEmpresa:eid,Principal:true});
           giro=giroP[0].SubGiro;
        }
        let fechaInicio;
        let fechaFin;
        var f = new Date();
        let array_fechas = [];
        let periodo;

        array_fechas = await mesesdias(fecha);
        
        array_fechas_pasados = await mesesdiasPasados(fecha);
        fechaInicio = new Date(array_fechas[0]);
        fechaFin = new Date(array_fechas[array_fechas.length - 1]);
 
        // obtengo las calificaciones que ha recibido en estas ultimas fechas actual
        let  calificiacionesRecibidasActuales,calificiacionesRecibidasPasadas ;
        if(fecha === 'M'){
            periodo = await dameNombreMes(fechaInicio.getMonth()) + "-" + fechaInicio.getUTCFullYear() + ' / ' + await dameNombreMes(fechaFin.getMonth()) + "-" + fechaFin.getUTCFullYear();
            calificiacionesRecibidasActuales = await dataCalificacionesGenGiro( array_fechas[0],array_fechas[array_fechas.length - 1],eid,tipo,giro);
            calificiacionesRecibidasPasadas = await dataCalificacionesGenGiro( array_fechas_pasados[0],array_fechas_pasados[array_fechas_pasados.length - 1],eid,tipo,giro);
        }else if(fecha === 'MA'){
            const f1 = new Date(f.getFullYear()+'-'+(f.getMonth()+1)+'-01').toISOString();
            const f2 = new Date(f.getFullYear()+'-'+(f.getMonth()+1)+'-'+f.getDate()).toISOString();
            const f1P = new Date((f.getFullYear()-1)+'-'+(f.getMonth()+1)+'-01').toISOString();
            const f2P = new Date((f.getFullYear()-1)+'-'+(f.getMonth()+1)+'-'+f.getDate()).toISOString();
            periodo = await dameNombreMes(fechaFin.getMonth()) + "-" + fechaFin.getUTCFullYear();
            calificiacionesRecibidasActuales = await dataCalificacionesGenMesGiro( f1,f2,eid,tipo,giro);
            calificiacionesRecibidasPasadas = await dataCalificacionesGenMesGiro( f1P,f2P,eid,tipo,giro);
        }else{
            periodo = await dameNombreMes(fechaInicio.getMonth()) + "-" + fechaInicio.getUTCFullYear() + ' / ' + await dameNombreMes(fechaFin.getMonth()) + "-" + fechaFin.getUTCFullYear();
            calificiacionesRecibidasActuales = await dataCalificacionesGenMesGiro( array_fechas[0],array_fechas[array_fechas.length - 1],eid,tipo,giro);
            calificiacionesRecibidasPasadas = await dataCalificacionesGenMesGiro( array_fechas_pasados[0],array_fechas_pasados[array_fechas_pasados.length - 1],eid,tipo,giro);
        }
        // para obtener la lista de calificaciones necito el subgiro principal de la empresa y el tipo
        const preguntas = await cuestionariosDB.find({subGiro:giro,Tipo:capitalize(tipo)});

     
        // necesito la lista de las preguntas dependiento del giro principal
        const ListaPreguntas = preguntas[0];
        const listCalidad =await listaPreguntasD(preguntas[0],'Calidad')
        const listCumplimiento=await listaPreguntasD(preguntas[0],'Cumplimiento');
        const listSanidad=await listaPreguntasD(preguntas[0],'Sanidad');
        const listSociambiental=await listaPreguntasD(preguntas[0],'Socioambiental');
        const listOferta =await listaPreguntasD(preguntas[0],'Oferta');
       
       // para graficar tengo que recorren la listade las preguntas por categoria y saber cuantas veces se contesto esa pregunta
        // en la fecha
        const dat= await dataCalificacionesGenPregunta(array_fechas[0],array_fechas[array_fechas.length - 1],eid,tipo,giro,listCalidad[0].IDPregunta,'Calidad');
        
       

         // console.log(calificiacionesRecibidas)
         return res.status(200).json({
            ok: true,
            periodo,
            MediaGeneral:calificiacionesRecibidasActuales.proemdioGeneral,
            listCalidad,
            listCumplimiento,
            listSanidad,
            listSociambiental,
            listOferta
            
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getImagenEmpresa,
    DetalleImagen
}