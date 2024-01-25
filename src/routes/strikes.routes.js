import Router from 'express';
import { strikeUsuario, quitarStrikeUsuario } from '../controllers/strikes.controller.js';
import { validarLogin, validarModerador } from '../middlewares/usuarios.middlewares.js';

const router = Router();

// Definimos endpoints.

router.post('/sancionar/:id', [validarLogin, validarModerador], strikeUsuario)
router.post('/quitar/:id', [validarLogin, validarModerador], quitarStrikeUsuario)

export {
    router
}