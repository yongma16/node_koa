const Router = require('koa-router');
const router = new Router();
const { getRedisKey, setRedisConfig } = require('../../utils/redis/index');

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

router.get('/redis/data', async(ctx) => {
    try {
        const queryParams = ctx.request.query;
        const { key } = queryParams;
        const value = await getRedisKey(key)
        ctx.body = { code: 200, msg: 'success!', data: value };
    } catch (e) {
        ctx.body = { code: 0, data: e, msg: 'fail' };
    }
});

router.post('/redis/data', async(ctx) => {
    try {
        const bodyParams = ctx.request.body
        const { key, value } = bodyParams
        const resut = await setRedisConfig(key, value)
        ctx.body = { code: 200, msg: 'success!', data: resut };
    } catch (e) {
        ctx.body = { code: 0, data: e, msg: 'fail' };
    }
});

module.exports = router;