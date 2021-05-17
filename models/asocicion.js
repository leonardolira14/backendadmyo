const { Schema, model } = require('mongoose');

const asociacionesSchema = new Schema({
    IDEmpresa:{
        type:String
    },
    Asociacion: [{ type: Schema.Types.ObjectId, ref: 'listasociacion' }],
    FechaAlta:{
        type:Date,
        default:Date.now()
    }
})

asociacionesSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
})
module.exports = model('Asociacion',asociacionesSchema,'asociaciones');