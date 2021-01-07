const { Schema, model } = require('mongoose');

const girosSchema = new Schema({
    Giro:{
        type:String
    }
});
girosSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});

module.exports = model('giro',girosSchema,'giros');