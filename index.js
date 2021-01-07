const  Mongoose  = require('mongoose');
Mongoose.set('useFindAndModify',false);
const app = require('./app');

app.set('port',process.env.PORT || 3000);

Mongoose.connect(process.env.DBCONNECTION)
.then(()=>{
    console.log('conexion correcta a la base de datos');
    app.listen(app.get('port'),()=>{
        console.log('Servidor conectado al puerto '+ app.get('port'));
    });
})
.catch((error)=>console.log(error));