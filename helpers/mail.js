const nodemailer = require("nodemailer");


const active = async (Nombre,Correo,usuario,token)=>{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'infoadmyo@admyo.com', // generated ethereal user
      pass: 'Admyo246*', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"admyo " <infoadmyo@admyo.com>', // sender address
    to: Correo, // list of receivers
    subject: "Bienvenido " + Nombre, // Subject line
    html: '<!DOCTYPE html><html lang="en"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><head><style type="text/css">@import url(http://fonts.googleapis.com/css?family=Patua+One|Open+Sans); .img-fluid{width: 250px;}body{font-family: "arial";}p{text-align: justify;font-size: 11pt;color: #878788;}h3{font-size: 18pt;color: #005288;font-style: italic;font-weight: bold;}button{border-radius: 10px;border: 2px solid #e96610;padding: 15px 75px;cursor:pointer;background-color:#e96610;color: #ffffff;}h4{text-align: justify;}h5{text-align: justify;}table {border-collapse: separate;border: 0px; background: #fff;border-radius: 0px;margin: 20px auto;}thead {}thead td {font-family: "Open Sans", sans-serif;font-size: 23px;font-weight: 400;color: #fff;text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);text-align: left;padding: 20px;background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY0NmY3ZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzRhNTU2NCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==");background-size: 100%;background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #005d8f), color-stop(100%, #4a5564));background-image: -moz-linear-gradient(#005d8f, #004266);background-image: -webkit-linear-gradient(#005d8f, #004266);background-image: linear-gradient(#005d8f, #004266);}tbody tr td {font-family: "Open Sans", sans-serif;font-weight: 400;color: #5f6062;font-size: 16px;}</style></head><body><table><tr><td><img src="https://admyo.com/assets/img/logo-admyo2.png" class="img-fluid" alt=""></td><tr><td><center><br><h3>¡Bienvenido a admyo!</h3></center></td></tr><tr><td><h4 class="text-center" style="color:#878788; display: block;text-align: center; ">La herramienta que te permitirá gestionar el riesgo operativo de tu negocio.</h4></td></tr><tr><td><h5 ><span style="font-weight: bold;color:#878788; display: block;text-align: center;"> Controla el riesgo de tus clientes y proveedores. Mejora tus oportunidades de venta, gestionando tu reputación empresarial.Gestiona tu reputación empresarial online.</span></h5></td></tr><tr><td><center><a href="https://admyo.com/activar/'+token+'" ><button type="button" >ACTIVA TU CUENTA</button></a></center></td></tr><tr><td><table><tr><td><h4 style="color:#878788">Usuario:</h4></td><td><h4 style="color:#878788">'+usuario+'</h4></td></tr></table></td></tr></tr><tr><td><small style="color:#878788">Gracias por elegir admyo.</small></td></tr><tr><td><small style="color:#878788">Saludos</small></td></tr><tr><td><font color="#005288" style="font-weight: bold;">Equipo Admyo</font></p> </td></tr><tr><td><font color="#cc9829" >The most important thing for a young man is to establish credit - a reputation and character”... <p><br><font style="font-weight: bold;">John D. Rockefeller</font></font></p><p><small class="color:#777">Ha recibido este email por que se ha suscrito en admyo.com </small></p><p><small class="color:#777">infoadmyo S.A. de C.V. es una empresa legalmente constituida en México con RFC IAD120302T35 y es propietaria de la marca admyo y sus logos. Si tiene cualquier duda puede contactar con nosotros al email atencioncliente@admyo.com. Todas nuestras condiciones de uso y privacidad las puede encontrar en el <a href="">siguiente enlace</a></small></p></td></tr></table></body></html>', // html body
  });
  if(info.responseCode){
    console.log(info);
    return false
  }else{
    return true;
  }
  

}
const activeus = async (Nombre,Correo,usuario,token,pass)=>{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'infoadmyo@admyo.com', // generated ethereal user
      pass: 'Admyo246*', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"admyo " <infoadmyo@admyo.com>', // sender address
    to: Correo, // list of receivers
    subject: "Bienvenido " + Nombre, // Subject line
    html: '<!DOCTYPE html><html lang="en"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><head><style type="text/css">@import url(http://fonts.googleapis.com/css?family=Patua+One|Open+Sans); .img-fluid{width: 250px;}body{font-family: "arial";}p{text-align: justify;font-size: 11pt;color: #878788;}h3{font-size: 18pt;color: #005288;font-style: italic;font-weight: bold;}button{border-radius: 10px;border: 2px solid #e96610;padding: 15px 75px;cursor:pointer;background-color:#e96610;color: #ffffff;}h4{text-align: justify;}h5{text-align: justify;}table {border-collapse: separate;border: 0px; background: #fff;border-radius: 0px;margin: 20px auto;}thead {}thead td {font-family: "Open Sans", sans-serif;font-size: 23px;font-weight: 400;color: #fff;text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);text-align: left;padding: 20px;background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY0NmY3ZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzRhNTU2NCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==");background-size: 100%;background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #005d8f), color-stop(100%, #4a5564));background-image: -moz-linear-gradient(#005d8f, #004266);background-image: -webkit-linear-gradient(#005d8f, #004266);background-image: linear-gradient(#005d8f, #004266);}tbody tr td {font-family: "Open Sans", sans-serif;font-weight: 400;color: #5f6062;font-size: 16px;}</style></head><body><table><tr><td><img src="https://admyo.com/assets/img/logo-admyo2.png" class="img-fluid" alt=""></td><tr><td><center><br><h3>¡Bienvenido a admyo!</h3></center></td></tr><tr><td><h4 class="text-center" style="color:#878788; display: block;text-align: center; ">La herramienta que te permitirá gestionar el riesgo operativo de tu negocio.</h4></td></tr><tr><td><h5 ><span style="font-weight: bold;color:#878788; display: block;text-align: center;"> Controla el riesgo de tus clientes y proveedores. Mejora tus oportunidades de venta, gestionando tu reputación empresarial.Gestiona tu reputación empresarial online.</span></h5></td></tr><tr><td><center><a href="https://admyo.com/activar/'+token+'" ><button type="button" >ACTIVA TU CUENTA</button></a></center></td></tr><tr><td><table><tr><td><h4 style="color:#878788">Usuario:</h4></td><td><h4 style="color:#878788">'+usuario+'</h4></td></tr><tr><td><h4 style="color:#878788">Contraseña:</h4></td><td><h4 style="color:#878788">'+pass+'</h4></td></tr></table></td></tr></tr><tr><td><small style="color:#878788">Gracias por elegir admyo.</small></td></tr><tr><td><small style="color:#878788">Saludos</small></td></tr><tr><td><font color="#005288" style="font-weight: bold;">Equipo Admyo</font></p> </td></tr><tr><td><font color="#cc9829" >The most important thing for a young man is to establish credit - a reputation and character”... <p><br><font style="font-weight: bold;">John D. Rockefeller</font></font></p><p><small class="color:#777">Ha recibido este email por que se ha suscrito en admyo.com </small></p><p><small class="color:#777">infoadmyo S.A. de C.V. es una empresa legalmente constituida en México con RFC IAD120302T35 y es propietaria de la marca admyo y sus logos. Si tiene cualquier duda puede contactar con nosotros al email atencioncliente@admyo.com. Todas nuestras condiciones de uso y privacidad las puede encontrar en el <a href="">siguiente enlace</a></small></p></td></tr></table></body></html>', // html body
  });
  if(info.responseCode){
    console.log(info);
    return false
  }else{
    return true;
  }
  

}
const bajausuario = async (Correo,Nombre)=>{
  let transporter = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'infoadmyo@admyo.com', // generated ethereal user
      pass: 'Admyo246*', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"admyo " <infoadmyo@admyo.com>', // sender address
    to: Correo, // list of receivers
    subject: "Bienvenido " + Nombre, // Subject line
    html: '<!DOCTYPE html><html lang="en"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><head><style type="text/css">@import url(http://fonts.googleapis.com/css?family=Patua+One|Open+Sans); .img-fluid{width: 250px;}body{font-family: "arial";}p{text-align: justify;font-size: 11pt;color: #878788;}h3{font-size: 18pt;color: #005288;font-style: italic;font-weight: bold;}button{border-radius: 10px;border: 2px solid #e96610;padding: 15px 75px;cursor:pointer;background-color:#e96610;color: #ffffff;}h4{text-align: justify;}h5{text-align: justify;}table {border-collapse: separate;border: 0px; background: #fff;border-radius: 0px;margin: 20px auto;}thead {}thead td {font-family: "Open Sans", sans-serif;font-size: 23px;font-weight: 400;color: #fff;text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);text-align: left;padding: 20px;background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY0NmY3ZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzRhNTU2NCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==");background-size: 100%;background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #005d8f), color-stop(100%, #4a5564));background-image: -moz-linear-gradient(#005d8f, #004266);background-image: -webkit-linear-gradient(#005d8f, #004266);background-image: linear-gradient(#005d8f, #004266);}tbody tr td {font-family: "Open Sans", sans-serif;font-weight: 400;color: #5f6062;font-size: 16px;}</style></head><body><table><tr><td><img src="https://admyo.com/assets/img/logo-admyo2.png" class="img-fluid" alt=""></td><tr><td><center><br><h3>¡Baja Usuario!</h3></center></td></tr><tr><td><h4 class="text-center" style="color:#878788; display: block;text-align: center; ">Baja del sistema admyo.com</h4></td></tr><tr><td><h4 class="text-center" style="color:#878788; display: block;text-align: center; ">Si cree que le han dado de baja de forma indebida por favor ponerse en contacto con nosotros.</h4></td></tr><tr><td><h5 ><span style="font-weight: bold;color:#878788; display: block;text-align: center;"> Controla el riesgo de tus clientes y proveedores.Mejora tus oportunidades de venta, gestionando tu reputación empresarial.Gestiona tu reputación empresarial online.</span></h5></td></tr></tr><tr><td><small style="color:#878788">Gracias por elegir admyo.</small></td></tr><tr><td><small style="color:#878788">Saludos</small></td></tr><tr><td><font color="#005288" style="font-weight: bold;">Equipo Admyo</font></p> </td></tr><tr><td><font color="#cc9829" >The most important thing for a young man is to establish credit - a reputation and character”... <p><br><font style="font-weight: bold;">John D. Rockefeller</font></font></p><p><small class="color:#777">Ha recibido este email por que se ha suscrito en admyo.com </small></p><p><small class="color:#777">infoadmyo S.A. de C.V. es una empresa legalmente constituida en México con RFC IAD120302T35 y es propietaria de la marca admyo y sus logos. Si tiene cualquier duda puede contactar con nosotros al email atencioncliente@admyo.com. Todas nuestras condiciones de uso y privacidad las puede encontrar en el <a href="">siguiente enlace</a></small></p></td></tr></table></body></html>', // html body
  });
  if(info.responseCode){
    console.log(info);
    return false
  }else{
    return true;
  }
}
module.exports = {
    active,
    activeus,
    bajausuario
}