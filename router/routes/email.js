const Router = require('koa-router');
const router = new Router();
const {sendEmail}=require('../../utils/email/index');
const {getRedisKey,setRedisConfig}=require('../../utils/redis/index');
// 随机字符串
function randomString(length) {
    const chars='0123456789'
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// 发送邮件验证码
router.post('/sendEmailCode', async (ctx) => {
    try{
        const bodyParams =  ctx.request.body
        const {email}=bodyParams
        console.log('email',email)
        const code=randomString(4)
        const content=`<p>验证码：<span style="color:lightskyblue">${code}</span><p>`
        const title='请查收验证码'
        setRedisConfig(email,code)
        console.log('code',code)
        const res=await sendEmail(email,title,content)
        ctx.body = {
            code:res.code,
            data:{
                emailRes:res,
                code:code
            },
            msg:'success'
        };
    }
    catch(r){
        ctx.body={
            code:0,
            msg:r
        }
    }
});

module.exports = router;
