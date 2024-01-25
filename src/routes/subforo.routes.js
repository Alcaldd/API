import Router from 'express';
import * as subforoController from '../controllers/subforo.controller.js';
import { validarLogin, validarModerador } from '../middlewares/usuarios.middlewares.js';
import { uploadImageChat } from '../libs/imageMessages.js';

const router = Router();

// Controllers

router.get('/:resena/:tipo', subforoController.getComentarios);
router.post('/delete/:id', validarLogin, validarModerador, subforoController.deleteComentario);
router.post('/mute/:id/:tipo', validarLogin, validarModerador, subforoController.muteSubforum);
router.post('/delete/reply/:id', validarLogin, validarModerador, subforoController.deleteReply);
router.post('/reply/:resena/:tipo/:comentario', validarLogin, uploadImageChat('imagen'), subforoController.replyComentario);
router.post('/like/reply/:subforo', validarLogin, subforoController.likeReply);
router.post('/like/:mensaje/:subforo', validarLogin, subforoController.likeComentario);
router.post('/:resena/:tipo', validarLogin, uploadImageChat('imagen'), subforoController.postComentario);

export {
    router
}