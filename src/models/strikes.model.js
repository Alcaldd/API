import { connectDatabase } from "../database/db.js";
import debug from 'debug';
const printMessage = debug('app:strikes-model');

import * as notificacionesModel from './notificaciones.model.js';
import * as registroModel from './registro.model.js';


// Definimos modelos y acciones para los strikes.

const banearMaxStrikes = async (id, moderador, razon) => {
    try {
        const connection = await connectDatabase();
        
        const [result] = await connection.execute('UPDATE usuarios SET ban = 1 WHERE id = ?', [id]);

        const registro = await registroModel.addRegistro('BAN', razon, id, moderador);

        connection.end();
        return result.affectedRows;
    } catch(error){
        printMessage(error);
    }
}


export const strikeUsuario = async (id, moderador, razon) => {
    try {
        const connection = await connectDatabase();

        const [info] = await connection.execute('SELECT strikes FROM usuarios WHERE id = ?', [id]);
        if(info[0].strikes >= 2) {
            await banearMaxStrikes(id, moderador, razon),
            printMessage(`El usuario ${id} fue baneado por tener 3 strikes`)
            const notify = await notificacionesModel.createNotificacion(id, `Has sido baneado por tener 3 strikes`);
        }; 

        const registro = await registroModel.addRegistro('STRIKE', razon, id, moderador);

        const notify = await notificacionesModel.createNotificacion(id, razon);

        const [result] = await connection.execute('UPDATE usuarios SET strikes = strikes + 1 WHERE id = ?', [id]);
        connection.end();
        return result;

    } catch (error) {
        printMessage(error);
    }
}


export const quitarStrikeUsuario = async (id, moderador) => {
    try {
        const connection = await connectDatabase();

        const [info] = await connection.execute('SELECT strikes FROM usuarios WHERE id = ?', [id]);
        if(info[0].strikes == 0) return false; 

        const registro = await registroModel.addRegistro('STRIKE', 'Se quito un strike', id, moderador);

        const [result] = await connection.execute('UPDATE usuarios SET strikes = strikes - 1 WHERE id = ?', [id]);
        
        connection.end();
        return result;

    } catch (error) {
        printMessage(error);
    }
}