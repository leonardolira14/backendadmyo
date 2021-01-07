const { Schema, model } = require('mongoose');
const { remove } = require('./empresa');

const UsuarioSchemal = Schema({
    IDEmpresa:{
        type:String
    },
    Nombre:{
        type:String
    },
    Apellidos:{
        type:String
    },
    Correo:{
        type:String
    },
    Visible:{
        type:Boolean,
        default:true
    },
    Status:{
        type:Boolean,
        default:false
    },
    Password:{
        type:String
    },
    FechaRegistro:{
        type:Date,
        default:Date.now()
    },
    Logo:{
        type:String
    },
    Tipo_Usuario:{
        type:Boolean
    },
    Puesto:{
        type:String
    },
    Token:{
        type:String
    }
});
UsuarioSchemal.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    
    return Object;
})
module.exports = model('Usuario',UsuarioSchemal);