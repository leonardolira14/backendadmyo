const { Schema, model, models } = require('mongoose');

const certificacionSchema = new Schema({
    IDEmpresa:{
        type:String
    },
    Certificacion:{
        type:String
    },
    FechaCertificacion:{
        type:String
    },
    TipoCertificacion:{
        type:String
    },
    FechaVencimiento:{
        type:String
    },
    Calificacion:{
        type:Number
    },
    Clase:{
        type:String
    },
    EmpresaCertificadora:{
        type:String
    },
    Archivo:{
        type:String
    },
    FechaAlta:{
        type:Date,
        default:Date.now()
    }
});

certificacionSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
})
module.exports = model('Certificacion',certificacionSchema,'certificaciones');