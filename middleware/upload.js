"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var multer = require('multer');
// Configure storage using multer.diskStorage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/post-images');
    },
    filename: function (req, file, cb) {
        var fileName = "post-".concat(Date.now(), "-").concat(file.originalname);
        cb(null, fileName);
    },
});
// Create multer instance for file upload
var upload = multer({ storage: storage });
module.exports = { upload: upload };
