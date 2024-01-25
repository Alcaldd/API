import { connectDatabase } from "../database/db.js";


export const createForo = async (data) => {
    const connection = await connectDatabase();
    const [newForo] = await connection.query('INSERT INTO foros(id_usuario, titulo) VALUES (?, ?)', [data.id_usuario, data.titulo]);

    connection.end();
    return newForo.affectedRows;
}

export const getForoByName = async (name) => {
    const connection = await connectDatabase();
    const [foro] = await connection.query('SELECT * FROM foros WHERE titulo = ?', [name]);

    connection.end();
    return foro;

}

export const listarForos = async () => {
    const connection = await connectDatabase();
    const [foros] = await connection.query('SELECT f.id AS foro_id, u.id AS autor_id, u.nombre AS autor_nombre, f.titulo AS foro_titulo FROM foros AS f INNER JOIN usuarios AS u ON u.id = f.id_usuario');

    connection.end();
    return foros;
}

export const deleteMensaje = async (data) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM mensajes WHERE id = ?', [data.id]);

    connection.end();
    return deleted.affectedRows;
}
export const deleteReply = async (data) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM mensajes_replica WHERE id = ?', [data.id]);

    connection.end();
    return deleted.affectedRows;
}


export const likeReply = async (data) => {
    const connection = await connectDatabase();

    const [userHasLiked] = await connection.query('SELECT * FROM mensaje_reply_likes WHERE id_votante = ? AND id_reply = ? AND id_foro = ?', [data.id_votante, data.id_reply, data.id_foro]);

    if(userHasLiked.length > 0) {
        // Delete message
        const [deleted] = await connection.query('DELETE FROM mensaje_reply_likes WHERE id_votante = ? AND id_reply = ? AND id_foro = ?', [data.id_votante, data.id_reply, data.id_foro]);
        return deleted.affectedRows;
    }

    const [insertLike] = await connection.query('INSERT INTO mensaje_reply_likes(id_votante, id_reply, id_foro) VALUES (?, ?, ?)', [data.id_votante, data.id_reply, data.id_foro]);

    connection.end();
    return insertLike.affectedRows;
}


export const listarForo = async (id) => {
    const connection = await connectDatabase();
    const [messages] = await connection.query('SELECT m.id,u.nombre,m.mensaje,m.id_usuario,m.imagen FROM mensajes AS m INNER JOIN usuarios AS u ON u.id = m.id_usuario  WHERE id_foro = ?', [id]);
    const [replys] = await connection.query('SELECT mr.id, u.nombre, mr.mensaje, mr.id_usuario, mr.imagen, mr.id_mensaje FROM mensajes_replica AS mr INNER JOIN usuarios AS u ON u.id = mr.id_usuario WHERE id_foro = ?', [id]);
    const [likes] = await connection.query('SELECT * FROM mensajes_likes WHERE id_foro = ?', [id]);
    const [likesReplys] = await connection.query('SELECT * FROM mensaje_reply_likes WHERE id_foro = ?', [id]);

    connection.end();
    return [messages, replys, likes, likesReplys];
}

export const getForoEstado = async(id) => {
    const connection = await connectDatabase();
    const [estado] = await connection.query('SELECT estado FROM foros WHERE id = ?', [id]);

    connection.end();
    return estado;
}

export const createLike = async (data) => {
    const connection = await connectDatabase();

    const [userHasLiked] = await connection.query('SELECT * FROM mensajes_likes WHERE id_votante = ? AND id_mensaje = ? AND id_foro = ?', [data.id_votante, data.id_mensaje, data.id_foro]);

    if(userHasLiked.length > 0) {
        // Delete message
        const [deleted] = await connection.query('DELETE FROM mensajes_likes WHERE id_votante = ? AND id_mensaje = ? AND id_foro = ?', [data.id_votante, data.id_mensaje, data.id_foro]);
        return deleted.affectedRows;
    }

    const [insertLike] = await connection.query('INSERT INTO mensajes_likes(id_votante, id_mensaje, id_foro) VALUES (?, ?, ?)', [data.id_votante, data.id_mensaje, data.id_foro]);

    connection.end();
    return insertLike.affectedRows;
}

export const createMensaje = async (data) => {
    const connection = await connectDatabase();
    const [newMessage] = await connection.query('INSERT INTO mensajes(id_usuario, id_foro, mensaje, imagen) VALUES (?, ?, ?, ?)', [data.id_usuario, data.id_foro, data.mensaje, data.imagen]);

    connection.end();
    return newMessage.affectedRows;
}


export const createReply = async (data) => {
    const connection = await connectDatabase();
    const [newMessage] = await connection.query('INSERT INTO mensajes_replica(id_usuario, id_mensaje, id_foro, mensaje, imagen) VALUES (?, ?, ?, ?, ?)', [data.id_usuario, data.id_mensaje, data.id_foro, data.mensaje, data.imagen]);

    connection.end();
    return newMessage.affectedRows;
}

export const eliminarForo = async (id) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM foros WHERE id = ?', [id]);

    connection.end();
    return deleted.affectedRows;
}


export const crearRegla = async (data) => {
    const connection = await connectDatabase();
    const [newRegla] = await connection.query('INSERT INTO reglas(nombre, contenido) VALUES (?, ?)', [data.nombre, data.contenido]);

    connection.end();
    return newRegla.affectedRows;
}


export const eliminarRegla = async (id) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM reglas WHERE id = ?', [id]);

    connection.end();
    return deleted.affectedRows;
}

export const getReglas = async () => {
    const connection = await connectDatabase();
    const [rows] = await connection.query('SELECT * FROM reglas');
    
    connection.end();
    return rows;
}

export const getPalabrasProhibidas = async () => {
    const connection = await connectDatabase();
    const [rows] = await connection.query('SELECT contenido FROM reglas WHERE nombre = "Palabras"');
    
    connection.end();
    return rows;
}

export const updatePalabrasProhibidas = async (data) => {
    const connection = await connectDatabase();
    const [updated] = await connection.query('UPDATE reglas SET contenido = ? WHERE nombre = "Palabras"', [data]);
    
    connection.end();
    return updated.affectedRows;
} 

export const silenciarForo = async (id) => {
    const connection = await connectDatabase();
    const [isSilenced] = await connection.query('SELECT estado FROM foros WHERE id = ?', [id]);
    let estado = (isSilenced[0].estado === 0) ? 1 : 0;
    const [silenciado] = await connection.query('UPDATE foros SET estado = ? WHERE id = ?', [estado, id]);

    connection.end();
    return silenciado.affectedRows;
}

export const buscarForo = async (param) => {
    const connection = await connectDatabase();
    const [searchResult] = await connection.query('SELECT f.id AS foro_id, u.id AS autor_id, u.nombre AS autor_nombre, f.titulo AS foro_titulo FROM foros AS f INNER JOIN usuarios AS u ON u.id = f.id_usuario WHERE f.titulo LIKE ?', ['%' + param + '%']);

    connection.end();
    return searchResult;
}