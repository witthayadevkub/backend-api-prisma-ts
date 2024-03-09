"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require('cookie-parser');
const express_1 = __importDefault(require("express"));
const cors = require('cors');
var logger = require('morgan');
// const path = require('path');
// routes
const post = require('../router/post');
const user = require('../router/user');
const auth = require('../router/auth');
// const s  = require('../images')
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
const app = (0, express_1.default)();
// express config
app.use(express_1.default.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/img', express_1.default.static('images'));
// routes
app.use('/api', post);
app.use('/api', user);
app.use('/api', auth);
app.get('/', (req, res) => {
    res.json({ message: 'api at /api/user and /api/post' });
});
app.listen(process.env.POST || 5000, () => {
    console.log('Server started on port 3000');
});
