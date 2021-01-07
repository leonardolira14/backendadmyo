const calificacionesDB = require('../models/calificaiones');
const giroempresaDB  =require('../models/giroempresas');
const preguntasBD = require('../models/preguntas');
const { mesesdias } = require('../helpers/funciones');
const cuestionariosDB = require('../models/cuestionarios');


const getImagenEmpresa = async (req,res)=>{

    // paara obtner la imagen necesito el tiempo la empresa, tipo 
    const eid = req.IDEmpresa;
    const datos= req.body;
    let fechaInicio ;
    let fechaFin ;
    var f = new Date();
    let array_fechas = [];
    if(datos.Tiempo === 'MA'){
        // mes actual
        var f = new Date();
        fechaInicio = new Date('01-'+(f.getMonth()+1)+'-'+f.getFullYear());
        fechaFin = new Date(f.getFullYear(), f.getMonth() + 1, 0);
        fechaFin = new Date('31-'+(f.getMonth()+1)+'-'+f.getFullYear());
        array_fechas = await mesesdias(datos.Tiempo);
        console.log(array_fechas);
    }
    if(datos.Tiempo === 'M'){
        // ultimos 30 dias
        array_fechas = await mesesdias(datos.Tiempo);
        console.log(array_fechas);
    }
    if(datos.Tiempo === 'A'){
        // acumulado

    }

}
module.exports = {
    getImagenEmpresa
}