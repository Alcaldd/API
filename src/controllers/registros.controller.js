import * as registrosModel from '../models/registro.model.js';
import debug from 'debug';

const printMessage = debug('app:strikes-controller');
// Definimos controladores

export const getRegistros = async (req, res) => {
    try {
        const result = await registrosModel.getRegistros();

        return res.status(200).json(result);
    } catch (error) {
        printMessage(error);
    }
}
