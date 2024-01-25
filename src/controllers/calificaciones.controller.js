import * as calificacionesModel from "../models/calificaciones.model.js";
import Debug from "debug";
const printMessage = Debug("app:calificaciones-controller");

export const getCalificaciones = async (req, res) => {
  try {
    const calificaciones = await calificacionesModel.getCalificaciones();
    printMessage("Se accedio a las calificaciones");
    return res.status(200).json(calificaciones);
  } catch (error) {
    printMessage(error);
  }
};

export const getCalificacionById = async (req, res) => {
  try {
    const calificacion = await calificacionesModel.getCalificacionById(
      req.params.id
    );
    

    // Mapear nuevo arreglo con objetos {id_resena,id_usuario,puntaje,tipo}

    const calificacionMap = calificacion.map((calificacion) => {
      return {
        id_resena: calificacion.id_resena,
        id_usuario: calificacion.id_usuario,
        gasolina: calificacion.gasolina,
        confiabilidad: calificacion.confiabilidad,
        confort: calificacion.confort,
        diseño: calificacion.diseño,
        manejo: calificacion.manejo,
      };
    });

    printMessage("Se accedio a la calificacion");

    return res.status(200).json(calificacionMap);

  } catch (error) {
    printMessage(error);
  }
};

export const createCalificacion = async (req, res) => {
  try {
    const data = {
      id_usuario: req.id,
      id_resena: req.body.id_resena,
      tipo: req.body.tipo,
      puntaje: req.body.puntaje,
    };

    const newCalificacion = await calificacionesModel.createCalificacion(data);

    if (newCalificacion > 0) {
      switch (data.tipo) {
        case 1:
          await calificacionesModel.updateGasolina(data);
          break;
        case 2:
          await calificacionesModel.updateConfiabilidad(data);
          break;
        case 3:
          await calificacionesModel.updateConfort(data);
          break;
        case 4:
          await calificacionesModel.updateDiseño(data);
          break;
        case 5:
          await calificacionesModel.updateManejo(data);
          break;
        default: break;
      }
    }

    return res.status(200).json({ message: "Calificaste una reseña" });

    
  } catch (error) {
    printMessage(error);
  }
};
