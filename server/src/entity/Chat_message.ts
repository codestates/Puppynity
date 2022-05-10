import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

import { User } from './User';
import { Chatroom } from './Chatroom';

@Entity()
export class Chat_message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!:number;

  @Column()
  username!:string; 

  @Column()
  chatroom!:string; //chatroom 이름

  @Column({
    type: 'text',
  })
  message!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  /* 관계 설정 */
  // Chat_message(N) <-> User(1)
  // @ManyToOne((type) => User, (writer) => writer.messages)
  // writer!: User;

  // Chat_message(N) <-> Chatroom(1)
  // @ManyToOne((type) => Chatroom, (chatroom) => chatroom.messages)
  // chatroom!: Chatroom;
}
