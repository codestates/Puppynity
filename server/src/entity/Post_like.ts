import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

import { Post } from './Post';
import { User } from './User';

@Entity()
export class Post_like {
  // 이엔티티 (테이블) 에서 저장 삭제를 하기위해서 baseEntity
  @PrimaryGeneratedColumn()
  id!: number;

  /* 관계 설정 */
  // Post_like(N) <-> User(1)
  @ManyToOne((type) => User, (liker) => liker.post_likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  liker!: User;

  // Post_like(N) <-> Post(1)
  @ManyToOne((type) => Post, (post) => post.post_likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post!: Post;
}
