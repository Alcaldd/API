import { connectDatabase } from '../database/db.js';

export const getComunicados = async () => {
    const connection = await connectDatabase();
    const [rows] = await connection.execute('SELECT c.titulo, c.mensaje, u.nombre, c.id, c.fecha FROM comunicados AS c INNER JOIN usuarios AS u ON c.id_autor = u.id ORDER BY c.id DESC LIMIT 1;');

    connection.end();
    return rows;
}

export const createComunicado = async (data) => {
    const connection = await connectDatabase();
    const [rows] = await connection.execute('INSERT INTO comunicados(id_autor,titulo,mensaje) VALUES (?,?,?)', [data.id_autor, data.titulo, data.mensaje]);

    connection.end();
    return rows.affectedRows;
}
