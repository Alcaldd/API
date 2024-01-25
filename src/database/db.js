import mysql from 'mysql2/promise';
import debug from 'debug';
import * as config from '../libs/config.js';

const printMessage = debug('app:database');
// Importamos debug, para enviar mensajes a la consola y importamos mysql para conenctarnos a la db.


// Funcion asincrona para conectarse a la db
async function connectDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        });

        printMessage("Conectado a la base de datos");
        return connection;
    } catch(error){
        throw error; // Si falla muestra el error en consola.
    }
}

export {
    connectDatabase
}// Exportamos para usarla con los modelos.