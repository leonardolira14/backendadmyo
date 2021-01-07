const { Schema, model, models } = require('mongoose');

const detalleSchema =  new Schema({
    IDPregunta:{
        type:[{ type: Schema.Types.ObjectId, ref: 'pregunta' }],
    },
    Respuesta:{
        type:String
    },
    PuntosObtenidos:{
        type:Number
    },
    PuntosPosibles:{
        type:Number
    }
});

detalleSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});

module.exports = model('delattecalificacion',detalleSchema,'delattecalificaciones');