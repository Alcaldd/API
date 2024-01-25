import multer from "multer";
import path from "path";
import fs from "fs";

// Funciona para comprobar la extension del archivo
function getFileTypeByExtension(fileName) {
  const fileExtension = path.extname(fileName).toLowerCase();

  switch (fileExtension) {
    case ".gif":
      return "gif";
    case ".png":
      return "png";
    case ".jpg":
    case ".jpeg":
      return "jpg";
    case ".mp4":
      return "mp4";
    case ".mp3":
      return "mp3";
    case ".pdf":
      return "pdf";
    case ".doc":
    case ".docx":
      return "doc";
    case ".xls":
    case ".xlsx":
      return "xls";
    case ".ppt":
    case ".pptx":
      return "ppt";
    default:
      return "unknown";
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = getFileTypeByExtension(file.originalname);
    let uploadPath = "";

    if (fileType != "unknown") {
      // Crea una carpeta para cada tipo de archivo
      uploadPath = `images/chat/`;
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

const upload = multer({ storage });


export const uploadFile = (fileFieldName) => {
    return (req, res, next) => {
      upload.single(fileFieldName)(req, res, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }


        // Construir la URL de la imagen basada en la configuración de storage
        const fileLink = `${req.protocol}://${req.get('host')}/images/chat/${req.file.filename}`;
        
        if(req.file.size > 1000000) {
          fs.unlinkSync(req.file.path)
          return res.status(400).json({"error": "El archivo supera el limite de tamaño permitido."})
        };
  
        req.filePath = req.file.path;
        req.imageBlankUrl = req.file.filename;
        req.fileURL = fileLink;
        req.filetype = getFileTypeByExtension(req.file.filename);
  
        // Continúa con el siguiente middleware o manejo de la ruta
        next();
      });
    };
  };

export const handleUpload = (io) => {
  return (req, res) => {
    // Lógica para manejar la subida de archivos y emitir el evento 'image'
    io.emit("image", { filename: req.fileURL, filepath: req.filePath, filetype: req.filetype });
    res.status(200).json({ message: "Archivo subido correctamente" })
  }  
}