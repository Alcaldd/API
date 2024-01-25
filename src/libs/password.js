import { connectDatabase } from '../database/db.js';
import bcrypt from 'bcrypt';

export async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function comparePassword(password, correo){
    const connection = await connectDatabase();
    const query = 'SELECT contraseña FROM usuarios WHERE correo = ?';

    const [result] = await connection.execute(query, [correo]);

    if(result.length < 1) return false;

    const encryptedPassword = result[0].contraseña;

    const compare = await bcrypt.compare(password, encryptedPassword);

    connection.end();
    return compare;
}
