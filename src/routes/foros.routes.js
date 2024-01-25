import Router from 'express';
import { uploadImageChat } from '../libs/imageMessages.js';
import { createForo, deleteReply, createMensaje, listarForo, listarForos, eliminarForo, deleteMensaje, createRegla, createLike, buscarForo, deleteRegla, createReply, getReglas, silenciarForo, agregarPalabra, likeReply } from "../controllers/foros.controller.js";
import { validarAdmin, validarLogin, validarModerador } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.get('/', listarForos);
router.get('/regla', getReglas);
router.get('/:id', listarForo);
router.post('/crear', validarLogin, createForo);
router.post('/crear/mensaje/:id', validarLogin, uploadImageChat('imagen'), createMensaje);
router.post('/crear/like/:id', validarLogin, createLike);
router.post('/crear/like/reply/:id', validarLogin, likeReply);
router.post('/crear/reply/:id', validarLogin, uploadImageChat('imagen'), createReply);
router.post('/delete/mensaje/:id', validarLogin, validarModerador, deleteMensaje);
router.post('/delete/reply/:id', validarLogin, validarModerador, deleteReply);
router.post('/eliminar/:id', validarLogin, validarModerador, eliminarForo);
router.post('/silenciar/:id', validarLogin, validarModerador, silenciarForo);
router.post('/regla/crear', validarLogin, validarAdmin, createRegla);
router.post('/regla/eliminar/:id', validarLogin, validarAdmin, deleteRegla);
router.post('/palabras', validarLogin, validarAdmin, agregarPalabra)
router.get('/buscar/:cc', validarLogin, buscarForo)



export {
    router
}