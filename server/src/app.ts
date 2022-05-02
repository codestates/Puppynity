import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const postLikesRouter = require('./routes/postLikes');

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err);
  });

// create and setup express app
const app = express();
app.use(express.json());

// register routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/post-likes', postLikesRouter);

// start express server
app.listen(process.env.DATABASE_PORT);
