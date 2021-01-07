const { Schema, model, models } = require('mongoose');

const notificacionSchema = new Schema({
    IDEmpresa:{
        type:String
    },
    IDEmpresaB:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Empresa' }],
    },
    Fecha:{
        type:Date,
        default:Date.now()
    },
    Tipo:{
        type:String,
    }
});

notificacionSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('notificacion',notificacionSchema,'notificaciones');