import { Request } from 'express';
import multer, { Multer } from 'multer';

// Define la interfaz UploadedFile extendiendo la interfaz de archivo de Multer
interface UploadedFile extends Express.Multer.File {}

// Configuración de almacenamiento de multer
const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: UploadedFile, cb: Function) {
        cb(null, './images/post-images');
    },
    filename: function (req: Request, file: UploadedFile, cb: Function) {
        const fileName = `post-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

// Configurar multer con la configuración de almacenamiento
const upload: Multer = multer({ storage: storage });

export { upload };
