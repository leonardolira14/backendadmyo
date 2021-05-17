const { Schema, model, models } = require('mongoose');

const estadosSchema  = new Schema({
    nom_ent:{
        type: String
    },
    nom_abr:{
        type:String
    },
    fechaModificacion:{
        type:Date
    },
    id_pais:{
        type:String
    }
});

estadosSchema.method('toJSON',function (){
    const { __v,_id,...Object} = this.toObject();
    Object.id = _id;
    return Object;
});
module.exports = model('estado',estadosSchema,'estados');