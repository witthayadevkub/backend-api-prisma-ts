import { Request } from 'express';


// const multer = require('multer');
// const { Multer } = require('multer');



// interface UploadedFile extends Express.Multer.File {}


// const storage: multer.StorageEngine = multer.diskStorage({
//     destination: function (req: Request, file: UploadedFile, cb: Function) {
//         cb(null, './images/post-images');
//     },
//     filename: function (req: Request, file: UploadedFile, cb: Function) {
//         const fileName = `post-${Date.now()}-${file.originalname}`;
//         cb(null, fileName);
//     },
// });

// const upload: Multer = multer({ storage: storage });

// export { upload };

// const  Request  = require('express');
const multer = require('multer');

// Define the interface for UploadedFile
interface UploadedFile extends Express.Multer.File {}

// Configure storage using multer.diskStorage
const storage = multer.diskStorage({
    destination: function (req: Request, file: UploadedFile, cb: Function) {
        cb(null, './images/post-images');
    },
    filename: function (req: Request, file: UploadedFile, cb: Function) {
        const fileName = `post-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

// Create multer instance for file upload
const upload = multer({ storage });

module.exports = { upload };

