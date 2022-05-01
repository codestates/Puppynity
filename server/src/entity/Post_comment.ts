import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Post_comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
  })
  content!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;

  /* 관계 설정 */
  // Post_comment(N) <-> User(1)
  @ManyToOne((type) => User, (writer) => writer.comments)
  writer!: User;

  // Post_comment(N) <-> Post(1)
  @ManyToOne((type) => Post, (post) => post.comments)
  post!: Post;
}
