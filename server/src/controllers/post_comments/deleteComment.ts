import { Request, Response } from 'express';

import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { Post_comment } from '../../entity/Post_comment';

export const deleteComment = async (req: Request, res: Response) => {
  console.log('댓글 삭제 🕹');

  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId;
  const postId = Number(req.params.postId);
  const commentId = Number(req.params.commentId);

  if (!postId) {
    return res.status(400).json({ message: '게시물의 postid(pk)를 path에 담아주세요.' });
  } else if (!commentId) {
    return res.status(400).json({ message: '삭제할 댓글의 commentId(pk)를 path에 담아주세요.' });
  }

  const userInfo = await User.findOne({ id: userId });

  if (userInfo === undefined) {
    return res.status(403).json({ message: '유저의 회원 정보가 없습니다' });
  }

  const postDetail = await Post.findOne({ id: postId });

  if (postDetail === undefined) {
    return res.status(404).json({ message: '댓글을 삭제할 게시물이 존재하지 않습니다.' });
  }

  const comment = await Post_comment.findOne({ id: commentId });

  if (comment === undefined) {
    return res.status(404).json({ message: '삭제할 댓글이 존재하지 않습니다.' });
  }

  if (comment.writer.id !== userId) {
    return res.status(403).json({ message: '유저가 댓글의 원래 작성자가 아닙니다.' });
  }

  comment.remove();
  res.status(201).json({ commentId, messgage: '댓글이 삭제되었습니다.' });
};
