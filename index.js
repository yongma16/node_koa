const Koa = require('koa');
// jwt
const jwt = require('koa-jwt');

const { koaBody } = require('koa-body');


// 中间件
const cors = require('koa2-cors');

// 引入路由
const routing = require('./router')

const app = new Koa();

// 文件上传
app.use(koaBody({
    multipart: true
}))

// 中间件
app.use(
    cors({
        // origin: function(ctx) { //设置允许来自指定域名请求
        //     // if (ctx.url === '/test') {
        //     //     return '*'; // 允许来自所有域名请求
        //     // }
        //     // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
        //     return '*'; // 允许来自所有域名请求
        // },
        origin: '*',
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

// Middleware below this line is only reached if JWT token is valid
// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            console.log('401', ctx)
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    })
});





// 注意：放在路由前面
app.use(jwt({
    secret: 'yma16-app'
}).unless({ // 配置白名单 api 注册 获取 token 获取验证码
    path: [/\/swagger/,
        /\/redis\/data/,
        /\/chat\/bot/,
        /\/sendEmailCode/,
    ]
}))

// 使用路由
routing(app)



const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/swagger`);
});