import { connectDatabase } from "../database/db.js";

export const listarQuejas = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT u.nombre, q.id, q.mensaje FROM quejas as q INNER JOIN usuarios as u ON q.usuario_id = u.id');
     
    connection.end();
    return result;
}

export const createQueja = async (data) => {
    const connection = await connectDatabase();
    const query = 'INSERT INTO quejas (usuario_id, mensaje) VALUES (?, ?)'; 
    const [result] = await connection.execute(query, [data.usuario_id, data.mensaje]);

    connection.end();
    return result;
}

export const deleteQueja = async (id) => {
    const connection = await connectDatabase();
    const query = 'DELETE FROM quejas WHERE id = ?';
    const [result] = await connection.execute(query, [id]);

    connection.end();
    return result.affectedRows;
}