import { Request, Response } from 'express'
import { ILike } from 'typeorm'

import { Post } from '../../entity/Post'
import { User } from '../../entity/User'

export const getMyPosts = async (req: Request, res: Response) => {
  console.log('내가 쓴 글 불러오기 🕹')
  try {
    const userId = Number(req.params.userid)

    if (!userId) {
      return res.status(400).json({ message: '유저의 id(pk)를 path에 담아주세요.' })
    }

    const userInfo = await User.findOne({ id: userId })

    if (!userInfo) {
      return res.status(403).json({ message: '작성자의 회원 정보가 없습니다' })
    }

    const { page, limit } = req.query
    // page
    let pageNum = Number(page) || 1
    // limit: 표시할 row 수
    let take = Number(limit) || 9
    // offset: 가져올 row의 시작 인덱스
    let skip = 0 + (pageNum - 1) * take

    const MyPosts = await Post.find({
      where: { writer: userInfo },
      order: { createdAt: 'DESC' },
      skip,
      take,
    })

    return res.status(200).json({ posts: MyPosts, message: '내가 쓴 글이 로드 되었습니다.' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err })
  }
}
