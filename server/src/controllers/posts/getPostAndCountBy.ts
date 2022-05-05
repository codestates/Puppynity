// import { Request, Response } from 'express';

// import { Post } from '../../entity/Post';
// import { User } from '../../entity/User';

// export const getPostsAndCountBy = async (req: Request, res: Response) => {
//   console.log('게시물 전체 조회 🕹');

//   // limit: 표시할 row 수
//   const take = Number(limit);
//   // offset: 가져올 row의 시작 인덱스
//   const skip = 0 + (Number(page) - 1) * take;

//   // 검색 쿼리가 없을 경우
//   if (!search) {
//     try {
//       const paginatedPosts = Post.findAndCount({order:{createdAt:'ASC'},skip,take})

//     }

//   }

//   const foundPost = await Post.findOne({ where: { id: postId }, relations: ['writer'] });

//   if (!foundPost) {
//     return res.status(404).json({ message: '조회하려는 게시물이 존재하지 않습니다' });
//   }

//   //! 추후 이미지 업로드 구현시 보완 필요
//   foundPost.writer.password = '';
//   res.status(200).json({ post: foundPost, messgage: '게시물이 로드되었습니다.' });
// };
