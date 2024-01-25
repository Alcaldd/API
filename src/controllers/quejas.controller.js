import * as quejasModel from "../models/quejas.model.js";
import debug from 'debug';
import jwt from 'jsonwebtoken';
import * as config from "../libs/config.js";
const printMessage = debug('app:quejasController');

export const listarQuejas = async (req, res) => {
    try{
        const quejas = await quejasModel.listarQuejas();
        printMessage('Se listaron las quejas correctamente');
        if(quejas) return res.status(200).json(quejas);
    } catch(error){
        printMessage(error);
    }
}


export const createQueja = async (req, res) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, config.secret)

    const data = {usuario_id: decoded.id, mensaje: req.body.mensaje};
    // SI el mensaje no esta vacio procede a crear la sugerencia
    if(!data.mensaje.trim() == '') {
        try{
            const quejas = await quejasModel.createQueja(data);
            printMessage('Se creo una queja/sugerencia correctamente');
    
            if(quejas.affectedRows > 0) return res.status(200).json({"message": "Queja creada exitosamente"});
    
            return res.status(404).json({"message": "No se pudo crear la queja"});
        } catch(error){
            printMessage(error);
        }
    }
    // Sino devuelve error
    return res.status(400).json({"error": "El mensaje no puede estar vacio"});
}


export const deleteQueja = async (req, res) => {
    const {id} = req.params;
    try{
        const quejas = await quejasModel.deleteQueja(id);
        printMessage('Se intento eliminar una queja correctamente');

        if(quejas.affectedRows === 0)  return res.status(404).json({"error": "No se pudo eliminar la queja"});

        return res.status(200).json({"message": "Queja eliminada exitosamente"});
    } catch(error){
        printMessage(error);
    }
}