const { Schema, model, models } = require('mongoose');

const relacionSchema = new Schema({
    IDEmpresa:{
        type:String
    },
    IDEmpresaB:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Empresa' }],
    },
    Tipo:{
        type:String
    },
    Fecha:{
        type:Date,
        default:Date.now()
    }
});
relacionSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('relacion',relacionSchema,'relacionempresas');