import * as forosModel from "../models/foros.model.js";
import * as strikesModel from "../models/strikes.model.js";
import * as usuariosModel from "../models/usuarios.model.js";
import * as resenaModel from "../models/resenas.model.js";
import { connectDatabase } from '../database/db.js';
import jwt from "jsonwebtoken";

import * as config from "../libs/config.js";

const secret_key = config.secret;

export const visitarResena = async (id) => {
  try {
    return await resenaModel.incrementarVisitas(id);
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

export const like = async (data) => {
  try {
  } catch (error) {
    return { status: 0, error: error.message };
  }
};

export const getForo = async (data) => {
  try {
    const { room } = data;

    if (room === undefined || room.trim() === "")
      throw new Error("La ID de la sala no puede estar vacía");

    const findForo = await forosModel.listarForo(room);

    if (findForo.length > 0) return { status: 1, foro: findForo };

    throw new Error(
      "El usuario mensajero o el usuario receptor no pertenecen a la sala"
    );
  } catch (error) {
    return { status: 0, error: error.message };
  }
};

export const createMessage = async (data) => {
  try {
    const decode = jwt.decode(data.token, secret_key);
    const id = decode.id;
    const { room, text } = data;
    const file = data.file.filename;

    let datos;
    if (Array.isArray(text)) {
      text.reverse();
      datos = {
        id_usuario: id,
        id_foro: room,
        mensaje: text[0],
        imagen: file,
      };
    } else {
      datos = { id_usuario: id, id_foro: room, mensaje: text, imagen: file };
    }

    const getProhibidas = await forosModel.getPalabrasProhibidas();

    const usuario = await usuariosModel.getUsuarioByID(id);

    const userBanned = await usuariosModel.isBanned(id);

    if(userBanned.length > 0) {
        return { status: 0, error: "Estas baneado, no puedes enviar mensajes" };
    }

    if (usuario[0].rol === "usuario" || usuario[0].rol === "escritor") {
      const foroEstado = await forosModel.getForoEstado(room);
      if (foroEstado[0].estado === 0)
        return { status: 0, error: "Foro silenciado" }

      const splited = getProhibidas[0].contenido.split(", ");

      if (splited.some((palabra) => text.includes(palabra))) {
        await strikesModel.strikeUsuario(id, await getBotID(), "Palabras Prohibidas");
        return { status: 0, error: "Mensaje no permitido, se te añadio un strike" };
      }
    }

    const newMensaje = await forosModel.createMensaje(datos);

    if (newMensaje > 0) return { status: 1, message: "Mensaje enviado" };
  } catch (error) {
    return { status: 0, error: error.message };
  }
};

export const createReply = async (data) => {
  try {
    const decode = jwt.decode(data.token, secret_key);
    const id = decode.id;
    const { room, text } = data;
    const file = data.file.filename;
    const idReply = data.id_reply;

    
    let datos;
    if (Array.isArray(text)) {
      text.reverse();
      datos = {
        id_usuario: id,
        id_foro: room,
        mensaje: text[0],
        imagen: file,
        id_mensaje: idReply,
      };
    } else {
      datos = {
        id_usuario: id,
        id_foro: room,
        mensaje: text,
        imagen: file,
        id_mensaje: idReply,
      };
    }


    const getProhibidas = await forosModel.getPalabrasProhibidas();

    const usuario = await usuariosModel.getUsuarioByID(id);

    
    const userBanned = await usuariosModel.isBanned(id);

    if(userBanned.length > 0) {
        return { status: 0, error: "Estas baneado, no puedes enviar mensajes" };
    }

    if (usuario[0].rol === "usuario" || usuario[0].rol === "escritor") {
      const foroEstado = await forosModel.getForoEstado(room);
      if (foroEstado[0].estado === 0)
        return  { status: 0, error: "Foro silenciado" }

      const splited = getProhibidas[0].contenido.split(", ");

      if (splited.some((palabra) => text.includes(palabra))) {
        await strikesModel.strikeUsuario(id, await getBotID(), "Palabras Prohibidas");
        return  { status: 0, error: "Mensaje no permitido, se te añadio un strike" }
      }
    }

    const newMensaje = await forosModel.createReply(datos);

    if (newMensaje > 0) return { status: 1, message: "Mensaje enviado" };
  } catch (error) {
    return { status: 0, error: error.message };
  }
};

export const deleteMessage = async (data) => {
  try {
    const decoded = jwt.verify(data.token, secret_key);
    const id = decoded.id;

    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [id]);

    const rol = result[0].rol;

    
    const userBanned = await usuariosModel.isBanned(id);

    if(userBanned.length > 0) {
        return { status: 0, error: "Estas baneado, no puedes realizar esta accion" };
    }
    
    if(rol === "moderador" || rol === "admin" || rol === "superadmin"){
        const datos = {id: data.id_mensaje}
        const deleted = await forosModel.deleteMensaje(datos);
    
        if(deleted > 0) return { status: 1, message: "Eliminado con exito" };
    }

    return { status: 0, error: "No tienes permisos para eliminar este mensaje" };

  } catch (error) {
    return { status: 0, error: error.message };
  }
};


export const deleteReply = async (data) => {
    try {
        const decoded = jwt.verify(data.token, secret_key);
        const id = decoded.id;
    
        const connection = await connectDatabase();
        const [result] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [id]);
    
        const rol = result[0].rol;
    
        
        const userBanned = await usuariosModel.isBanned(id);

        if(userBanned.length > 0) {
            return { status: 0, error: "Estas baneado, no puedes realizar esta accion" };
        }
        
        if(rol === "moderador" || rol === "admin" || rol === "superadmin"){
            const datos = {id: data.id_reply}
            const deleted = await forosModel.deleteReply(datos);
        
            if(deleted > 0) return { status: 1, message: "Eliminado con exito" };
        }
    
        return { status: 0, error: "No tienes permisos para eliminar este mensaje" };
    
    } catch (error) {
        return { status: 0, error: error.message };
    }
}



async function getBotID () {
    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT id FROM usuarios WHERE rol = ?', ['bot']);

    return result[0].id;
}