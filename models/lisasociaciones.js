const { Schema, model, models } = require('mongoose');

const lisasociacionesSchema = new Schema({
    Nombre:{
        type:String
    },
    Siglas:{
        type:String
    },
    Imagen:{
        type:String
    },
    Web:{
        type:String
    },
    Estado:{
        type:String
    },
    Municipio:{
        type:String
    },
    Colonia:{
        type:String
    },
    CP:{
        type:String
    },
    Direccion:{
        type:String
    },
    Telefono:{
        type:String
    }
});

lisasociacionesSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
})
module.exports = model('listasociacion',lisasociacionesSchema,'listasociaciones');