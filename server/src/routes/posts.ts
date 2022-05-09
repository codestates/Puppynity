import express from 'express';
import { body } from 'express-validator';

import { validation } from '../middlewares/valdation';
import { authentication } from '../middlewares/authentcation';

import { getPostsAndCountBy } from '../controllers/posts/getPostAndCountBy';
import { createPost } from '../controllers/posts/createPost';
import { updatePost } from '../controllers/posts/updatePost';
import { deletePost } from '../controllers/posts/deletePost';
import { getPostDetail } from '../controllers/posts/getPostDetail';

import { createComment } from '../controllers/post_comments/createComment';
import { updateComment } from '../controllers/post_comments/updateComment';
import { deleteComment } from '../controllers/post_comments/deleteComment';
import { getCommentsAndCount } from '../controllers/post_comments/getCommentsAndCount';

const postsRouter = express.Router();

// 게시물 목록 조회 페이지네이션, 검색 쿼리 받을 수 있도록
postsRouter.get('/');

// 개시물 상세 조회
postsRouter.get('/:postId', getPostDetail);

// 게시물 생성
postsRouter.post(
  '/',
  authentication,
  [
    // body('userId')
    //   .exists()
    //   .withMessage('body에 userId field가 없음!')
    //   .notEmpty()
    //   .withMessage('userId(pk) 값을 입력해주세요')
    //   .trim()
    //   .isNumeric()
    //   .withMessage('userId(pk) 값은 숫자 형태 여야 합니다'),
    body('title')
      .exists()
      .withMessage('body에 title field가 없음!')
      .trim()
      .notEmpty()
      .withMessage('제목을 입력해주세요'),
    body('category')
      .exists()
      .withMessage('body에 category field가 없음!')
      .trim()
      .notEmpty()
      .withMessage('카테고리를 입력해주세요')
      .isIn(['Q&A', 'dailyLog', 'informational'])
      .withMessage('카테고리는 [Q&A, dailyLog, informational] 중 하나 여야 합니다.'),
    body('content')
      .exists()
      .withMessage('body에 content field가 없음!')
      .trim()
      .notEmpty()
      .withMessage('본문 내용을 입력해주세요'),
  ],
  validation,
  createPost,
);

// 게시물 수정
postsRouter.patch(
  '/:postId',
  authentication,
  [
    body('title')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 1 })
      .withMessage('제목은 한 글자 이상 입력해야합니다'),
    body('category')
      .optional({ checkFalsy: true })
      .trim()
      .isIn(['Q&A', 'dailyLog', 'informational'])
      .withMessage('카테고리는 [Q&A, dailyLog, informational] 중 하나 여야 합니다.'),
    body('content')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 1 })
      .withMessage('본문 내용을 한 글자 이상 입력해야합니다'),
  ],
  validation,
  updatePost,
);
// 게시물 삭제
postsRouter.delete('/:postId', authentication, deletePost);

//* ---
// 댓글 전체 조회
postsRouter.get('/:postId/comments', getCommentsAndCount);

// 댓글 생성
postsRouter.post(
  '/:postId/comments',
  authentication,
  body('content')
    .exists()
    .withMessage('body에 content field가 없음!')
    .trim()
    .notEmpty()
    .withMessage('댓글 내용을 입력해주세요'),
  validation,
  createComment,
);

// 댓글 수정
postsRouter.patch(
  '/:postId/comments/:commentId',
  authentication,
  body('content')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .withMessage('수정할 댓글 내용을 한 글자 이상 입력해야합니다'),
  validation,
  updateComment,
);
// 댓글 삭제
postsRouter.delete('/:postId/comments/:commentId', authentication, deleteComment);

module.exports = postsRouter;
