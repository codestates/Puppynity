import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

import { Post } from './Post';
import { User } from './User';

@Entity()
export class Post_like {
  // 이엔티티 (테이블) 에서 저장 삭제를 하기위해서 baseEntity
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne((type) => User, (user) => user.liker, {
  //   nullable: false,
  //   onDelete: "CASCADE",
  // })
  // user!: User;

  // @ManyToOne((type) => Post, (post) => post.whoLikes, {
  //   nullable: false,
  //   onDelete: "CASCADE",
  // })
  // post!: Post;
}
