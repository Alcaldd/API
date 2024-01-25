import * as articulosModel from '../models/articulos.model.js';
import debug from 'debug';
import * as config from "../libs/config.js";
import jwt from 'jsonwebtoken';
const printMessage = debug('app:articulosController');


export const listarArticulos = async (req, res) => {
    try {        
        const articulos = await articulosModel.listarArticulos();
        printMessage('Se listaron los articulos correctamente');
        if(articulos) return res.status(200).json(articulos);
    } catch (error) {
        printMessage(error);
    }
}


export const verArticulo = async (req, res) => {
    try {        
        const articulo = await articulosModel.verArticulo(req.params.id);
        printMessage('Se listo un articulo correctamente');
        if(articulo) return res.status(200).json(articulo);
    } catch (error) {
        printMessage(error);
    }
}

export const crearArticulo = async (req, res) => {
    try {
        const formData = req.body;

        // Crear un objeto asociativo a partir de formData
        const formDataObject = {};

        for (const [key, value] of Object.entries(formData)) {
        formDataObject[key] = value;
        }

        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, config.secret);

        const data = { 
                       id_usuario: decoded.id,
                       titulo: formDataObject.titulo,
                       subtitulo: formDataObject.subtitulo, 
                       contenido: formDataObject.contenido, 
                        portada: req.imageUrl
                    };

        const newArticulo = await articulosModel.crearArticulo(data);

        printMessage('Se intento crear un articulo');
        if(newArticulo > 0) return res.status(200).json({ message: 'Articulo creado correctamente' });

        return res.status(400).json({error: 'No se pudo crear el articulo'});
    } catch (error) {
        printMessage(error);
    }
}


export const eliminarArticulo = async (req, res) => {
    try {
        const deletedArticulo = await articulosModel.eliminarArticulo(req.params.id);

        printMessage('Se intento eliminar un articulo');
        if(deletedArticulo > 0) return res.status(200).json({ "message": 'Articulo eliminado correctamente' });

        return res.status(400).json({"error": "Un error ha ocurrido"});
        
    } catch (error) {
        printMessage(error);
    }
}

export const buscarArticulo = async (req, res) => {
    try {
        const { cc } = req.params;

        const foundArticulo = await articulosModel.buscarArticulo(cc);

        return res.status(200).json(foundArticulo);

    } catch (error) {
        printMessage(error)
    }
}