const { Schema, model, models } = require('mongoose');

const accesosSchema = new Schema({
    IDUsurio:{
        type:String
    },
    IDEmpresa:{
        type:String
    },
    Fecha:{
        type:Date,
        default:Date.now()
    }
});

module.exports = model('Acceso',accesosSchema);