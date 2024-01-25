import Router from 'express';
import { createVersus, getVersus, getVersusById, getVotoById, votarVersus, actualizarVoto, getVotosInVersus, createVersusComentarios, eliminarVersusComentario } from '../controllers/versus.controller.js';
import { validarAdmin, validarLogin, validarSesion, validarBan, validarModerador } from '../middlewares/usuarios.middlewares.js';
import { uploadImage } from '../libs/image.js';
import { uploadImageChat } from '../libs/imageMessages.js';

const router = Router();

router.get('/', validarLogin, getVersus);
router.get('/:id', validarLogin, getVersusById);
router.post('/crear/', validarLogin, validarBan, uploadImage('image'), createVersus);
router.post('/votar/:id', validarLogin, votarVersus);
router.get('/votos/:id', validarLogin, getVotosInVersus);
router.get('/voto/:id', validarLogin, getVotoById);
router.post('/comentario/:id', validarLogin, validarBan, uploadImageChat('imagen'), createVersusComentarios);
router.post('/eliminar/comentario/:id', validarLogin, validarModerador, eliminarVersusComentario);
router.post('/actualizar/:id', validarLogin, actualizarVoto);

export {
    router
}
