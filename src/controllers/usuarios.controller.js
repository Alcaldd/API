import debug from 'debug';
import jwt from 'jsonwebtoken';
import * as usuarioModel from '../models/usuarios.model.js';
import * as config from '../libs/config.js';
import validator from 'validator';
import sendPassRecover from '../libs/mailto.js';

const secret_key = config.secret;
const printMessage = debug('app:usuarios-controller');

// Definimos funciones.

// Con esta funcion vemos todos los usuarios existentes.
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getUsuarios();
        printMessage('Accedio a la ruta de usuarios');
        return res.json(usuarios);
    } catch (error) {
        printMessage(error);
    }
}

export const getUsuarioByID = async (req, res) => {
    try{
        const { id } = req.params;
        const usuario = await usuarioModel.getUsuarioByID(id);
        printMessage('Accedio a los datos de un usuario');
        return res.json(usuario);
    } catch(error){
        printMessage(error);
    }
}

export const isBanned = async (req, res) => {
    try{
        const { id } = req;
        const usuario = await usuarioModel.isBanned(id);

        if(usuario.length > 0) {
            return res.json({banned: true});
        }
        return res.json({banned: false});
    } catch(error){
        printMessage(error);
    }
}

const testEmail = async (correo) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(correo);
}

// Esta funcion crea el usuario nuevo
export const createUsuario = async (req,res) => {
    try {
        const { nombre, correo, ciudad, contraseña } = req.body;

        const usuario = {nombre, correo, ciudad, contraseña}; // Destructuramos los datos que enviamos desde el frontend

        if(!validator.isStrongPassword(contraseña, { minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 })) return res.status(400).json({error: 'La contraseña es muy insegura'});

        if(contraseña == "12345678") return res.status(400).json({error: 'La contraseña es muy insegura'});

        if(!testEmail(correo)) return res.status(400).json({error: 'El correo no es valido'});

        if(nombre.length < 3) return res.status(400).json({error: 'El nombre debe tener al menos 3 caracteres'});

        if(nombre.ciudad < 3) return res.status(400).json({error: 'La ciudad debe tener al menos 3 caracteres'});

        const exist = await usuarioModel.getUsuarioByCorreo(correo); // Preguntamos si existe

        if(exist.length > 0) return res.status(409).json({error: 'El usuario ya existe'}); // Si existe, devolvemos un error.
    
        const result = await usuarioModel.createUsuario(usuario); // Llamamos el modelo a crear
    
        if(result > 0) { // Si el resultado es indiferente a falso, devolvemos un token para autentificar.
            const firstLogin = await usuarioModel.loginUsuario(usuario); // Llamamos el modelo para logear.

            if(firstLogin.id === undefined) return res.status(404).json({error: 'Usuario no encontrado o credenciales incorrectas'}); // Si el resultado es indefinido, devolvemos error.

            const token = jwt.sign({id: firstLogin.id}, secret_key, {expiresIn: 86400});
                printMessage('Un usuario accedio correctamente a su cuenta');
                return res.json({token: token, user: {id: firstLogin.id, rol: firstLogin.rol}});// Si no, creamos un token  y lo retornamos
        };
        
        printMessage('Un usuario intento crear una cuenta que ya existe');
    } catch (error) {
        printMessage(error);
    }
}

export const loginUsuario = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const usuario = {correo, contraseña}; // Destructuramos correo y contraseña y lo guardamos en un objeto.
        
        const result = await usuarioModel.loginUsuario(usuario); // Llamamos el modelo para logear.

        if(result.id === undefined) return res.status(404).json({error: 'Usuario no encontrado o credenciales incorrectas'}); // Si el resultado es indefinido, devolvemos error.

        const token = jwt.sign({id: result.id}, secret_key, {expiresIn: 86400});
            printMessage('Un usuario accedio correctamente a su cuenta');
            return res.json({token: token, user: {id: result.id, rol: result.rol}});// Si no, creamos un token  y lo retornamos
    } catch (error) {
        printMessage(error);
    }
}


export const recoverPass = async (req, res) => {
    try {
        const { correo } = req.body;
        const result = await usuarioModel.getUsuarioByCorreo(correo);
        if(result[0].id === undefined) return res.status(404).json({error: 'Usuario no encontrado'});

        const code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        const saveCode = await usuarioModel.saveRecoverCode(result[0].id, code);

        if(saveCode > 0)
            sendPassRecover(result[0].correo, code);
            return res.status(200).json({success: 'Se ha enviado un correo con el codigo de recuperacion'});
    } catch (error) {
        printMessage(error);
    }
}

export const compareChangePass = async (req, res) => {
    try {
        const { newPass, codigo } = req.body;
        const result = await usuarioModel.getUsuarioByCode(codigo);

        if(newPass.length < 8) return res.status(400).json({error: 'La contraseña debe tener al menos 8 caracteres'});

        if(result.length > 0){
            if(result[0].codigo == codigo){
                const savePass = await usuarioModel.changePass(result[0].id_usuario, newPass);
                if(savePass > 0) return res.status(200).json({success: 'Contraseña cambiada correctamente'});
            }
        }
        return res.status(404).json({error: 'Codigo invalido'});

    } catch (error) {
        printMessage(error);
    }
}


// Esta funcion banea al usuario.
export const banUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Conseguimos la id desde los parametros.
        const { razon } = req.body;
        const result = await usuarioModel.banUsuario(id, req.id, razon); // Llamamos al modelo que banea.
    
        if(result > 0) return res.status(200).json({success: 'Usuario baneado correctamente'});
    
        return res.status(404).json({error: 'Usuario no encontrado o baneado anteriormente'});
    } catch (error) {
        printMessage(error);
    }
}


// Esta funcion sirve para perdonar al usuario.
export const pardonUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Destructuramos el id, a travez de los parametros en la url.
        const { razon } = req.body;
        const result = await usuarioModel.pardonUsuario(id, req.id, razon);
    
        if(result > 0) return res.status(200).json({success: 'Usuario perdonado correctamente'}); // Si encuentra lineas afectadas, retorna success.
    
        return res.status(404).json({error: 'Usuario no encontrado o no baneado'}); // Si no, retorna un error.
    } catch (error) {
        printMessage(error);
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioModel.deleteUsuario(id);
    
        if(result > 0) return res.status(200).json({success: 'Usuario eliminado correctamente'});
    
        return res.status(404).json({error: 'Usuario no encontrado'});
    } catch (error) {
        printMessage(error);
    }
}


export const ascenderUsuario = async(req, res) => {
    try{
        const { id } = req.params;
        const result = await usuarioModel.ascenderUsuario(id, req.id);

        if(result > 0) return res.status(200).json({success: 'Usuario ascendido correctamente'});

        return res.status(404).json({error: 'No se pudo ascender al usuario'});
    } catch (error){
        printMessage(error);
    }
}

export const degradarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioModel.degradarUsuario(id, req.id);

        if(result > 0) return res.status(200).json({success: 'Usuario degradado correctamente'});

        return res.status(404).json({error: 'No se pudo degradar al usuario'});
    } catch (error) {
        printMessage(error);
    }
}