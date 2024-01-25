import Router from 'express';
import { createReporte, getReportes, deleteReporte } from '../controllers/reportes.controller.js';

import { validarModerador, validarLogin } from '../middlewares/usuarios.middlewares.js';

const router = Router();

router.get('/', validarModerador, getReportes);
router.post('/crear', validarLogin, createReporte);
router.post('/eliminar/:id', validarModerador, deleteReporte);


export {
    router
}