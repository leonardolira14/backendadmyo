const { Schema, model, models } = require('mongoose');

const tipoempresaSchema = new Schema({
    Tipo:{
        type: String
    }
})

tipoempresaSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('tipoempresa',tipoempresaSchema,'tipoempresa');