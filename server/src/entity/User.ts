import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Post } from './Post';
import { Post_comment } from './Post_comment';
import { Chat_message } from './Chat_message';
import { Post_like } from './Post_Like';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  @Column()
  mobile!: string;

  @Column()
  avatarRef!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;

  /* 관계 설정 */
  // User(1) <-> Post(N)
  @OneToMany((type) => Post, (posts) => posts.writer)
  posts!: Post[];

  // User(1) <-> Post_comment(N)
  @OneToMany((type) => Post_comment, (comments) => comments.writer)
  comments!: Post_comment[];

  // User(1) <-> Chat_message(N)
  @OneToMany((type) => Chat_message, (messages) => messages.writer)
  messages!: Chat_message[];

  //! User(1) <-> Post_like(N)
  // @OneToMany(type => Post_like, (liker => liker.user))
  // liker!: Post_like[]
}
