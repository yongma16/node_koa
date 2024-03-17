const Router = require('koa-router');
const router = new Router();

/**
 * @swagger
 * tags:
 *   name: IndexConfig
 *   description: IndexConfig
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     IndexConfig:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: network status.
 *         msg:
 *           type: string
 *           description: des
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: return msg
 *     tags: [IndexConfig]
 *     responses:
 *       200:
 *         description: A list of IndexConfig.
 *         content:
 *           application/json:
 *             schema:
 *               type: Object
 *               items:
 *                 $ref: '#/components/schemas/IndexConfig'
 */
router.get('/', async(ctx) => {
    ctx.body = [{ code: 200, msg: 'koa server' }];
});

module.exports = router;