import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from './User';
import { Post_like } from './Post_like';
import { Post_comment } from './Post_comment';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  content!: string;

  @Column()
  category!: string;

  @Column({ nullable: true })
  imgRef!: string;

  @Column({ default: 0 })
  totalViews!: number;

  @Column({ default: 0 })
  totalLikes!: number;

  @Column({ default: 0 })
  totalComments!: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;

  /* 관계 설정 */
  // Post(N) <-> User(1)
  @ManyToOne((type) => User, (writer) => writer.posts)
  writer!: User;

  // Post(1) <-> Post_comment(N)
  @OneToMany((type) => Post_comment, (comments) => comments.post)
  comments!: Post_comment;

  //! Post(1) <-> Post_like(N)
  @OneToMany((type) => Post_like, (post_likes) => post_likes.post)
  post_likes!: Post_like[];
}
