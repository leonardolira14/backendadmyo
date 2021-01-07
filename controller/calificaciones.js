const calificacionesDB = require('../models/calificaiones');
const detalleDB = require('../models/detallecalificacion');
const cuestionariosDB = require('../models/cuestionarios');
const giroempresaDB  =require('../models/giroempresas');
const preguntasBD = require('../models/preguntas');
const {addcategoria} = require('../helpers/funciones');



const add = async(req,res)=>{
    try {
        const eid = req.IDEmpresa;
        const uid = req.uid;
        const datos = req.body;
        const cuestionarios  = datos.Cuestionario;
        // aqui meto el detalle
        // obtengo el giro principal de la empresa que califica
        const GiroPrincipalEmisor = await giroempresaDB.find({IDEmpresa:eid,Principal:true}).populate({path:'Giro'}).populate({path:'SubGiro'}).populate({path:'Rama'});
        
     
       

        
        //console.log(cuestionarios[0].Cumplimiento); 
        let detalles = new Array();
        detalles['Cumplimiento']= new Array();
        detalles['Socioambiental']= new Array();
        detalles['Calidad']= new Array();
        detalles['Sanidad']= new Array();
        detalles['Recomendacion']= new Array();
        detalles['Oferta'] = new Array();
       
        detalles['Cumplimiento'] = await addcategoria(cuestionarios[0].Cumplimiento);
        detalles['Calidad'] = await addcategoria(cuestionarios[0].Calidad);
        detalles['Socioambiental'] = await addcategoria(cuestionarios[0].Socioambiental);
        detalles['Sanidad'] = await addcategoria(cuestionarios[0].Sanidad);
        detalles['Recomendacion'] = await addcategoria(cuestionarios[0].Recomendacion);
        detalles['Oferta'] = await addcategoria(cuestionarios[0].Oferta);

       const newccalificacion = new calificacionesDB({
        Status:'Activa',
        IDUsuarioEmisor: uid,
        IDEmpresaEmisor:eid,
        IDGiroEmisor:{
            Giro:GiroPrincipalEmisor[0].Giro[0].id,
            subGiro:GiroPrincipalEmisor[0].SubGiro[0].id,
            Rama:GiroPrincipalEmisor[0].Rama[0].id
        },
        Detalle:{
            "Cumplimiento":detalles['Cumplimiento'],
            "Calidad":detalles['Calidad'],
            "Socioambiental":detalles['Socioambiental'],
            "Sanidad":detalles['Sanidad'],
            "Recomendacion":detalles['Recomendacion'],
            "Oferta":detalles['Oferta'],
        }
    });
        console.log(newccalificacion);
        const respuesta = await newccalificacion.save();

        return res.status(200).json({
            ok: true,
            dar: newccalificacion
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const getcalificacion = async(req,res)=>{
    try {
        //5fedbb9c2a259b42dc51806f
        const id=req.params.id;
        const cuestionario = await calificacionesDB.findById(id)
        .populate({path:'Detalle.Cumplimiento.Pregunta',model:'pregunta'})
        .populate({path:'Detalle.Calidad.Pregunta',model:'pregunta'})
        .populate({path:'Detalle.Sanidad.Pregunta',model:'pregunta'})
        .populate({path:'Detalle.Socioambiental.Pregunta',model:'pregunta'})
        .populate({path:'Detalle.Recomendacion.Pregunta',model:'pregunta'})
        .populate({path:'Detalle.Oferta.Pregunta',model:'pregunta'})
        return res.status(200).json({
            ok: true,
            cuestionario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const getCuestionario = async(req,res)=>{
    try {
       
        const datos = req.params;
        let oferta=0;
        if(datos.Tipo === "Proveedor") {
            oferta = 1;
        }

        const cuestionario = await cuestionariosDB.find({subGiro:datos.subGiro,"Tipo":datos.Tipo},{"Oferta":oferta})
        .populate({path:'Cumplimiento',model:'pregunta'})
        .populate({path:'Calidad',model:'pregunta'})
        .populate('Sanidad',preguntasBD)
        .populate('Socioambiental',preguntasBD)
        .populate('Recomendacion',preguntasBD)
        .populate('Oferta',preguntasBD)
        
        
        return res.status(200).json({
            ok: false,
            cuestionario
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
    add,
    getCuestionario,
    getcalificacion
}