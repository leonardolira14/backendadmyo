const { Schema, model } = require('mongoose');

const ramaSchema = new Schema({
    IDGiro:{
        type:String
    },
    Giro:{
        type:String
    }
});
ramaSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('rama',ramaSchema,'ramas');