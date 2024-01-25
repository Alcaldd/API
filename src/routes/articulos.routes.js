import Router from 'express';
import { uploadImage, uploadLocalImage } from '../libs/image.js';
import { listarArticulos, verArticulo, crearArticulo, eliminarArticulo, buscarArticulo } from '../controllers/articulos.controller.js';
import { validarLogin, validarBan, validarAdmin, validarEscritor } from '../middlewares/usuarios.middlewares.js';

const router = Router();


// Definimos rutuas y middles.
router.get('/', listarArticulos);
router.get('/:id', verArticulo);
router.get('/buscar/:cc', buscarArticulo);
router.post('/crear', [validarBan, validarLogin, validarEscritor], uploadImage('image'), crearArticulo);
router.post('/eliminar/:id', [validarBan, validarLogin, validarAdmin], eliminarArticulo);
router.post('/image/add', uploadLocalImage('file'))

export {
    router
}