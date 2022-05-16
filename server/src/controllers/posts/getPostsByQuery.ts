import { Request, Response } from 'express'
import { ILike } from 'typeorm'

import { Post } from '../../entity/Post'
import { User } from '../../entity/User'

export const getPostsByQuery = async (req: Request, res: Response) => {
  console.log('게시물 전체 조회 🕹')
  try {
    const { search, page, limit } = req.query
    // page
    let pageNum = Number(page) || 1
    // limit: 표시할 row 수
    let take = Number(limit) || 9
    // offset: 가져올 row의 시작 인덱스
    let skip = 0 + (pageNum - 1) * take

    //검색 쿼리가 없을 경우
    if (!search) {
      const paginatedPosts = await Post.find({ relations: ['writer'], order: { createdAt: 'DESC' }, skip, take })

      if (paginatedPosts === undefined) {
        return res.status(404).json({ message: '전체 게시물 수가 0입니다.' })
      }

      return res.status(200).json({ posts: paginatedPosts, message: '게시물이 로드 되었습니다.' })
    }

    const filterdPosts = await Post.find({
      where: [{ title: ILike(`%${search}%`) }, { content: ILike(`%${search}%`) }],
      order: { createdAt: 'DESC' },
      relations: ['writer'],
      skip,
      take,
    })

    return res.status(200).json({ posts: filterdPosts, message: '검색 결과가 로드 되었습니다.' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err })
  }
}
