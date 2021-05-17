const moment = require('moment');
moment.locale('es');
const calificacionesDB = require('../models/calificaiones');
const PreguntaDB = require('../models/preguntas');
const  generatePasswordRand = (length,type)=> {
    switch(type){
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    var pass = "";
    for (i=0; i < length; i++){
        if(type == 'rand'){
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        }else{
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        }
    }
    return pass;
}
 const separar = async (array)=>{
       let datos = [];
       array.forEach(element => {
           datos.push(element.IDEmpresaB[0].id);
       });
       return datos;
 }
const addcategoria =  async (array)=>{
    let detalle_array = new Array();
    
    let Acposibles =0, Acobtenidos =0;

    array.forEach((element)=>{
        let posibles=0, obtenidos=0;
        
        if( isNaN(element.PorTotal)){
            posibles=0;
        }else{
            posibles=parseInt(element.PorTotal);
        }
       
        if(element.Forma!=='Numero' && element.Forma!=='AB'){
            
            if(element.Respuesta_usuario === 'NA' ||  element.Respuesta_usuario === 'NS'){
                posibles=0;
                obtenidos=0;
            }else if(element.Condicion === element.Respuesta_usuario){
                obtenidos=posibles;
            }
        }
        if(element.Forma==='Numero' && element.Forma!=='AB'){
            obtenidos=posibles;
        }
        Acposibles+=posibles;
         Acobtenidos+=obtenidos;
         let calif
         if(obtenidos===0 || posibles===0){
            calif = 0
        }else{
            calif = Math.round(((obtenidos/posibles)*10), -2);
        }
        
        detalle_array.push({Pregunta:element._id,Respuesta:element.Respuesta_usuario,PuntosObtenidos:obtenidos,PuntosPosibles:posibles,calificacion:calif});
    });
    let calificacion =0;
    if(Acposibles===0 || Acobtenidos===0){
        calificacion = 0
    }else{
         calificacion = Math.round(((Acobtenidos/Acposibles)*10), -2);
    }
   
    
    return {detalle_array,calificacion};
}

const mesesdias = async (tiempo)=>{
    var f = new Date();
    array_fechas = [];
    if(tiempo === 'M'){
        
        let  dia = f.setDate( f.getDate() - 32 );
        for(let i=0;i<=30;i++){
            let fec=new Date(dia);
            dia = f.setDate(fec.getDate()+1);
            array_fechas.push(new Date(dia).toISOString());
        }
        return array_fechas;
        
    }
    if(tiempo === 'MA' || tiempo === 'A' || tiempo=== 'AC'){
        
        for(let i = 1; i<=f.getMonth()+1;i++){
          
            const fecha = new Date(f.getFullYear(),i-1).toISOString()
            array_fechas.push(fecha);
        }
        const ultimodato = array_fechas[array_fechas.length-1];
        const fech= new Date(ultimodato);
        array_fechas[array_fechas.length-1] = new Date(fech.getFullYear()+'-'+(fech.getMonth()+1)+'-'+f.getDate()).toISOString()
    }
    return array_fechas;
}
const mesesdiasPasados = async (tiempo)=>{
    var f = new Date();
    array_fechas = [];
    if(tiempo === 'M'){
        
        let  dia = f.setDate(f.getDate() - 32 );
        for(let i=0;i<=30;i++){
            let fec=new Date(dia);
            dia = f.setDate(fec.getDate()+1);
            const fecN = new Date(dia);
            const defF= (fecN.getFullYear()-1)+'-'+(fecN.getMonth()+1)+'-'+fecN.getDate();
            array_fechas.push(new Date(defF).toISOString());
        }
        return array_fechas;
        
    }
    if(tiempo === 'MA' || tiempo === 'A' || tiempo=== 'AC'){
        
        for(let i = 1; i<=f.getMonth()+1;i++){
            const fecha = new Date(f.getFullYear()-1,i-1).toISOString()
            array_fechas.push(fecha);
        }
        const ultimodato = array_fechas[array_fechas.length-1];
        const fech= new Date(ultimodato);
        array_fechas[array_fechas.length-1] = new Date(fech.getFullYear()+'-'+(fech.getMonth()+1)+'-'+f.getDate()).toISOString()
    }
    return array_fechas;
}
const sumaFecha = async(d, fecha)=>
{
 var Fecha = new Date();
 var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
 var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
 var aFecha = sFecha.split(sep);
 var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
 fecha= new Date(fecha);
 fecha.setDate(fecha.getDate()+parseInt(d));
 var anno=fecha.getFullYear();
 var mes= fecha.getMonth()+1;
 var dia= fecha.getDate();
 mes = (mes < 10) ? ("0" + mes) : mes;
 dia = (dia < 10) ? ("0" + dia) : dia;
 var fechaFinal = dia+sep+mes+sep+anno;
 return (fechaFinal);
 }
 const dameNombreMes = async(mes)=>{
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[mes];
}
const CovertFechaISotodate= async (array,tiempo)=>{
    let newArry=[];
    array.forEach(item=>{
        const date=moment(item);
        if(tiempo === 'MA' || tiempo === 'A' || tiempo === 'AC'){
            newArry.push(date.utc().format('MMMM'));
        }else{
            newArry.push(date.utc().format('MMMM Do'));
        }
        
    });
    return newArry;
}
const dataCalificacionesGenMes = async(fechaInicio,FechaFin,eid,Tipo)=>{
    fechaInicio = new Date(fechaInicio);
    FechaFin = new Date(FechaFin);
    const calificiacionesRecibidasActuales = await calificacionesDB.find({
        IDEmpresaReceptor: eid,
        Emitidopara:Tipo,
        $expr: {
        $and:  [ // indica que cada comparación entre elementos del array se debe satisfacer
            { $gte : [ { $year:   '$FechaRealizada' }, { $year: fechaInicio } ] },  // devuelve true si se cumple la igualdad de loss elementos
            { $gte : [ { $month:   '$FechaRealizada' }, { $month: fechaInicio } ] },
            { $gte : [ { $dayOfMonth: '$FechaRealizada' }, { $dayOfMonth: fechaInicio } ] } ,
            { $lte : [ { $year:   '$FechaRealizada' }, { $year: FechaFin } ] },  // devuelve true si se cumple la igualdad de loss elementos
            { $lte : [ { $month:   '$FechaRealizada' }, { $month: FechaFin } ] },
            { $lte : [ { $dayOfMonth: '$FechaRealizada' }, { $dayOfMonth: FechaFin } ] }
          ],
          
        }
    })
    .populate({ path: 'Detalle.Cumplimiento.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Calidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Sanidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'DetalleS.ocioambiental.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Recomendacion.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Oferta.Pregunta', model: 'pregunta' });
    let promediocumplimiento=0,promediocalidad=0,promediosocioambiental=0,promediosanidad=0,promediooferta=0,proemdioGeneral=0;
    if(calificiacionesRecibidasActuales.length>0){
        let sumaCumpliemiento=0,sumaCalidad=0,sumaSocioambiental=0,sumaSanidad=0,sumaOferta=0;
        for(let item of calificiacionesRecibidasActuales){
        const itma = item.Detalle; 
        sumaCumpliemiento+= itma.CalificacionCumplimiento;
        sumaCalidad+= itma.CalificacionCalidad;
        sumaSocioambiental+= itma.CalificacionSocioambiental;
        sumaSanidad+= itma.CalificacionSanidad;
        sumaOferta+= itma.CalificacionOferta;
        
        } 
         promediocumplimiento = sumaCumpliemiento/calificiacionesRecibidasActuales.length;
         promediocalidad = sumaCalidad/calificiacionesRecibidasActuales.length;
         promediosocioambiental =sumaSocioambiental/calificiacionesRecibidasActuales.length;
         promediosanidad = sumaSanidad/calificiacionesRecibidasActuales.length;
         promediooferta = sumaOferta/calificiacionesRecibidasActuales.length
        let entre = 4;
        if(Tipo==='proveedor'){
            entre = 5;
        }
         proemdioGeneral = (promediocumplimiento+promediocalidad+promediosocioambiental+promediosanidad+promediooferta)/entre;

    }
    const data ={
        Numero:calificiacionesRecibidasActuales.length,
        data:calificiacionesRecibidasActuales,
        proemdioGeneral,
        promediocumplimiento,
        promediocalidad,
        promediosanidad,
        promediosocioambiental,
        promediooferta

    };
    return data
}
const dataCalificacionesGenMesGiro = async(fechaInicio,FechaFin,eid,Tipo,Giro)=>{
    fechaInicio = new Date(fechaInicio);
    FechaFin = new Date(FechaFin);
    const calificiacionesRecibidasActuales = await calificacionesDB.find({
        IDEmpresaReceptor: eid,
        Emitidopara:Tipo,
        'IDGiroReceptor.subGiro':Giro,
        $expr: {
        $and:  [ // indica que cada comparación entre elementos del array se debe satisfacer
            { $gte : [ { $year:   '$FechaRealizada' }, { $year: fechaInicio } ] },  // devuelve true si se cumple la igualdad de loss elementos
            { $gte : [ { $month:   '$FechaRealizada' }, { $month: fechaInicio } ] },
            { $gte : [ { $dayOfMonth: '$FechaRealizada' }, { $dayOfMonth: fechaInicio } ] } ,
            { $lte : [ { $year:   '$FechaRealizada' }, { $year: FechaFin } ] },  // devuelve true si se cumple la igualdad de loss elementos
            { $lte : [ { $month:   '$FechaRealizada' }, { $month: FechaFin } ] },
            { $lte : [ { $dayOfMonth: '$FechaRealizada' }, { $dayOfMonth: FechaFin } ] }
          ],
          
        }
    })
    .populate({ path: 'Detalle.Cumplimiento.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Calidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Sanidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'DetalleS.ocioambiental.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Recomendacion.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Oferta.Pregunta', model: 'pregunta' });
    let promediocumplimiento=0,promediocalidad=0,promediosocioambiental=0,promediosanidad=0,promediooferta=0,proemdioGeneral=0;
    if(calificiacionesRecibidasActuales.length>0){
        let sumaCumpliemiento=0,sumaCalidad=0,sumaSocioambiental=0,sumaSanidad=0,sumaOferta=0;
        for(let item of calificiacionesRecibidasActuales){
        const itma = item.Detalle; 
        sumaCumpliemiento+= itma.CalificacionCumplimiento;
        sumaCalidad+= itma.CalificacionCalidad;
        sumaSocioambiental+= itma.CalificacionSocioambiental;
        sumaSanidad+= itma.CalificacionSanidad;
        sumaOferta+= itma.CalificacionOferta;
        
        } 
         promediocumplimiento = sumaCumpliemiento/calificiacionesRecibidasActuales.length;
         promediocalidad = sumaCalidad/calificiacionesRecibidasActuales.length;
         promediosocioambiental =sumaSocioambiental/calificiacionesRecibidasActuales.length;
         promediosanidad = sumaSanidad/calificiacionesRecibidasActuales.length;
         promediooferta = sumaOferta/calificiacionesRecibidasActuales.length
        let entre = 4;
        if(Tipo==='proveedor'){
            entre = 5;
        }
         proemdioGeneral = (promediocumplimiento+promediocalidad+promediosocioambiental+promediosanidad+promediooferta)/entre;

    }
    const data ={
        Numero:calificiacionesRecibidasActuales.length,
        data:calificiacionesRecibidasActuales,
        proemdioGeneral,
        promediocumplimiento,
        promediocalidad,
        promediosanidad,
        promediosocioambiental,
        promediooferta

    };
    return data
}
const dataCalificacionesGen = async(fechaInicio,fechaFin,eid,Tipo)=>{
    
    fechaInicio = moment(fechaInicio).format("YYYY-MM-DDT00:00:00.000") + "Z";
    fechaFin = moment(fechaFin).format("YYYY-MM-DDT00:00:00.000") + "Z";
    const calificiacionesRecibidasActuales = await calificacionesDB.find({
        IDEmpresaReceptor: eid,
        Emitidopara:Tipo,
        $and:  [ // indica que cada comparación entre elementos del array se debe satisfacer
            { FechaRealizada:{$gte: fechaInicio }},  // devuelve true si se cumple la igualdad de loss elementos
            { FechaRealizada:{$lte: fechaFin}},
          ],

    })
    .populate({ path: 'Detalle.Cumplimiento.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Calidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Sanidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'DetalleS.ocioambiental.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Recomendacion.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Oferta.Pregunta', model: 'pregunta' });
    let promediocumplimiento=0,promediocalidad=0,promediosocioambiental=0,promediosanidad=0,promediooferta=0,proemdioGeneral=0;
    if(calificiacionesRecibidasActuales.length>0){
        let sumaCumpliemiento=0,sumaCalidad=0,sumaSocioambiental=0,sumaSanidad=0,sumaOferta=0;
        for(let item of calificiacionesRecibidasActuales){
        const itma = item.Detalle; 
        sumaCumpliemiento+= itma.CalificacionCumplimiento;
        sumaCalidad+= itma.CalificacionCalidad;
        sumaSocioambiental+= itma.CalificacionSocioambiental;
        sumaSanidad+= itma.CalificacionSanidad;
        sumaOferta+= itma.CalificacionOferta;
        
        } 
         promediocumplimiento = sumaCumpliemiento/calificiacionesRecibidasActuales.length;
         promediocalidad = sumaCalidad/calificiacionesRecibidasActuales.length;
         promediosocioambiental =sumaSocioambiental/calificiacionesRecibidasActuales.length;
         promediosanidad = sumaSanidad/calificiacionesRecibidasActuales.length;
         promediooferta = sumaOferta/calificiacionesRecibidasActuales.length
        let entre = 4;
        if(Tipo==='proveedor'){
            entre = 5;
        }
         proemdioGeneral = (promediocumplimiento+promediocalidad+promediosocioambiental+promediosanidad+promediooferta)/entre;

    }
    const data ={
        Numero:calificiacionesRecibidasActuales.length,
        data:calificiacionesRecibidasActuales,
        proemdioGeneral,
        promediocumplimiento,
        promediocalidad,
        promediosanidad,
        promediosocioambiental,
        promediooferta

    };
    return data
}
const dataCalificacionesGenGiro = async(fechaInicio,fechaFin,eid,Tipo,Giro)=>{
    
    fechaInicio = moment(fechaInicio).format("YYYY-MM-DDT00:00:00.000") + "Z";
    fechaFin = moment(fechaFin).format("YYYY-MM-DDT00:00:00.000") + "Z";
    const calificiacionesRecibidasActuales = await calificacionesDB.find({
        IDEmpresaReceptor: eid,
        Emitidopara:Tipo,
        'IDGiroReceptor.subGiro':Giro,
        $and:  [ // indica que cada comparación entre elementos del array se debe satisfacer
            { FechaRealizada:{$gte: fechaInicio }},  // devuelve true si se cumple la igualdad de loss elementos
            { FechaRealizada:{$lte: fechaFin}},
          ],

    })
    .populate({ path: 'Detalle.Cumplimiento.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Calidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Sanidad.Pregunta', model: 'pregunta' })
    .populate({ path: 'DetalleS.ocioambiental.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Recomendacion.Pregunta', model: 'pregunta' })
    .populate({ path: 'Detalle.Oferta.Pregunta', model: 'pregunta' });
    let promediocumplimiento=0,promediocalidad=0,promediosocioambiental=0,promediosanidad=0,promediooferta=0,proemdioGeneral=0;
    if(calificiacionesRecibidasActuales.length>0){
        let sumaCumpliemiento=0,sumaCalidad=0,sumaSocioambiental=0,sumaSanidad=0,sumaOferta=0;
        for(let item of calificiacionesRecibidasActuales){
        const itma = item.Detalle; 
        sumaCumpliemiento+= itma.CalificacionCumplimiento;
        sumaCalidad+= itma.CalificacionCalidad;
        sumaSocioambiental+= itma.CalificacionSocioambiental;
        sumaSanidad+= itma.CalificacionSanidad;
        sumaOferta+= itma.CalificacionOferta;
        
        } 
         promediocumplimiento = sumaCumpliemiento/calificiacionesRecibidasActuales.length;
         promediocalidad = sumaCalidad/calificiacionesRecibidasActuales.length;
         promediosocioambiental =sumaSocioambiental/calificiacionesRecibidasActuales.length;
         promediosanidad = sumaSanidad/calificiacionesRecibidasActuales.length;
         promediooferta = sumaOferta/calificiacionesRecibidasActuales.length
        let entre = 4;
        if(Tipo==='proveedor'){
            entre = 5;
        }
         proemdioGeneral = (promediocumplimiento+promediocalidad+promediosocioambiental+promediosanidad+promediooferta)/entre;

    }
    const data ={
        Numero:calificiacionesRecibidasActuales.length,
        data:calificiacionesRecibidasActuales,
        proemdioGeneral,
        promediocumplimiento,
        promediocalidad,
        promediosanidad,
        promediosocioambiental,
        promediooferta

    };
    return data
}

// funcion para saber cuantas veces se constesto esa pregunta en una fecha determinada

const dataCalificacionesGenPregunta = async(fechaInicio,fechaFin,eid,Tipo,giro,Pregunta,Categoria)=>{
    
    fechaInicio = moment(fechaInicio).format("YYYY-MM-DDT00:00:00.000") + "Z";
    fechaFin = moment(fechaFin).format("YYYY-MM-DDT00:00:00.000") + "Z";
    const cade = "Detalle."+Categoria+".Pregunta";
    const cade2 = "Detalle."+Categoria;
    let  query = {};
    query={
        IDEmpresaReceptor:eid,
        Emitidopara:Tipo,
        'IDGiroReceptor.subGiro':giro,
       
        $and:[
        { FechaRealizada:{$gte: fechaInicio }},  // devuelve true si se cumple la igualdad de loss elementos
            { FechaRealizada:{$lte: fechaFin}},
        ]};

  
    query[cade] = Pregunta;
    
   let options={};
   options[cade]=1;

    
   
    const calificiacionesRecibidasActuales = await calificacionesDB.find(query)
    .populate({ path: cade, model: 'pregunta' })
    let promediocumplimiento=0,promediocalidad=0,promediosocioambiental=0,promediosanidad=0,promediooferta=0,proemdioGeneral=0;
    if(calificiacionesRecibidasActuales.length>0){
        let sumaCumpliemiento=0,sumaCalidad=0,sumaSocioambiental=0,sumaSanidad=0,sumaOferta=0;
        for(let item of calificiacionesRecibidasActuales){
        const itma = item.Detalle; 
        sumaCumpliemiento+= itma.CalificacionCumplimiento;
        sumaCalidad+= itma.CalificacionCalidad;
        sumaSocioambiental+= itma.CalificacionSocioambiental;
        sumaSanidad+= itma.CalificacionSanidad;
        sumaOferta+= itma.CalificacionOferta;
        
        } 
         promediocumplimiento = sumaCumpliemiento/calificiacionesRecibidasActuales.length;
         promediocalidad = sumaCalidad/calificiacionesRecibidasActuales.length;
         promediosocioambiental =sumaSocioambiental/calificiacionesRecibidasActuales.length;
         promediosanidad = sumaSanidad/calificiacionesRecibidasActuales.length;
         promediooferta = sumaOferta/calificiacionesRecibidasActuales.length
        let entre = 4;
        if(Tipo==='proveedor'){
            entre = 5;
        }
         proemdioGeneral = (promediocumplimiento+promediocalidad+promediosocioambiental+promediosanidad+promediooferta)/entre;

    }
    
    
    const data ={
        Numero:calificiacionesRecibidasActuales.length,
        data:calificiacionesRecibidasActuales,
        proemdioGeneral,
       

    };
    return data
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  

const GetnumCalificacionesFechaArray = async(eid,array_fechas,tiempo,Tipo)=>{
    let  dataActual =[];
    let promedioCalidad =[],promedioCumplimieto =[],promedioOferta=[],promedioSocioambiental=[],promedioSanidad=[],promedioGenral=[];
    let tmppromedioCalidad =[],tmppromedioCumplimieto =[],tmppromedioOferta=[],tmppromedioSocioambiental=[],tmppromedioSanidad=[],tmppromedioGenral=[];
    let query;
   
    for (const fecha of array_fechas ){
        
        const fecha_set = new Date(fecha);
       
        if(tiempo === 'M'){
            query = {
               IDEmpresaReceptor: eid, Emitidopara:Tipo,
                $expr: { // la siguiente es una expresión de agregación
                  $and: [ // indica que cada comparación entre elementos del array se debe satisfacer
                    { $eq: [ { $year:   '$FechaRealizada' }, { $year: fecha_set } ] },  // devuelve true si se cumple la igualdad de loss elementos
                    { $eq: [ { $month:   '$FechaRealizada' }, { $month: fecha_set } ] },
                    { $eq: [ { $dayOfMonth: '$FechaRealizada' }, { $dayOfMonth: fecha_set } ] } 
                  ]
                }
              }
       }
       if(tiempo === 'MA' || tiempo === 'A' || tiempo === 'AC'){
        query = {
            IDEmpresaReceptor: eid, Emitidopara:Tipo,
             $expr: { // la siguiente es una expresión de agregación
               $and: [ // indica que cada comparación entre elementos del array se debe satisfacer
                 { $eq: [ { $year:   '$FechaRealizada' }, { $year: fecha_set } ] },  // devuelve true si se cumple la igualdad de loss elementos
                 { $eq: [ { $month:   '$FechaRealizada' }, { $month: fecha_set } ] },
                
               ]
             }
           }
       }
       const calificiacionesActuales = await calificacionesDB.find(query);
       //para obtener el promedio de cada una de las categorias tengo que hacer un ciclo para obtener la media
       let promediocumplimiento=0.0,promediocalidad=0.0,promediosocioambiental=0.0,promediosanidad=0.0,promediooferta=0.0,proemdioGeneral=0.0;
        if(calificiacionesActuales.length>0){
             let sumaCumpliemiento=0.0,sumaCalidad=0.0,sumaSocioambiental=0.0,sumaSanidad=0.0,sumaOferta=0.0;
             for(let item of calificiacionesActuales){
                const itma = item.Detalle; 
                sumaCumpliemiento+= itma.CalificacionCumplimiento;
                sumaCalidad+= itma.CalificacionCalidad;
                sumaSocioambiental+= itma.CalificacionSocioambiental;
                sumaSanidad+= itma.CalificacionSanidad;
                sumaOferta+= itma.CalificacionOferta;
                
                } 
                 promediocumplimiento = sumaCumpliemiento/calificiacionesActuales.length;
                 promediocalidad = sumaCalidad/calificiacionesActuales.length;
                 promediosocioambiental =sumaSocioambiental/calificiacionesActuales.length;
                 promediosanidad = sumaSanidad/calificiacionesActuales.length;
                 promediooferta = sumaOferta/calificiacionesActuales.length
                let entre = 4;
                if(Tipo==='proveedor'){
                    entre = 5;
                }
                 proemdioGeneral = (promediocumplimiento+promediocalidad+promediosocioambiental+promediosanidad+promediooferta)/entre;
        
        }
       if(tiempo === 'A' || tiempo === 'AC'){
             
           if(dataActual.length <= 0){
             dataActual.push(calificiacionesActuales.length);
             promedioCumplimieto.push(promediocumplimiento);
             promedioOferta.push(promediooferta);
             promedioSocioambiental.push(promediosocioambiental);
             promedioSanidad.push(promediosanidad);
             promedioGenral.push(proemdioGeneral)
             promedioCalidad.push(promediocalidad);
            tmppromedioCalidad.push({promedio:promediocumplimiento,num:calificiacionesActuales.length});
            tmppromedioCumplimieto.push({promedio:promediocalidad,num:calificiacionesActuales.length});
            tmppromedioOferta.push({promedio:promediooferta,num:calificiacionesActuales.length});
            tmppromedioSanidad.push({promedio:promediosanidad,num:calificiacionesActuales.length});
            tmppromedioSocioambiental.push({promedio:promediosocioambiental,num:calificiacionesActuales.length});
            tmppromedioGenral.push({promedio:promedioGenral,num:calificiacionesActuales.length});
           }else{
            
            tmppromedioCalidad.push({promedio:promediocumplimiento,num:calificiacionesActuales.length});
            tmppromedioCumplimieto.push({promedio:promediocalidad,num:calificiacionesActuales.length});
            tmppromedioOferta.push({promedio:promediooferta,num:calificiacionesActuales.length});
            tmppromedioSanidad.push({promedio:promediosanidad,num:calificiacionesActuales.length});
            tmppromedioSocioambiental.push({promedio:promediosocioambiental,num:calificiacionesActuales.length});
            tmppromedioGenral.push({promedio:proemdioGeneral,num:calificiacionesActuales.length});
           
            promedioCumplimieto.push( await sumarCumulado(promedioCumplimieto,promediocumplimiento,calificiacionesActuales.length,tmppromedioCumplimieto));
            promedioOferta.push( await sumarCumulado(promedioOferta,promediooferta,calificiacionesActuales.length,tmppromedioOferta));
            promedioSocioambiental.push(await sumarCumulado(promedioSocioambiental,promediosocioambiental,calificiacionesActuales.length,tmppromedioSocioambiental));
            promedioSanidad.push(await sumarCumulado(promedioSanidad,promediosanidad,calificiacionesActuales.length,tmppromedioSanidad));
            promedioGenral.push(await sumarCumulado(promedioGenral,proemdioGeneral,calificiacionesActuales.length,tmppromedioGenral));
            promedioCalidad.push(await sumarCumulado(promedioCalidad,promediocalidad,calificiacionesActuales.length,tmppromedioCalidad));
            dataActual.push(dataActual[dataActual.length-1] + calificiacionesActuales.length);
           }
          
            
       }else{
           promedioCumplimieto.push(promediocumplimiento);
           promedioOferta.push(promediooferta);
           promedioSocioambiental.push(promediosocioambiental);
           promedioSanidad.push(promediosanidad);
           promedioGenral.push(proemdioGeneral)
           promedioCalidad.push(promediocalidad);
            dataActual.push(calificiacionesActuales.length);
       }
      
       
    };
    
    return {dataActual,promedioCumplimieto,promedioOferta,promedioSocioambiental,promedioSanidad,promedioGenral,promedioCalidad};
}
const sumarCumulado = async (array,calificacion,numero,tmparray)=>{
   
    let num=0;
    let suma=0;
    let promedio =0;
    for(let item of tmparray){
        if(item.num>0){
            suma+= item.promedio;
            num++;
        }
    }
    
    if(suma >0){
        promedio = suma/num;
        return Math.round(promedio,-2);
    }
    return 0
    
}
const listaPreguntas = (array,categoria)=>{
    let lista = [];
    for (let item of array[categoria]){
       lista.push({IDPregunta:item._id,Pregunta:item.Pregunta.Pregunta,Forma:item.Pregunta.Forma});
    }
    return lista
}

const listaPreguntasD = async (array,categoria)=>{
   
    let lista = [];
    for (let item of array[categoria]){
        if(item!=null){
            const datos = await PreguntaDB.findById(item);
           lista.push({IDPregunta:datos._id,Pregunta:datos.Pregunta,Forma:datos.Forma});
        }   
       
    }
    return lista
}
module.exports = {
    generatePasswordRand,
    separar,
    addcategoria,
    mesesdias,
    sumaFecha,
    dameNombreMes,
    CovertFechaISotodate,
    mesesdiasPasados,
    dataCalificacionesGenMes,
    GetnumCalificacionesFechaArray,
    dataCalificacionesGen,
    sumarCumulado,
    dataCalificacionesGenMesGiro,
    dataCalificacionesGenGiro,
    listaPreguntas,
    dataCalificacionesGenPregunta,
    capitalize,
    listaPreguntasD
}