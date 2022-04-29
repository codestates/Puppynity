import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from './User';
import { Chat_message } from './Chat_message';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roomName!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;

  /* 관계 설정 */
  // Chatroom(1) <-> Chat_message(N)
  @OneToMany((type) => Chat_message, (messages) => messages.chatroom)
  messages!: Chat_message;

  @ManyToMany(() => User)
  @JoinTable()
  users!: User[];
}
