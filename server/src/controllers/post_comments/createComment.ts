import { Request, Response } from 'express';

import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { Post_comment } from '../../entity/Post_comment';

export const createComment = async (req: Request, res: Response) => {
  console.log('댓글 생성 🕹');

  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId;
  const postId = Number(req.params.postId);
  const { content } = req.body;

  if (!postId) {
    return res.status(400).json({ message: '게시물의 postid(pk)를 path에 담아주세요.' });
  }

  const userInfo = await User.findOne({ id: userId });

  if (userInfo === undefined) {
    return res.status(403).json({ message: '유저의 회원 정보가 없습니다' });
  }

  const postDetail = await Post.findOne({ id: postId });

  if (postDetail === undefined) {
    return res.status(404).json({ message: '댓글을 달 게시물이 존재하지 않습니다.' });
  }

  const createdComment = await Post_comment.create({ content, writer: userInfo, post: postDetail });
  await createdComment.save();
  createdComment.writer.password = '';

  const comment = {
    id: createdComment.id,
    content: createdComment.content,
    createdAt: createdComment.createdAt,
    updatedAt: createdComment.updatedAt,
    writer: createdComment.writer,
  };
  res.status(201).json({ comment, messgage: '댓글이 생성되었습니다.' });

  //* 중복 댓글 등록 방지
};
