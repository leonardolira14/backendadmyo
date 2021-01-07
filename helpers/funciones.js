const  generatePasswordRand = (length,type)=> {
    switch(type){
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    var pass = "";
    for (i=0; i < length; i++){
        if(type == 'rand'){
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        }else{
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        }
    }
    return pass;
}
 const separar = async (array)=>{
       let datos = [];
       array.forEach(element => {
           datos.push(element.IDEmpresaB[0].id);
       });
       return datos;
 }
const addcategoria =  async (array)=>{
    let detalle_array = new Array();
    array.forEach((element)=>{
        detalle_array.push({Pregunta:element._id,Respuesta:'SI',PuntosObtenidos:10,PuntosPosibles:20});
    });

    return detalle_array;
}

const mesesdias = async (tiempo)=>{
    var f = new Date();
    array_fechas = [];
    if(tiempo === 'M'){
        
        let  dia = f.setDate( f.getDate() - 32 );
        for(let i=0;i<=30;i++){
            let fec=new Date(dia);
            dia = f.setDate(fec.getDate()+1);
            array_fechas.push(new Date(dia));
        }
        return array_fechas;
        
    }
    if(tiempo === 'MA' || tiempo === 'A'){
        let mes = '';
        for(let i = 1; i<=(f.getMonth()+1);i++){
            if(i<10){
                mes = "0"+i;
            }else{
                mes =i;
            }
            array_fechas.push(mes+"-"+f.getFullYear());
        }
    }
    return array_fechas;
}
module.exports = {
    generatePasswordRand,
    separar,
    addcategoria,
    mesesdias
}