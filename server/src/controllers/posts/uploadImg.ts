import { Request, Response } from 'express'
import sharp from 'sharp'
import fs from 'fs'

import { Post } from '../../entity/Post'
import { User } from '../../entity/User'

export const uploadImg = async (req: Request, res: Response) => {
  console.log('이미지 업로드 🕹')
  console.log('업로드 파일 --->', req.file)

  //? 왜 POST psts/:id 요청 body에 userId를 담으라는지 당최 이해가 되지 않는다.
  const userId = req.userId
  const { title, content, category, img } = req.body
  try {
    sharp(req.file?.path) // 압축할 이미지 경로
      .resize({ width: 640 }) // 비율을 유지하며 가로 크기 줄이기
      .withMetadata() // 이미지의 exif데이터 유지
      .toBuffer((err, buffer) => {
        if (err) throw err
        // 압축된 파일 새로 저장(덮어씌우기)
        fs.writeFile(req.file?.path as string, buffer, (err) => {
          if (err) throw err
        })
      })
    res.status(201).json({ imgRef: req.file?.filename, messgage: '사진이 업로드 되었습니다.' })
  } catch (err) {
    res.status(500).json({ message: err })
  }

  //* 중복 게시물 등록 방지
}
