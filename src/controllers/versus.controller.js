import * as versusModel from '../models/versus.model.js';
import debug from 'debug';

const printMessage = debug('app:versus-controller');


export const createVersus = async (req, res) => {
    try {
        const formData = req.body;

        // Crear un objeto asociativo a partir de formData
        const formDataObject = {};

        for (const [key, value] of Object.entries(formData)) {
        formDataObject[key] = value;
        }


        const resenas = JSON.parse(formDataObject.resenas);
        const data = {
            imagen: req.imageUrl,
            coche1: resenas[0],
            coche2: resenas[1]
        }

        const newVersus = await versusModel.createVersus(data);
        printMessage('Versus creado correctamente');
        if(newVersus > 0) return res.status(200).json({"message": "Versus creado correctamente"});

        return res.status(403).json({"error": "Error al crear el versus"})
    } catch (error) {
        printMessage(error);
    }
} 


export const createVersusComentarios = async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;

        // Crear un objeto asociativo a partir de formData

        const formDataObject = {};

        for (const [key, value] of Object.entries(formData)) {
        formDataObject[key] = value;
        }

        const data = {
            id_versus: id,
            id_usuario: req.id,
            mensaje: formDataObject.mensaje,
            imagen: req.imageUrl
        }

        const newVersus = await versusModel.createVersusComentarios(data);

        if(newVersus > 0) return res.status(200).json({"message": "Comentario creado correctamente"});
        return res.status(403).json({"error": "Error al crear el comentario"})
    } catch (error) {
        printMessage(error);
    }
}

export const getVersus = async (req, res) => {
    try {
        const foundVersus = await versusModel.getVersus();
        printMessage('Versus obtenidos correctamente');
        return res.status(200).json(foundVersus);
    } catch (error) {
        printMessage(error);
    }
}

export const eliminarVersusComentario = async (req, res) => {
    try {
        const {id} = req.params;

        const deleted = await versusModel.eliminarVersusComentario(id);

        if(deleted > 0) return res.status(200).json({"message": "Comentario eliminado correctamente"});
        return res.status(403).json({"error": "Error al eliminar el comentario"})
    } catch (error) {
        printMessage(error);
    }
}

export const getVersusById = async (req, res) => {
    try {
        const foundVersus = await versusModel.getVersusById(req.params.id);
        const foundComentarios = await versusModel.getVersusComentarios(req.params.id);
        printMessage('Versus obtenido correctamente');
        return res.status(200).json({versus: foundVersus, comentarios: foundComentarios});
    } catch (error) {
        printMessage(error);
    }
}


export const getVotosInVersus = async (req, res) => {
    try {
        const votos = await versusModel.getVotosInVersus(req.params.id);
        printMessage('Votos obtenidos correctamente');
        return res.status(200).json(votos);
    } catch (error) {
        printMessage(error);
    }
}

export const votarVersus = async (req, res) => {
    try {
        const data = { id_versus: req.params.id, id_coche: req.body.id_coche, id_usuario: req.id };

        const votoExist = await versusModel.getVotoById(data.id_versus, data.id_usuario);

        if(votoExist.length > 0) return res.status(400).json({"error": "No puedes votar dos veces"})

        const newVoto = await versusModel.voteVersus(data);

        printMessage('Voto realizado correctamente');
        if(newVoto > 0) return res.status(200).json({"message": "Voto realizado correctamente"});
    } catch (error) {
        printMessage(error);
    }
}


export const actualizarVoto = async (req, res) => {
    try {
        const data = { id_coche: req.body.id_coche, id_usuario: req.id };
        const newVoto = await versusModel.updateVotoById(req.params.id, data);

        printMessage('Voto realizado correctamente');
        if(newVoto > 0) return res.status(200).json({"message": "Voto realizado correctamente"});
    } catch (error) {
        printMessage(error);
    }
}

export const getVotoById = async (req, res) => {
    try {
        const foundVoto = await versusModel.updateVotoById(req.params.id ,req.id);

        return foundVoto;
    } catch (error) {
        printMessage(error);
    }
}