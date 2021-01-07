const { Schema, model, models } = require('mongoose');

const girosEmpresa = new Schema({
    IDEmpresa:{
        type:String
    },
    Giro:{
        type:[{ type: Schema.Types.ObjectId, ref: 'giro' }],
    },
    SubGiro:{
        type:[{ type: Schema.Types.ObjectId, ref: 'Subgiro' }],
    },
    Rama:{
        type:[{ type: Schema.Types.ObjectId, ref: 'rama' }],
    },
    Principal:{
        type:Boolean,
        default:false
    },
    FechaAlta:{
        type:Date,
        default:Date.now()
    }
});

girosEmpresa.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});

module.exports = model('GiroEmpresa',girosEmpresa,'giroempresas');