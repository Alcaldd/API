import Router from 'express';
import { createLista, deleteListaById, getListaById, getListas, buscarListas } from '../controllers/listas.controller.js';
import { validarAdmin, validarLogin, validarBan } from '../middlewares/usuarios.middlewares.js';
import { uploadImage } from '../libs/image.js';

const router = Router();


router.post('/crear', validarLogin, validarBan, uploadImage('image'), createLista);
router.post('/eliminar/:id', validarLogin, validarAdmin, deleteListaById);
router.get('/buscar/:cc', validarLogin, validarBan, buscarListas)
router.get('/ver/:id', validarLogin, getListaById);
router.get('/ver', validarLogin, getListas);


export {
    router
}