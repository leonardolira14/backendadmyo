const { Schema, model, models } = require('mongoose');

const cuestionariosSchema = new Schema({
    subGiro:{
        type:String,
    },
    Tipo:{
        type:String,
    },
    Cumplimiento:{
        type:[{ type: Schema.Types.ObjectId, ref: 'pregunta' }],
    },
    Oferta:{
        type:[{ type: Schema.Types.ObjectId, ref: 'pregunta' }],
    },
    Calidad:{
        type:[{ type: Schema.Types.ObjectId, ref: 'pregunta' }],
    },
    Sanidad:{
        type:[{ type: Schema.Types.ObjectId, ref: 'pregunta' }],
    },
    Socioambiental:{
        type:[{ type: Schema.Types.ObjectId, ref: 'pregunta' }],
    },
    Recomendacion:{
        type:[{ type: Schema.Types.ObjectId, ref: 'pregunta' }],
    }
});


cuestionariosSchema.set('toObject', { virtuals: true });
cuestionariosSchema.set('toJSON', { virtuals: true });

cuestionariosSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});

module.exports = model('cuestionario',cuestionariosSchema,'cuestionarios');