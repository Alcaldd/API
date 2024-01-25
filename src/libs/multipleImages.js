import multer from "multer";
import path from "path";

// Funciona para comprobar la extension del archivo
function getFileTypeByExtension(fileName) {
  const fileExtension = path.extname(fileName).toLowerCase();

  if (fileExtension === ".gif") {
    return "gif";
  } else if (fileExtension === ".png") {
    return "png";
  } else if (fileExtension === ".jpg" || fileExtension === ".jpeg") {
    return "jpg";
  } else {
    return "unknown";
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = getFileTypeByExtension(file.originalname);
    let uploadPath = "";

    if (
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "png" ||
      fileType === "gif"
    ) {
      // Crea una carpeta para cada tipo de archivo
      uploadPath = `images/`;
    } else {
      // Si el tipo de archivo es desconocido, guarda en 'uploads/unknown/'
      uploadPath = "images/unknown/";
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Cambia upload.single() a upload.array() para permitir múltiples archivos
const multiple = multer({ storage }); // Puedes cambiar 'images' al nombre de campo que desees y 5 es el número máximo de archivos permitidos en una solicitud

export const uploadImages = (imageFieldName) => {
  return (req, res, next) => {
    multiple.array(imageFieldName, 7)(req, res, (err) => {
      if (err) {
        return next(err);
      }
      // Construir un array de URLs de imágenes basadas en la configuración de storage
      const imageUrls = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/${file.path}`
      );

      req.imageUrls = imageUrls;

      // Continúa con el siguiente middleware o manejo de la ruta
      next();
    });
  };
};
