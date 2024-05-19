const Router = require('koa-router');
const router = new Router();
const { postAction } = require('../../utils/request/index');

const API_KEY = 'YrtPgHCZCzoQvZs5UrobazREjHA4r9IMy74ZZ8Qj2xkSZUpuaQmnfApk6ARZBHGP'
const bot_id = '7352874287864414249'

// 和bot聊天
router.post('/chat/bot', async(ctx) => {
    try {
        const bodyParams = ctx.request.body
        const { user, query } = bodyParams
        console.log('bodyParams', bodyParams)

        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "Host": 'api.coze.cn',
            "Connection": "keep-alive"
        }

        const data = {
            "bot_id": bot_id,
            "user": user,
            "query": query,
        }

        const baseUrl = "https://api.coze.cn"
        const path = '/open_api/v2/chat'


        const res = await postAction(baseUrl, path, headers, data)
        ctx.body = {
            code: res.status,
            data: res.data,
            msg: res.statusText
        };
    } catch (r) {
        ctx.body = {
            code: 0,
            msg: r
        }
    }
});

module.exports = router;