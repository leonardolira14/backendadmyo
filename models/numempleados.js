const { Schema, model } = require('mongoose');

const numempleadosSchema= new Schema({
    Num:{
        type:String
    }
});

numempleadosSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('noempleado',numempleadosSchema,'noempleado');