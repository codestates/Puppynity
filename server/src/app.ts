import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import connectionOptions from '../ormconfig';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

// import { Socket } from 'socket.io';
import { Message } from './middlewares/message';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Post_comment } from './entity/Post_comment';
// router 이름 복수로?
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
// const postLikesRouter = require('./routes/postLikes');

// establish database connection
createConnection(connectionOptions)
  .then(async () => {
    console.log('DB CONNECTION!');

    // test 계정 삽입
    const user = new User();
    user.email = 'test@test.com';
    user.password = 'asdf1234!';
    user.name = 'test';
    user.nickname = 'test';
    user.mobile = '01012345678';
    user.signupType = 'email';
    await user.save();

    // test post 삽입
    const post = new Post();
    post.title = '테스트 게시글 제목';
    post.content = '테시트 게시글 본문';
    post.category = 'Q&A';
    post.writer = user;
    await post.save();

    // test comment 삽입
    const comment = new Post_comment();
    comment.content = '테스트 댓글 1';
    comment.writer = user;
    comment.post = post;
    await comment.save();
  })
  .catch((error) => {
    console.log(error);
  });

// CORS options
const corsOptions = {
  Headers: { 'content-type': 'application/json' },
  //origin: ['https://puppynity.gq','https://www.puppynity.gq'],
  origin: 'http://localhost:3000',
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
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
// app.use('/post-likes', postLikesRouter);

app.get('/', (req, res) => {
  console.log('/루트 GET 요청!');
  res.status(200).send('Hello Puppynity');
});

app.listen(8080, () => {
  console.log(`server listening on 8080`);
});

// export default app;
// const http = require('http');

// const server = http.createServer(app);
// const socketIO = require('socket.io');

// const port = 4000;

// const io = socketIO(server, {
//   cors: {
//     //origin:['https://puppynity.gq','https://www.puppynity.gq'],
//     origin: 'http://localhost:3000',
//     methods: ['POST', 'GET'],
//     credentials: true,
//   },
// });

// io.on('connection', (socket: Socket) => {
//   console.log(`소켓 연결 ${socket.id}`);

//   socket.on('join_room', (data) => {
//     socket.join(data);
//     console.log(`user id : ${socket.id} room id ${data}`);
//   });

//   socket.on('message', (message: Message) => {
//     io.emit('message', JSON.stringify(message));
//   });

//   socket.on('disconnect', () => {
//     console.log('disconnected', socket.id);
//   });
// });
