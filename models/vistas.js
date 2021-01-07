const { Schema, model, models } = require('mongoose');

const visitasSchema = new Schema({
    IDEmpresa:{
        type:String
    },
    IDEmpresaVista:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Empresa' }],
    },
    Fecha:{
        type:Date,
        default:Date.now()
    }
});
visitasSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('visita',visitasSchema,'visitas');