import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import connectionOptions from '../ormconfig';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { Socket } from 'socket.io';
import { Message } from './middlewares/message';


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
  origin:['http://localhost:3000'],
  //origin: ['https://puppnity.gq','https://www.puppynity.gq'],
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

app.listen(4000, () => {
  console.log(`server listening on ${4000}`);
});
export default app;

const http=require('http');

const server= http.createServer(app);
const socketIO=require('socket.io');

const port=4000;

    const io = socketIO(server,{
    cors:{
        //origin:['https://puppnity.gq','https://www.puppynity.gq'],
        origin:['http://localhost:3000'],
        methods:['POST','GET'],
        credentials:true,
    }
});

io.on('connection',(socket:Socket)=>{
    console.log(`소켓 연결 ${socket.id}`);
    
    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log(`user id : ${socket.id} room id ${data}`);
    });

    socket.on('message',(message:Message)=>{
        io.emit('message',JSON.stringify(message));
    })

    socket.on('disconnect',()=>{
        console.log('disconnected',socket.id);
    })
})

