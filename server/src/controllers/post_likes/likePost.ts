import { Request, Response } from 'express'

import { Post } from '../../entity/Post'
import { User } from '../../entity/User'
import { Post_like } from '../../entity/Post_like'

export const likePost = async (req: Request, res: Response) => {
  console.log('좋아요 누르기🕹')

  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId
  const postId = Number(req.params.postId)

  try {
    if (!postId) {
      return res.status(400).json({ message: '좋아요할 게시물의 postid(pk)를 path에 담아주세요.' })
    }

    const userInfo = await User.findOne({ id: userId })

    if (userInfo === undefined) {
      return res.status(403).json({ message: '유저의 회원 정보가 없습니다' })
    }

    const postDetail = await Post.findOne({ id: postId })

    if (postDetail === undefined) {
      return res.status(404).json({ message: '좋아요 할 게시물이 존재하지 않습니다.' })
    }

    const createdLike = await Post_like.create({ liker: userInfo, post: postDetail })
    const savedPost = await createdLike.save()

    res.status(201).json({ messgage: '좋아요 성공' })
  } catch (err) {
    console.log('좋아요 에러 -> ', err)
    res.status(500).send({ message: err })
  }
}
