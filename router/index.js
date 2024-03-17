const fs = require('fs')
const path = require('path')
    // swagger
const Router = require('koa-router');
const swaggerUI = require('koa2-swagger-ui').koaSwagger;
const swaggerSpec = require('./swagger/index');


// 路由
const router = new Router();


module.exports = app => {
    // 读取当前路径下 遍历 routes目录所有文件
    fs.readdirSync(path.join(__dirname, './routes')).forEach(file => {
        const singleRouter = require(`./routes/${file}`);
        // 虚拟路由
        router.use('/api', singleRouter.routes(), singleRouter.allowedMethods());
    })

    //加载文档
    router.get(
        '/swagger',
        swaggerUI({
            routePrefix: false,
            swaggerOptions: {
                spec: swaggerSpec,
            },
        })
    );
    // app 运行 加载虚拟路由
    app.use(router.routes()).use(router.allowedMethods())
}