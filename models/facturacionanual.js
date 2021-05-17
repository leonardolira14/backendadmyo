const { Schema, model } = require('mongoose');

const facturacionSchema = new Schema({
    FacAnual:{
        type:String
    }
});

facturacionSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('facanual',facturacionSchema,'facanual');