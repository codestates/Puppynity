import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

import { User } from './User';
import { Chatroom } from './Chatroom';

@Entity()
export class Chat_message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
  })
  message!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @ManyToOne((type) => User, (writer) => writer.messages)
  writer!: User;

  @ManyToOne((type) => Chatroom, (chatroom) => chatroom.messages)
  chatroom!: Chatroom;
}
