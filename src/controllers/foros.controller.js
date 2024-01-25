import * as forosModel from '../models/foros.model.js';
import * as strikesModel from '../models/strikes.model.js';
import * as usuariosModel from '../models/usuarios.model.js';
import debug from 'debug';

const printMessage = debug('app:foros-controller');


export const createForo = async (req, res) => {
    try {
        const { titulo } = req.body;
        const data = { titulo: titulo, id_usuario: req.id };

        const getForo = await forosModel.getForoByName(titulo);

        if(getForo.length > 0) return res.status(400).json({"error": "Ya existe un foro con ese nombre"});

        const foro = await forosModel.createForo(data);
    
        if(foro > 0) return res.status(201).json({"message": "Creaste un nuevo foro"});

        res.status(201).json({"message": "No se pudo crear un nuevo foro"});
    } catch (error) {
        printMessage(error);
    }
}

export const likeReply = async (req, res) => {
    try {
        const { id } = req.params;

        const data = { id_votante: req.id, id_reply: req.body.id_reply, id_foro: id };

        const like = await forosModel.likeReply(data);

        if(like > 0) return res.status(200).json({"message": "Diste like o quitaste el like correctamente"});

        return res.status(400).json({"message": "No se pudo crear el like"});

    } catch (error) {
        printMessage(error);
    }

}


export const listarForos = async (req, res) => {
    try {
        const foros = await forosModel.listarForos();
    
        return res.status(200).json(foros);
    } catch (error) {
        printMessage(error);
    }
}

export const listarForo = async (req, res) => {
    try {
        const foros = await forosModel.listarForo(req.params.id);
    
        return res.status(200).json(foros);
    } catch (error) {
        printMessage(error);
    }
}

export const createLike = async (req, res) => {
    try {
        const { id } = req.params;

        const data = { id_votante: req.id, id_mensaje: req.body.id_mensaje, id_foro: id };

        const like = await forosModel.createLike(data);

        if(like > 0) return res.status(200).json({"message": "Diste like o quitaste el like correctamente"});

        return res.status(400).json({"message": "No se pudo crear el like"});

    } catch (error) {
        printMessage(error);
    }
}

export const createMensaje = async (req, res) => {
    try {
        let data;
        if(Array.isArray(req.body.mensaje)) {
            req.body.mensaje.reverse();
            data = { id_usuario: req.id, id_foro: req.params.id, mensaje: req.body.mensaje[0], imagen: req.imageUrl };
        }else {
            data = { id_usuario: req.id, id_foro: req.params.id, mensaje: req.body.mensaje, imagen: req.imageUrl };
        }

        const getProhibidas = await forosModel.getPalabrasProhibidas();

        const usuario = await usuariosModel.getUsuarioByID(req.id);
        
        if(usuario[0].rol === "usuario" || usuario[0].rol === "escritor"){
            const foroEstado = await forosModel.getForoEstado(req.params.id);
            if(foroEstado[0].estado === 0) return res.status(400).json({"message": "Foro silenciado"});

            const splited = getProhibidas[0].contenido.split(', '); 
            
            if(splited.some((palabra) => data.mensaje.includes(palabra))) {
                await strikesModel.strikeUsuario(req.id);
                return res.status(400).json({"message": "Mensaje no permitido, se te añadio un strike"});
            }
        }

        const newMensaje = await forosModel.createMensaje(data);
    
        if(newMensaje > 0) return res.status(200).json({"message": "Mensaje creado correctamente"});

        return res.status(400).json({"message": "No se pudo crear el mensaje"});
    } catch (error) {
        printMessage(error);
    }
}

export const createReply = async (req, res) => {
    try {
        let data;
        if(Array.isArray(req.body.mensaje)) {
            req.body.mensaje.reverse();
            data = { id_usuario: req.id, id_mensaje: req.body.id_mensaje, id_foro: req.params.id, mensaje: req.body.mensaje[0], imagen: req.imageUrl };
        }else { 
            data = { id_usuario: req.id, id_mensaje: req.body.id_mensaje, id_foro: req.params.id, mensaje: req.body.mensaje, imagen: req.imageUrl };
        }

        const getProhibidas = await forosModel.getPalabrasProhibidas();

        const usuario = await usuariosModel.getUsuarioByID(req.id);
        
        if(usuario[0].rol === "usuario" || usuario[0].rol === "escritor"){
            const foroEstado = await forosModel.getForoEstado(req.params.id);
            if(foroEstado[0].estado === 0) return res.status(400).json({"message": "Foro silenciado"});

            const splited = getProhibidas[0].contenido.split(', '); 
            
            if(splited.some((palabra) => data.mensaje.includes(palabra))) {
                await strikesModel.strikeUsuario(req.id);
                return res.status(400).json({"message": "Mensaje no permitido, se te añadio un strike"});
            }
        }

        const newMensaje = await forosModel.createReply(data);
    
        if(newMensaje > 0) return res.status(200).json({"message": "Mensaje creado correctamente"});

        return res.status(400).json({"message": "No se pudo crear el mensaje"});
    } catch (error) {
        printMessage(error);
    }
}


export const deleteMensaje = async (req, res) => {
    try {
        const data = { id: req.params.id };
        const deleted = await forosModel.deleteMensaje(data);
    
        if(deleted > 0) return res.status(200).json({"message": "Mensaje eliminado correctamente"});

        return res.status(400).json({"message": "No se pudo crear el mensaje"});
    } catch (error) {
        printMessage(error);
    }
}

export const deleteReply = async (req, res) => {
    try {
        const data = { id: req.params.id };
        const deleted = await forosModel.deleteReply(data);
    
        if(deleted > 0) return res.status(200).json({"message": "Mensaje eliminado correctamente"});

        return res.status(400).json({"message": "No se pudo crear el mensaje"});
    } catch (error) {
        printMessage(error);
    }
}


export const eliminarForo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedForo = await forosModel.eliminarForo(id);
    
        if(deletedForo > 0) return res.status(200).json({"message": "Foro eliminado correctamente"});

        return res.status(400).json({"message": "No se pudo eliminar el foro"});
    } catch (error) {
        printMessage(error);
    }
}


export const createRegla = async (req, res) => {
    try {
        const { nombre, contenido } = req.body;

        const data = { nombre, contenido };
        const newRegla = await forosModel.crearRegla(data);

        return (newRegla > 0) ? res.status(200).json({"message": "Regla creada correctamente"}) 
                              : res.status(400).json({"message": "No se pudo crear la regla"});
    } catch (error) {
        printMessage(error);
    }
}


export const deleteRegla = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await forosModel.eliminarRegla(id);

        return (deleted > 0) ? res.status(200).json({"message": "Regla eliminada correctamente"}) 
                              : res.status(400).json({"message": "No se pudo eliminada la regla"});
    } catch (error) {
        printMessage(error);
    }
}


export const getReglas = async (req, res) => {
    try {
        const reglas = await forosModel.getReglas();
        return res.status(200).json(reglas)
    } catch (error) {
        printMessage(error);
    }
}


export const agregarPalabra = async (req, res) => {
    try {
        const { palabras } = req.body; 

        const palabrasProhibidas = await forosModel.getPalabrasProhibidas();

        let palabrasAdded = palabrasProhibidas[0].contenido;

        palabras.forEach(async (palabra) => {
            if(!palabrasProhibidas[0].contenido.includes(palabra)) {
                palabrasAdded += ", " + palabra;
            }
        });

        const updatedPalabras = await forosModel.updatePalabrasProhibidas(palabrasAdded);

        if(updatedPalabras > 0) return res.status(200).json({"message": "Palabras agregadas correctamente"});
        return res.status(400).json({"message": "No se pudo agregar las palabras"});
    } catch (error) {
        printMessage(error);
    }
}

 
export const silenciarForo = async (req, res) => {
    try {
        const {id} = req.params;

        const silenciarForo = await forosModel.silenciarForo(id);

        if(silenciarForo) {
            return res.status(200).json({"message": "La accion se realizo correctamente"});
        }

        return res.status(400).json({"error": "No se pudo realizar la accion"});
        
    } catch (error) {
        printMessage(error);
    }
}

export const buscarForo = async (req, res) => {
    try {
        const { cc } = req.params;

        const foros = await forosModel.buscarForo(cc);

        return res.status(200).json(foros);
        
    } catch (error) {
        
    }
}