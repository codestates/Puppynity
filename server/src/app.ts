import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import connectionOptions from '../ormconfig';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

// const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/posts');
// const commentsRouter = require('./routes/comments');
// const postLikesRouter = require('./routes/postLikes');

// establish database connection
createConnection(connectionOptions)
  .then(() => {
    console.log('DB CONNECTION!');
  })
  .catch((error) => {
    console.log(error);
  });

// CORS options
const corsOptions = {
  Headers: { 'content-type': 'application/json' },
  origin: true,
  method: ['post', 'get', 'delete', 'options'],
  credentials: true,
};

// create and setup express app
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// register routes
// app.use('/auth', authRouter);
app.use('/users', usersRouter);
// app.use('/posts', postsRouter);
// app.use('/comments', commentsRouter);
// app.use('/post-likes', postLikesRouter);

app.get('/', (req, res) => {
  console.log('/루트 GET 요청!');
  res.status(200).send('Hello Puppynity');
});

app.listen(8080, () => {
  console.log(`server listening on ${8080}`);
});
// export default app;
