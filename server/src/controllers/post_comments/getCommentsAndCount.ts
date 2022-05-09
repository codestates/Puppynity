import { Request, Response } from 'express';

import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { Post_comment } from '../../entity/Post_comment';

export const getCommentsAndCount = async (req: Request, res: Response) => {
  console.log('전체 댓글 조회 🕹');

  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId;
  const postId = Number(req.params.postId);

  if (!postId) {
    return res.status(400).json({ message: '게시물의 postid(pk)를 path에 담아주세요.' });
  }

  const postDetail = await Post.findOne({ id: postId });

  if (postDetail === undefined) {
    return res.status(404).json({ message: '댓글을 조회할 게시물이 존재하지 않습니다.' });
  }

  const comments = await Post_comment.findAndCount({ relations: ['writer'], where: { post: postDetail } });

  if (comments === undefined) {
    return res.status(404).json({ message: '게시물에 댓글이 존재하지 않습니다.' });
  }
  console.log(comments);
  res.status(200).json({ comments, messgage: '게시물에 달린 전체 댓글을 불러왔습니다.' });
};
