import { Request, Response } from 'express';

import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

export const deletePost = async (req: Request, res: Response) => {
  console.log('게시물 수정 🕹');

  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId;
  const postId = Number(req.params.postId);

  if (!postId) {
    return res.status(400).json({ message: '게시물의 id(pk)를 path에 담아주세요.' });
  }

  const userInfo = await User.findOne({ id: userId });

  if (userInfo === undefined) {
    return res.status(403).json({ message: '작성자의 회원 정보가 없습니다' });
  }

  const foundPost = await Post.findOne({ where: { id: postId }, relations: ['writer'] });

  if (!foundPost) {
    return res.status(404).json({ message: '삭제하려는 게시물이 존재하지 않습니다' });
  }

  if (foundPost.writer.id !== userId) {
    return res.status(403).json({ message: '로그인한 유저가 원래 작성자가 아닙니다' });
  }

  const deletedpost = await Post.remove(foundPost);
  res.status(200).json({ postId: postId, message: '게시물이 삭제되었습니다.' });
};
