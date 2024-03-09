import type { Request, Response, Application } from 'express';
const cookieParser = require('cookie-parser');
import express from 'express';
const cors = require('cors');
var logger = require('morgan');
const path = require('path');
// routes
const post = require('../router/post')
const user = require('../router/user')
const auth = require('../router/auth')
// const s  = require('../images')
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const app: Application = express();

// express config
app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/img', express.static('images'))

// routes
app.use('/api',post)
app.use('/api',user)
app.use('/api',auth)

app.get('/', (req: Request, res: Response) => {
    res.json({message:'api at /api/user and /api/post'})
})



app.listen(process.env.POST || 5000, () => {
  console.log('Server started on port 3000');
});