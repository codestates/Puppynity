const express = require('express');
const { swaggerUi, specs } = require('../../modules/swagger');

const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const postLikesRouter = require('./postLikes');

// swagger api 문서 url
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/** * @swagger * /product: * get: * tags: * - product * description: 모든 제품 조회 * produces: * - application/json * parameters: * - in: query * name: category * required: false * schema: * type: integer * description: 카테고리 * responses: * 200: * description: 제품 조회 성공 */

// router.use('/auth', authRouter);
// router.use('/users', usersRouter);
// router.use('/posts', postsRouter);
// router.use('/comments', commentsRouter);
// router.use('/post-likes', postLikesRouter);

module.exports = router;
