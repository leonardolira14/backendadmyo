const { Schema, model, models } = require('mongoose');

const calificacionSchema = new Schema({
    IDUsuarioEmisor:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    },
    IDEmpresaEmisor:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Empresa' }],
    },
    IDGiroEmisor:{
        Giro:{
            type:[{ type: Schema.Types.ObjectId, ref: 'giro' }],
        },
        subGiro:{
            type:[{ type: Schema.Types.ObjectId, ref: 'Subgiro' }],
        },
        Rama:{
            type:[{ type: Schema.Types.ObjectId, ref: 'rama' }],
        }
    },
    IDUsuarioReceptor:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    },
    IDEmpresaReceptor:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Empresa' }],
    },
    IDGiroReceptor:{
        Giro:{
            type:[{ type: Schema.Types.ObjectId, ref: 'giro' }],
        },
        subGiro:{
            type:[{ type: Schema.Types.ObjectId, ref: 'Subgiro' }],
        },
        Rama:{
            type:[{ type: Schema.Types.ObjectId, ref: 'rama' }],
        }
    },
    Status:{
        type:String
    },
    FechaRealizada:{
        type:Date
    },
    FechaModificacion:{
        type:Date
    },
    FechaPuesta:{
        type:Date
    },
    Motivo:{
        type:String
    },
    Emitidopara:{
        type:String
    },
    Detalle:{
        CalificacionCumplimiento:{
            type:Number
        },
        CalificacionCalidad:{
            type:Number
        },
        CalificacionOferta:{
            type:Number
        },
        CalificacionSanidad:{
            type:Number
        },
        CalificacionSocioambiental:{
            type:Number
        },
        Cumplimiento:
        [{
            Pregunta:{
                type: Schema.Types.ObjectId,
            },
            Respuesta:{
                type:String
            },
            PuntosObtenidos:{
                type:Number
            },
            PuntosPosibles:{
                type:Number
            },
            calificacion:{
                type:Number
            }
        }],
        Calidad:[{
            Pregunta:{
                type: Schema.Types.ObjectId,
            },
            Respuesta:{
                type:String
            },
            PuntosObtenidos:{
                type:Number
            },
            PuntosPosibles:{
                type:Number
            },
            calificacion:{
                type:Number
            }
        }],
        Oferta:[{
            Pregunta:{
                type: Schema.Types.ObjectId,
            },
            Respuesta:{
                type:String
            },
            PuntosObtenidos:{
                type:Number
            },
            PuntosPosibles:{
                type:Number
            },
            calificacion:{
                type:Number
            }
        }],
        Sanidad:[{
            Pregunta:{
                type: Schema.Types.ObjectId,
            },
            Respuesta:{
                type:String
            },
            PuntosObtenidos:{
                type:Number
            },
            PuntosPosibles:{
                type:Number
            },
            calificacion:{
                type:Number
            }
        }],
        Socioambiental:[{
            Pregunta:{
                type: Schema.Types.ObjectId,
            },
            Respuesta:{
                type:String
            },
            PuntosObtenidos:{
                type:Number
            },
            PuntosPosibles:{
                type:Number
            },
            calificacion:{
                type:Number
            }
        }],
        Recomendacion:[{
            Pregunta:{
                type: Schema.Types.ObjectId,
            },
            Respuesta:{
                type:String
            },
            PuntosObtenidos:{
                type:Number
            },
            PuntosPosibles:{
                type:Number
            },
            calificacion:{
                type:Number
            }
        }],
       
    }
});

calificacionSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});

module.exports = model('Calificacion',calificacionSchema,'calificaciones');