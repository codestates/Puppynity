import { Request, Response } from 'express'

import { Post } from '../../entity/Post'
import { User } from '../../entity/User'

export const createPost = async (req: Request, res: Response) => {
  console.log('게시물 생성 🕹')
  console.log('파일--->', req.file, 'body 객체 --->', req.body)
  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId
  const { title, content, category, img } = req.body

  const userInfo = await User.findOne({ id: userId })

  if (userInfo === undefined) {
    return res.status(403).json({ message: '작성자의 회원 정보가 없습니다' })
  }
  //! 추후 이미지 업로드 구현시 수정
  const createdPost = await Post.create({ title, content, category, writer: userInfo })
  const savedPost = await createdPost.save()

  savedPost.writer.password = ''
  res.status(201).json({ post: savedPost, messgage: '게시물이 등록되었습니다.' })

  //* 중복 게시물 등록 방지
}
