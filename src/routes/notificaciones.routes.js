import Router from 'express';
import { getNotificaciones, deleteNotificacion } from '../controllers/notificaciones.controller.js';
import { validarAdmin, validarLogin, validarModerador } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.get('/', validarLogin, getNotificaciones);
router.post('/eliminar/:id', validarLogin, deleteNotificacion);



export {
    router
}