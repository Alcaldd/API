import Router from 'express';
import { getRegistros } from '../controllers/registros.controller.js';
import { validarLogin, validarModerador } from '../middlewares/usuarios.middlewares.js';

const router = Router();

// Definimos endpoints.

router.get('/', [validarLogin, validarModerador], getRegistros)

export {
    router
}