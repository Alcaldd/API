import Router from 'express';
import { getCalificacionById, getCalificaciones, createCalificacion } from "../controllers/calificaciones.controller.js";
import { validarLogin, validarBan } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.get('/', validarLogin, getCalificaciones);
router.get('/:id', validarLogin, getCalificacionById);
router.post('/', validarLogin, validarBan, createCalificacion);

export {
    router
}