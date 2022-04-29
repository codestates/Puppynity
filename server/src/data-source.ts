import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entity/User';
import { Post } from './entity/Post';
import { Post_comment } from './entity/Post_comment';
import { Post_like } from './entity/Post_Like';
import { Chatroom } from './entity/Chatroom';
import { Chat_message } from './entity/Chat_message';

import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  // migrations: [],
  // subscribers: [],
});
