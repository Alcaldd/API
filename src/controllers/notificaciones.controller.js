import * as notificacionesModel from '../models/notificaciones.model.js';

export const getNotificaciones = async (req, res) => {
    const notis = await notificacionesModel.getNotificaciones(req.id);
    return res.status(200).json(notis);
}

export const deleteNotificacion = async (req, res) => {
    const result = await notificacionesModel.deleteNotificacion(req.params.id);
    if(result > 0) return res.status(200).json({ message: 'Notificacion eliminada' });

    return res.status(404).json({ error: 'Notificacion no encontrada' });
}