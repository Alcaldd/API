import { SMTPClient } from "emailjs";
import * as config from './config.js'
import debug from 'debug';
const printMessage = debug('app:mailServer');

// Funcion para enviar correos electronicos.


const sendPassRecover = async (correo, code) => {
    
  try{

    const client = new SMTPClient({
      user: config.SMTP_USER,
      password: config.SMTP_PASSWORD,
      host: config.SMTP_HOST,
      ssl: true,
    }); // Instanciamos el cliente.


    try {
      const message = await client.sendAsync({
        text: ``,
        from: config.SMTP_EMAIL, // Aqui el Email que usara la Aplicacion / Organizacion
        to: `${correo}`, // Este es el email que recuperamos del usuario.
        cc: 'santiagoruicontact@gmail.com',
        subject: `Recuperacion de contraseña`,
        attachment: [
          { data: `<html>
          <h4>Hola, has pedido recuperar tu contraseña en el foro de vehiculos</h4>
          <h3>Tu codigo es: ${code}</h3>
          </html>`, alternative: true }
        ],
      });
      printMessage("Se envio un correo al email " + correo);
    } catch (err) {
      printMessage(err);
    }
  } catch(error){
    printMessage(error);
  }

}

export default sendPassRecover;
