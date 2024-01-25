import Router from 'express';
import { getUsuarios, createUsuario, loginUsuario, banUsuario, pardonUsuario, deleteUsuario, ascenderUsuario, degradarUsuario, getUsuarioByID, recoverPass, compareChangePass, isBanned} from '../controllers/usuarios.controller.js';
import { validarLogin, validarAdmin, validarModerador, usuarioAdministrador, validarSesion } from '../middlewares/usuarios.middlewares.js';


const router = Router();

router.get('/', [validarLogin, validarModerador], getUsuarios);
router.get('/banned', [validarLogin], isBanned);
router.get('/:id', [validarLogin, validarModerador], getUsuarioByID);
router.post('/admin', validarLogin, usuarioAdministrador);
router.post('/create', createUsuario);
router.post('/login', loginUsuario);
router.post('/ban/:id', [validarLogin, validarModerador], banUsuario);
router.post('/pardon/:id', [validarLogin, validarModerador], pardonUsuario);
router.post('/delete/:id', [validarLogin, validarAdmin], deleteUsuario);
router.post('/ascender/:id', [validarLogin, validarAdmin], ascenderUsuario);
router.post('/degradar/:id', [validarLogin, validarAdmin], degradarUsuario);
router.post('/recover', recoverPass);
router.post('/change/pass', compareChangePass);
router.post('/sesion', validarSesion);


export {
    router
}
