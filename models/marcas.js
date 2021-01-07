const { Schema, model, models } = require('mongoose');

const marcasSchema = new Schema({
   
    IDEmpresa:{
        type:String
    },
    FechaAlta:{
        type:Date,
        default:Date.now()
    },
    Marca:{
        type:String
    },
    Logo:{
        type:String
    }
});

marcasSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
})

module.exports = model('Marca',marcasSchema);