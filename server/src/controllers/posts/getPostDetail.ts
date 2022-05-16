import { Request, Response } from 'express'

import { Post } from '../../entity/Post'

export const getPostDetail = async (req: Request, res: Response) => {
  console.log('게시물 상세 조회 🕹')

  const postId = Number(req.params.postId)

  if (!postId) {
    return res.status(400).json({ message: '조회하려는 게시물의 id(pk)를 path에 담아주세요.' })
  }

  const foundPost = await Post.findOne({ where: { id: postId }, relations: ['writer', 'post_likes'] })

  if (!foundPost) {
    return res.status(404).json({ message: '조회하려는 게시물이 존재하지 않습니다' })
  }

  //! 추후 이미지 업로드 구현시 보완 필요
  foundPost.writer.password = ''
  res.status(200).json({ post: foundPost, messgage: '게시물이 로드되었습니다.' })
}
