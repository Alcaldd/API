import mysql from 'mysql2/promise';
import { connectDatabase } from '../database/db.js';
import * as registroModel from './registro.model.js';

export const getReportes = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT u.nombre, r.id, r.id_usuario, r.id_foro, r.id_articulo, r.id_resena, r.id_reportante, r.motivo FROM reportes as r INNER JOIN usuarios as u ON r.id_usuario = u.id');
    
    connection.end();
    return result;
}


export const createReporte = async (data) => {
    const connection = await connectDatabase();
    const query = 'INSERT INTO reportes(id_usuario, id_foro, id_articulo, id_resena, id_reportante, motivo) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [data.id_usuario, data.id_foro, data.id_articulo, data.id_resena, data.id_reportante, data.motivo]);

    connection.end();
    return result;
}


export const deleteReporte = async (id, moderador) => {
    const connection = await connectDatabase();
    const query = 'DELETE FROM reportes WHERE id = ?';

    const [result] = await connection.execute(query, [id]);

    connection.end();
    return result.affectedRows;
}