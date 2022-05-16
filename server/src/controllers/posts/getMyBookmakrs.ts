import { Request, Response } from 'express'
import { ILike } from 'typeorm'

import { Post } from '../../entity/Post'
import { User } from '../../entity/User'
import { Post_like } from '../../entity/Post_like'

export const getMyBookmakrs = async (req: Request, res: Response) => {
  console.log('좋아요 한 글 불러오기 🕹')
  const userId = Number(req.params.userid)
  try {
    if (!userId) {
      return res.status(400).json({ message: '유저의 id(pk)를 path에 담아주세요.' })
    }

    const userInfo = await User.findOne({ id: userId })

    if (!userInfo) {
      return res.status(403).json({ message: '회원 정보가 없습니다' })
    }

    const { page, limit } = req.query
    // page
    let pageNum = Number(page) || 1
    // limit: 표시할 row 수
    let take = Number(limit) || 9
    // offset: 가져올 row의 시작 인덱스
    let skip = 0 + (pageNum - 1) * take

    const myBookMarks = await Post_like.find({
      where: { liker: userInfo },
      relations: ['post'],
      order: { id: 'DESC' },
      skip,
      take,
    })

    console.log(myBookMarks)
    if (!myBookMarks) {
      return res.status(404).json({ message: '좋아요 한 게시글이 없습니다.' })
    }

    return res.status(200).json({ posts: myBookMarks, message: '좋아요한 게시물이 로드 되었습니다.' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err })
  }
}
