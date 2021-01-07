const { Schema, model } = require('mongoose');

const preguntaSchemal = new Schema({
   
    Pregunta:{
        type:String
    },
    PorTotal:{
        type:String
    },
    PorDes:{
        type:String
    },
    Condicion:{
        type:String
    },
    Forma:{
        type:String
    },
    Dependencia:{
        type:String
    },
    PreguntaDependencia:{
        type:Array
    },
    RespuestaDepen:{
        type:String
    },
    Tipo:{
        type:String
    },
    Equiparable:{
        type:String
    }
})

preguntaSchemal.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.IDPregunta = _id;
    return Object;
});

module.exports = model('pregunta',preguntaSchemal,'preguntas');