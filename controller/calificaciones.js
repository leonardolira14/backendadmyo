const calificacionesDB = require('../models/calificaiones');
const detalleDB = require('../models/detallecalificacion');
const cuestionariosDB = require('../models/cuestionarios');
const giroempresaDB = require('../models/giroempresas');
const preguntasBD = require('../models/preguntas');
const { addcategoria } = require('../helpers/funciones');
const { getAllEmpresa } = require('../controller/empresa');
const gitosDB = require('../models/giros');
const giros = require('../models/giros');
const subgiroDB = require('../models/subgiros');
const ramaDB = require('../models/rama');
const UsuariosBD = require('../models/usuarios');
const { preUsuario } = require('../controller/usuarios');
const RelacionEmpresaDB = require('../models/relacion_empresa');
const { notifiEnCalif,nofiRecCalif,notifiEnMasterCalif,notifiMasterRecCalif} = require('../helpers/mail');
const EmpresaDB = require('../models/empresa');
const add = async (req, res) => {
    try {
        const IDEmpresaEmisor = req.IDEmpresa;
        const IDUsuarioEmisor = req.uid;
        const datos = req.body;
        const datosReceptor = datos.Receptor;
        const cuestionarios = datos.cuestionarios;
        const DatosEmpresaEmisora = await EmpresaDB.find({_id:IDEmpresaEmisor});

        let DatosEmpresaReceptora = [];
        if(datosReceptor.IDReceptor){
             DatosEmpresaReceptora= await EmpresaDB.find({_id:datosReceptor.IDReceptor});
        }else{
            // consulto la empresa por RFC 
            DatosEmpresaReceptora = await EmpresaDB.find({Rfc:datosReceptor.RFC});
            if(DatosEmpresaReceptora<=0){
                let datos=[];
                datos.RazonSocial =datosReceptor.RazonSocial;
                datos.Rfc=datosReceptor.RFC;
                const empresa = new EmpresaDB(datos);
                await empresa.save();
                DatosEmpresaReceptora = await EmpresaDB.find({Rfc:datosReceptor.RFC});
                // ahora guardo su giro que le han a sigando
                let datosGiros = [];
                datosGiros.Giro = datosReceptor.Giro;
                datosGiros.SubGiro = datosReceptor.SubGiro;
                datosGiros.Rama = datosReceptor.Rama;
                datosGiros.IDEmpresa = DatosEmpresaReceptora._id;
                const giroempresa = new giroempresaDB();
                await giroempresa.save();
                
            }
        }

       
        const DatosUsuarioEmisor = await UsuariosBD.find({_id:IDUsuarioEmisor});
        
        // aqui meto el detalle
        // obtengo el giro principal de la empresa que califica
        let Giro, subGiro, Rama;
        const GiroPrincipalEmisor = await giroempresaDB.find({ IDEmpresa: IDEmpresaEmisor, Principal: true }).populate({ path: 'Giro' }).populate({ path: 'SubGiro' }).populate({ path: 'Rama' });
        if (GiroPrincipalEmisor.length > 0) {
            Giro = GiroPrincipalEmisor[0].Giro[0].id,
                subGiro = GiroPrincipalEmisor[0].SubGiro[0].id,
                Rama = GiroPrincipalEmisor[0].Rama[0].id
        } else {
            Giro = '5fe38a01c68ce8e74400d01d',
                subGiro = [],
                Rama = []
        }




        //console.log(cuestionarios[0].Cumplimiento); 
        let detalles = [];
        detalles['Cumplimiento'] = [];
        detalles['Socioambiental'] = [];
        detalles['Calidad'] = [];
        detalles['Sanidad'] = [];
        detalles['Recomendacion'] = [];
        detalles['Oferta'] = [];

        detalles['Cumplimiento'] = await addcategoria(cuestionarios['cumplimiento']);
       
        detalles['Calidad'] = await addcategoria(cuestionarios['calidad']);
        detalles['Socioambiental'] = await addcategoria(cuestionarios['socioambiental']);
        detalles['Sanidad'] = await addcategoria(cuestionarios['sanidad']);
        detalles['Recomendacion'] = await addcategoria(cuestionarios['recomendacion']);
        detalles['Oferta'] = await addcategoria(cuestionarios['oferta']);
        
       
        //verifico si el usuario receptor ya esta registrado si no lo registo

        let DatosUsuarireseptor = await UsuariosBD.findOne({ Correo: datosReceptor.Correo });

        if (DatosUsuarireseptor === null) {
            DatosUsuarireseptor = await preUsuario(datosReceptor.IDReceptor, datosReceptor.Correo);
            console.log(DatosUsuarireseptor);
            if (!DatosUsuarireseptor.ok) {
                return res.status(500).json({
                    ok: false,
                    msg: DatosUsuarireseptor.msg
                });
            }
        } else if (DatosUsuarireseptor.IDEmpresa !== datosReceptor.IDReceptor) {
            return res.status(404).json({
                ok: false,
                code: 1992,
                msg: 'Correo Electronico pertenece a otra empresa'
            });
        }


        const newccalificacion = new calificacionesDB({
            Status: 'Activa',
            IDUsuarioEmisor,
            IDEmpresaEmisor,
            Emitidopara:datosReceptor.Tipo,
            IDGiroEmisor: {
                Giro: Giro,
                subGiro: subGiro,
                Rama: Rama
            },
            FechaRealizada: new Date(datosReceptor.Fecha),
            IDEmpresaReceptor: datosReceptor.IDReceptor,
            IDUsuarioReceptor: DatosUsuarireseptor._id,
            IDGiroReceptor: {
                Giro: datosReceptor.Giro,
                subGiro: datosReceptor.SubGiro,
                Rama: datosReceptor.Rama
            },
            Detalle: {
                'CalificacionCumplimiento':detalles['Cumplimiento'].calificacion,
                'CalificacionCalidad':detalles['Calidad'].calificacion,
                'CalificacionSocioambiental':detalles['Socioambiental'].calificacion,
                'CalificacionSanidad':detalles['Sanidad'].calificacion,
                'CalificacionOferta':detalles['Oferta'].calificacion,

                "Cumplimiento": detalles['Cumplimiento'].detalle_array,
                "Calidad": detalles['Calidad'].detalle_array,
                "Socioambiental": detalles['Socioambiental'].detalle_array,
                "Sanidad": detalles['Sanidad'].detalle_array,
                "Recomendacion": detalles['Recomendacion'].detalle_array,
                "Oferta": detalles['Oferta'].detalle_array,
            }
        });
        
        const respuesta = await newccalificacion.save();
        // ahora veo si existe una relacion cliente proveedor si no existe la agrego
        // cuando el emisor califica en tipo como cliente el emisor es proveedor del receptor
        // cuando el emisor califica en tiepo como proevoeedor el emisor es cliente del receotor y se tiene que giuardar ambas relaciones
       const relacion = await RelacionEmpresaDB.find({IDEmpresa:IDEmpresaEmisor,IDEmpresaB:datosReceptor.IDReceptor,Tipo:datosReceptor.Tipo});
        
       if(relacion.length<=0){
           let datos =[];
            datos.IDEmpresa = IDEmpresaEmisor;
            datos.IDEmpresaB =  datosReceptor.IDReceptor
            datos.Tipo =datosReceptor.Tipo;
            const addR1 = new RelacionEmpresaDB(datos);
            addR1.save();

            datos.IDEmpresa = datosReceptor.IDReceptor ;
            datos.IDEmpresaB =  IDEmpresaEmisor;
            if(datosReceptor.Tipo=== 'cliente'){
                datos.Tipo = 'proveedor';   
            }else{
                datos.Tipo = 'cliente';   
            }
            const addR2 = new RelacionEmpresaDB(datos);
            addR2.save();
       }
       
       // en este momento mando los correos avisando que se ha realizado una calificacion

       // aqui aviso al receptor que lo han calificado tengo que avisar al usuario master y el usuario que lo calificaron
       await notifiEnCalif(DatosUsuarioEmisor[0]['Correo'],DatosEmpresaEmisora[0]['RazonSocial'],DatosEmpresaReceptora[0]['RazonSocial']);
       await nofiRecCalif(datosReceptor.Correo,DatosEmpresaEmisora[0]['RazonSocial'],DatosEmpresaReceptora[0]['RazonSocial']);
       
       //aqui aviso al emisor que una calificacion se ha realizado al usuario master y al usuario que califico
       
     

        return res.status(200).json({
            ok: true,
            dar: respuesta
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const getcalificacion = async (req, res) => {
    try {
        //5fedbb9c2a259b42dc51806f
        const id = req.params.id;
        const cuestionario = await calificacionesDB.findById(id)
            .populate({ path: 'Detalle.Cumplimiento.Pregunta', model: 'pregunta' })
            .populate({ path: 'Detalle.Calidad.Pregunta', model: 'pregunta' })
            .populate({ path: 'Detalle.Sanidad.Pregunta', model: 'pregunta' })
            .populate({ path: 'Detalle.Socioambiental.Pregunta', model: 'pregunta' })
            .populate({ path: 'Detalle.Recomendacion.Pregunta', model: 'pregunta' })
            .populate({ path: 'Detalle.Oferta.Pregunta', model: 'pregunta' })
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
const getCuestionario = async (req, res) => {
    try {

        const datos = req.body;
        const IDEmpresaEmisor = req.IDEmpresa;
        const IDUsuarioEmisor = req.uid;
        const Tipo = datos['Tipo'].replace(/^\w/, (c) => c.toUpperCase());
        if (datos['IDReceptor'] === IDEmpresaEmisor) {
            return res.status(404).json({
                ok: false,
                code: 1991,
                msg: 'No puede calificar a su misma empresa'
            });
        }

        let oferta = 0;
        if (Tipo === "Proveedor") {
            oferta = 1;
        }

        const cuestionario = await cuestionariosDB.find({ subGiro: datos['SubGiro'], "Tipo": Tipo }, { "Oferta": oferta })
            .populate({ path: 'Cumplimiento', model: 'pregunta' })
            .populate({ path: 'Calidad', model: 'pregunta' })
            .populate('Sanidad', preguntasBD)
            .populate('Socioambiental', preguntasBD)
            .populate('Recomendacion', preguntasBD)
            .populate('Oferta', preguntasBD);
        const listas_dependencias = await cuestionariosDB.find({ subGiro: datos['SubGiro'], "Tipo": Tipo }, { "Oferta": oferta })
            .populate({ path: 'Cumplimiento', match: { Dependencia: 'SI' }, model: 'pregunta' })
            .populate({ path: 'Calidad', match: { Dependencia: 'SI' }, model: 'pregunta' })
            .populate({ path: 'Sanidad', match: { Dependencia: 'SI' }, model: 'pregunta' })
            .populate({ path: 'Socioambiental', match: { Dependencia: 'SI' }, model: 'pregunta' })
            .populate({ path: 'Recomendacion', match: { Dependencia: 'SI' }, model: 'pregunta' })
            .populate({ path: 'Oferta', match: { Dependencia: 'SI' }, model: 'pregunta' })
        return res.status(200).json({
            ok: true,
            cuestionario,
            listas_dependencias
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// funcion para llenar los datos de formulario para calificar donde me pide los datos de las empreas y los giros
const getdataForm = async (req, res) => {
    try {
        const giros = await gitosDB.find({});


        return res.status(200).json({
            ok: true,
            Empresas: await getAllEmpresa({ RazonSocial: 1, Rfc: 1 }),
            Giros: giros
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const getdataCompany = async (req, res) => {
    const eid = req.params.id;
    console.log(eid);
    try {

        const GiroPrincipal = await giroempresaDB.find({ IDEmpresa: eid, Principal: true })
            .populate({
                path: 'Giro'
            })
            .populate({
                path: 'SubGiro'
            })
            .populate({
                path: 'Rama'
            });

        let subgiros = [], ramas = [];

        if (GiroPrincipal.length > 0) {
            subgiros = await subgiroDB.find({ IDGiro: GiroPrincipal[0].Giro[0]._id });
            ramas = await ramaDB.find({ IDGiro: GiroPrincipal[0].SubGiro[0]._id });
        }

        // ahora obtengo los usuarios
        const Usuarios = await UsuariosBD.find({ IDEmpresa: eid, Status: true }, { Nombre: 1, Apellidos: 1, Correo: 1 });
        return res.status(200).json({
            ok: true,
            GiroPrincipal,
            ramas,
            subgiros,
            Usuarios

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
    getcalificacion,
    getdataForm,
    getdataCompany
}