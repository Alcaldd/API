import * as subforoModel from "../models/subforo.model.js";

export const getComentarios = async (req, res) => {
    try {

        const { resena, tipo } = req.params;

        const subforo = await subforoModel.getSubforo(resena, tipo);

        if(subforo.length > 0) {
            const comentarios = await subforoModel.getComentarios(subforo[0].id);
            return res.status(200).json(comentarios);
        }
         
        return res.status(400).json({"error": "No se pudo encontrar el subforo"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const postComentario = async (req, res) => {
    try {
        const { resena, tipo } = req.params;

        const subforo = await subforoModel.getSubforo(resena, tipo);

        if(subforo[0].silenciado == 1) return res.status(400).json({error: "El subforo está silenciado"});

        if(subforo.length > 0) {
            const data = {
                subforo: subforo[0].id,
                usuario: req.id,
                comentario: req.body.comentario,
                imagen: req.imageUrl
            }

            if(tipo == 2){
                data.comentario = "";
            }

            const comentario = await subforoModel.createComentario(data);
            return res.status(200).json({message: "Comentario creado con éxito"});
        }

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const deleteComentario = async (req, res) => {
    try {
        const {id} = req.params;

        const comentario = await subforoModel.deleteComentario(id);

        if(comentario > 0) return res.status(200).json({message: "Comentario eliminado con éxito"});
        return res.status(400).json({error: "No se pudo eliminar el comentario"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const muteSubforum = async (req, res) => {
    try {
        
        const {id, tipo} = req.params;

        
        const subforo = await subforoModel.getSubforo(id, tipo);

        if(subforo[0].silenciado == 1){
            const unmute = await subforoModel.habilitarForo(id, tipo);
            if(unmute > 0) return res.status(200).json({message: "Subforo habilitado con éxito"});
        }

        const mute = await subforoModel.silenciarForo(id, tipo);

        if(mute > 0) return res.status(200).json({message: "Subforo silenciado con éxito"});

        return res.status(400).json({error: "No se pudo silenciar el subforo"});

    } catch (error) {
        return res.status(500).json({"error": error.message})
    }
}

export const likeComentario = async (req, res) => {
    try {
        const { mensaje, subforo } = req.params;
    
        const like = await subforoModel.likeComentario(mensaje, req.id, subforo);
    
        if(like > 0) return res.status(200).json({message: "Like agregado con éxito"});

        return res.status(400).json({error: "No se pudo agregar el like"})
    } catch (error) {
        return res.status(500).json({"error": error.message});
    }
}


export const likeReply = async (req, res) => {
    try {
        const { subforo } = req.params;
    
        const like = await subforoModel.likeReply(req.body.id_reply, req.id, subforo);
    
        if(like > 0) return res.status(200).json({message: "Like agregado con éxito"});

        return res.status(400).json({error: "No se pudo agregar el like"})
    } catch (error) {
        return res.status(500).json({"error": error.message});
    }
}


export const replyComentario = async (req, res) => {
    try {
        const { resena, tipo, comentario } = req.params;

        const subforo = await subforoModel.getSubforo(resena, tipo);

        if(subforo[0].silenciado == 1) return res.status(400).json({error: "El subforo está silenciado"});

        if(subforo.length > 0) {
            const data = {
                subforo: subforo[0].id,
                comentario: comentario,
                usuario: req.id,
                texto: req.body.texto,
                imagen: req.imageUrl
            }

            const reply = await subforoModel.replyComentario(data);
            return res.status(200).json({message: "Replica creada con éxito"});
        }

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const deleteReply = async (req, res) => {
    try {
        const {id} = req.params;

        const reply = await subforoModel.deleteReply(id);

        if(reply > 0) return res.status(200).json({message: "Replica eliminada con éxito"});

        return res.status(400).json({error: "No se pudo eliminar la replica"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
