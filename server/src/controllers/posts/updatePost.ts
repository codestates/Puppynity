import { Request, Response } from 'express'

import { Post } from '../../entity/Post'
import { User } from '../../entity/User'

export const updatePost = async (req: Request, res: Response) => {
  console.log('게시물 수정 🕹')

  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId
  const postId = Number(req.params.postId)
  const { title, content, category, imgRef } = req.body

  // 바디에 아무 값도 없을 경우 early return
  if (!title && !content && !category) {
    return res.sendStatus(200)
  }

  if (!postId) {
    return res.status(400).json({ message: '게시물의 id(pk)를 path에 담아주세요.' })
  }

  const userInfo = await User.findOne({ id: userId })

  if (userInfo === undefined) {
    return res.status(403).json({ message: '작성자의 회원 정보가 없습니다' })
  }

  const foundPost = await Post.findOne({ where: { id: postId }, relations: ['writer'] })

  if (!foundPost) {
    return res.status(404).json({ message: '수정하려는 게시물이 존재하지 않습니다' })
  }

  if (foundPost.writer.id !== userId) {
    return res.status(403).json({ message: '로그인한 유저가 원래 작성자가 아닙니다' })
  }
  //! 추후 이미지 업로드 구현시 수정

  if (title) {
    foundPost.title = title
  }
  if (content) {
    foundPost.content = content
  }
  if (category) {
    foundPost.category = category
  }
  if (imgRef) {
    foundPost.imgRef = imgRef
  }
  await foundPost.save()
  foundPost.writer.password = ''
  res.status(200).json({ post: foundPost, messgage: '게시물이 수정되었습니다.' })
}
