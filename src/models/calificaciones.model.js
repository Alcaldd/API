import { connectDatabase } from '../database/db.js';


export const getCalificaciones = async (req, res) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones");

    connection.end();
    return result;
}


export const getCalificacionById = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_usuario = ?", [id]);

    connection.end();
    return result;
}

export const getCalificacionByResena = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_resena = ?", [id]);

    
    const calificacionMap = result.map((calificacion) => {
        return {
          id_resena: calificacion.id_resena,
          id_usuario: calificacion.id_usuario,
          gasolina: calificacion.gasolina,
          confiabilidad: calificacion.confiabilidad,
          confort: calificacion.confort,
          diseno: calificacion.diseno,
          manejo: calificacion.manejo,
        };
      });

      connection.end();
    return calificacionMap;
}

export const createCalificacion = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_usuario = ? && id_resena = ?", [data.id_usuario, data.id_resena]);
    let update = [];

    if(result.length == 0){
        [update] = await connection.query("INSERT INTO calificaciones (id_usuario, id_resena) VALUES (?, ?)", [data.id_usuario, data.id_resena]);
    }
    updateCalificacionResena(data);
    connection.end();
    return 1;
}

export const updateGasolina = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET gasolina = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    updateCalificacionResena(data);
    connection.end();
    return result;
}

export const updateConfiabilidad = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET confiabilidad = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    updateCalificacionResena(data);
    connection.end();
    return result;
}

export const updateManejo = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET manejo = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    updateCalificacionResena(data);
    connection.end();
    return result;
}

export const updateConfort = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET confort = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    updateCalificacionResena(data);
    connection.end();
    return result;
}

export const updateDiseño = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET diseno = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    updateCalificacionResena(data);
    connection.end();
    return result;
}

const updateCalificacionResena = async (data) => {
    const connection = await connectDatabase();

    // Sumar toda la tabla de calificaciones y dividir entre el numero de calificaciones

    const [usuariosCalificadores] = await connection.query("SELECT * FROM `calificaciones` WHERE id_resena = ?", [data.id_resena]);

    const sumarGasolina = usuariosCalificadores.reduce((a, b) => a + b.gasolina, 0);
    const sumarConfiabilidad = usuariosCalificadores.reduce((a, b) => a + b.confiabilidad, 0);
    const sumarConfort = usuariosCalificadores.reduce((a, b) => a + b.confort, 0);
    const sumarDiseno = usuariosCalificadores.reduce((a, b) => a + b.diseno, 0);
    const sumarManejo = usuariosCalificadores.reduce((a, b) => a + b.manejo, 0);

    const promedioGasolina = sumarGasolina / usuariosCalificadores.length;
    const promedioConfiabilidad = sumarConfiabilidad / usuariosCalificadores.length;
    const promedioConfort = sumarConfort / usuariosCalificadores.length;
    const promedioDiseno = sumarDiseno / usuariosCalificadores.length;
    const promedioManejo = sumarManejo / usuariosCalificadores.length;

    const promedioCalificacionTotal = Math.min(5, ((promedioGasolina + promedioConfiabilidad + promedioConfort + promedioDiseno + promedioManejo) / 5)).toFixed(1);

    const [result] = await connection.query("UPDATE resena SET calificaciones = ? WHERE id = ?", [promedioCalificacionTotal, data.id_resena]);

    connection.end();
    return result;
}