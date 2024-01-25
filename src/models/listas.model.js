import { connectDatabase } from "../database/db.js"

export const getListas = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM listas");

    connection.end();
    return result;
}

export const getListaById = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM listas WHERE id = ?", [id]);
    const [cars] = await connection.query("SELECT * FROM resena INNER JOIN coches ON resena.id = coches.resena_id WHERE coches.lista_id = ?", [id]);

    connection.end();
    return [result, cars];
}

export const deleteListaById = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("DELETE FROM listas WHERE id = ?", [id]);
    const [deletedCars] = await connection.query("DELETE FROM coches WHERE lista_id = ?", [id]);

    connection.end();
    return result.affectedRows;
}

export const createLista = async (data) => {
    const connection = await connectDatabase();

    const [newLista] = await connection.query("INSERT INTO listas(titulo, subtitulo, imagen) VALUES (?,?,?)", [data.titulo, data.subtitulo, data.imagen]);

    data.resenas.forEach(async (res) => {
        await connection.query("INSERT INTO coches(resena_id, lista_id) VALUES (?,?)", [res, newLista.insertId]);
    })

    connection.end();
    return newLista.affectedRows;
}


export const buscarListas = async (cc) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM listas WHERE titulo LIKE ?", [`%${cc}%`]);

    connection.end();
    return result;

}   