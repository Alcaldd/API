import * as comunicadosModel from '../models/comunicados.model.js';

export const getComunicados = async (req, res) => {
    const comunicados = await comunicadosModel.getComunicados();
    return res.status(200).json(comunicados);
}

export const createComunicado = async (req, res) => {
    const { titulo, mensaje } = req.body;

    if(titulo == null || mensaje == null) return res.status(400).json({ error: 'Faltan datos' });
    if(titulo.trim() == '' || mensaje.trim() == '') return res.status(400).json({ error: 'Faltan datos' });

    const data = { id_autor: req.id, titulo: titulo, mensaje: mensaje };
    const result = await comunicadosModel.createComunicado(data);
    if(result > 0) return res.status(200).json({ message: 'Comunicado creado' });
}