import * as listasModel from '../models/listas.model.js';
import debug from 'debug';
const printMessage = debug('app:listas-controller');


export const createLista = async (req, res) => {
    try {
        const formData = req.body;

        // Crear un objeto asociativo a partir de formData
        const formDataObject = {};

        for (const [key, value] of Object.entries(formData)) {
        formDataObject[key] = value;
        }

        const data = {
            titulo: formDataObject.titulo,
            subtitulo: formDataObject.subtitulo,
            imagen: req.imageUrl,
            resenas: JSON.parse(formDataObject.resenas)
        }

        const newLista = await listasModel.createLista(data);

        printMessage('Lista creada correctamente')
        if(newLista > 0) return res.status(200).json({"message": "Lista creada correctamente"});

        return res.status(403).json({"error": "Error al crear la lista"})
    } catch (error) {
        printMessage(error);
    }
} 


export const getListaById = async (req, res) => {
    try {
        const {id} = req.params;
        const lista = await listasModel.getListaById(id);
        printMessage('Se accedio a la lista correctamente');
        return res.status(200).json(lista);
    } catch (error) {
        printMessage(error);
    }
}

export const getListas = async (req, res) => {
    try {
        const listas = await listasModel.getListas();
        printMessage('Se accedio a las listas correctamente')
        return res.status(200).json(listas);
    } catch (error) {
        printMessage(error);
    }
}

export const deleteListaById = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await listasModel.deleteListaById(id);

        printMessage('Se elimino una lista correctamente')
        if(deleted > 0) return res.status(200).json({"message": "Lista eliminada correctamente"});
    } catch (error) {
        printMessage(error);
    }
}

export const buscarListas = async (req, res) => {
    try {
        
        const {cc} = req.params;
        const listas = await listasModel.buscarListas(cc);
        printMessage('Se accedio a las listas correctamente')
        return res.status(200).json(listas);

    } catch (error) {
        printMessage(error)
    }
}