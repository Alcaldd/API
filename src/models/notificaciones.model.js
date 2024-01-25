import { connectDatabase } from "../database/db.js";

export const getNotificaciones = async (id) => {
    const connection = await connectDatabase();
    const [notificaciones] = await connection.execute('SELECT * FROM notificaciones WHERE id_usuario = ?', [id]);

    connection.end();
    return notificaciones;
};

export const deleteNotificacion = async (id) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM notificaciones WHERE id = ?', [id]);

    connection.end();
    return deleted.affectedRows;
}

export const createNotificacion = async (id, mensaje) => {
    const connection = await connectDatabase();
    const [created] = await connection.query('INSERT INTO notificaciones (id_usuario, mensaje) VALUES (?, ?)', [id, mensaje]);

    connection.end();
    return created.affectedRows;
}