import { connectDatabase } from "../database/db.js";
import debug from "debug";
const printMessage = debug("app:strikes-model");

export const addRegistro = async (tipo, descripcion, sancionado, moderador) => {
  const connection = await connectDatabase();
  const [result] = await connection.execute(
    "INSERT INTO registro (tipo_sancion, razon, id_sancionado, id_moderador) VALUES (?, ?, ?, ?)",
    [tipo, descripcion, sancionado, moderador]
  );

  
  connection.end();
  return result.affectedRows;
};

export const getRegistros = async () => {
  const connection = await connectDatabase();
  const [result] = await connection.execute(`SELECT 
  r.id, 
  r.tipo_sancion, 
  r.id_sancionado, 
  u_sancionado.nombre AS nombre_sancionado, 
  r.razon, 
  r.id_moderador, 
  u_moderador.nombre AS nombre_moderador
FROM 
  registro AS r
INNER JOIN 
  usuarios AS u_sancionado ON u_sancionado.id = r.id_sancionado
INNER JOIN 
  usuarios AS u_moderador ON u_moderador.id = r.id_moderador
ORDER BY 
  r.id DESC;`);

  
  connection.end();
  return result;
};
