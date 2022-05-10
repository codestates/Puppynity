import express, { Request, Response } from 'express'
import { createConnection, useContainer } from 'typeorm'
import connectionOptions from '../ormconfig'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

import { Socket } from 'socket.io'
import { Message } from './middlewares/message'
import { User } from './entity/User'
import { Post } from './entity/Post'
import { Post_comment } from './entity/Post_comment'
import { Chat_message } from './entity/Chat_message'
// router 이름 복수로?
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
// const postLikesRouter = require('./routes/postLikes');

// establish database connection
createConnection(connectionOptions)
  .then(async () => {
    console.log('DB CONNECTION!')
  })
  .catch((error) => {
    console.log(error)
  })

// CORS options
const corsOptions = {
  Headers: { 'content-type': 'application/json' },
  //origin: ['https://puppynity.gq','https://www.puppynity.gq'],
  origin: 'http://localhost:3000',
  method: ['post', 'get', 'delete', 'options'],
  credentials: true,
}

// create and setup express app
const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// register routes
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
// app.use('/post-likes', postLikesRouter);
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  console.log('/루트 GET 요청!')
  res.status(200).send('Hello Puppynity')
})

// app.listen(4000, () => {
//   console.log(`server listening on 4000`);
// });

export default app
const http = require('http')

const server = http.createServer(app)
const socketIO = require('socket.io')

const port = 4000
//!_---------------------------------------------
const io = socketIO(server, {
  cors: {
    //origin:['https://puppynity.gq','https://www.puppynity.gq'],
    origin: true,
    methods: ['POST', 'GET'],
    credentials: true,
    transports: ['websocket'],
  },
})

io.on('connection', (socket: Socket) => {
  console.log(`소켓 연결 ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`user id : ${socket.id} room id ${data}`)
  })
  //!
  // socket.on('message', (message) => {
  //   socket.to(message.id).emit('receive_message', message.message);
  //   //io.emit('message', JSON.stringify(message));
  //   console.log('메세지 :', message.message);
  // });

  socket.on('message', async (data) => {
    console.log(data)
    socket.to(data.id).emit('received_message', data.message)
    const chatMessage = await Chat_message.create({
      id: data.id,
      userId: 1,
      username: '1',
      chatroom: '1',
      message: data.message,
      // createdAt:''
    })
    await chatMessage.save()
  })

  socket.on('disconnect', (reason) => {
    console.log('disconnected', socket.id)
    console.log('disconnect reason: ', reason)
  })
})

server.listen(port, () => {
  console.log(`${port}`)
})
