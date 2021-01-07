const { Schema, model } = require('mongoose');


const productosSchema = new Schema({
    IDEmpresa:{
        type:String
    },
    Logo:{
        type:String
    },
    Producto:{
        type:String
    },
    Clave:{
        type:String
    },
    Descripcion:{
        type:String
    },
    FechaAlata:{
        type:Date,
        default:Date.now()
    }
});

productosSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
})

module.exports = model('producto',productosSchema,'productos');