import * as strikesModel from '../models/strikes.model.js';
import debug from 'debug';

const printMessage = debug('app:strikes-controller');
// Definimos controladores

export const strikeUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { razon } = req.body;
        const result = await strikesModel.strikeUsuario(id, req.id, razon);
       
        if(result.affectedRows == 0) return res.json({ message: 'No se pudo sancionar al usuario o fue baneado por acumular strikes' });

        printMessage(`Se le añadieron strikes al usuario ${id}`)
        return res.json({ message: 'Usuario sancionado correctamente' });
    } catch (error) {
        printMessage(error);
    }
}


export const quitarStrikeUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await strikesModel.quitarStrikeUsuario(id, req.id);
       
        if(result == false) return res.json({ message: 'No se pudo eliminar strikes' });

        printMessage(`Se le removieron strikes al usuario ${id}`)
        return res.json({ message: 'Se le removieron strikes al usuario' });
    } catch (error) {
        printMessage(error);
    }
}