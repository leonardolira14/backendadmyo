const { Schema, model } = require('mongoose');

const subgirosSchema = new Schema({
    IDGiro:{
        type:String
    },
    Giro:{
        type:String
    }
});
subgirosSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('Subgiro',subgirosSchema,'subgiros');