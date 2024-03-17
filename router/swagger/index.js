const swaggerJSDoc = require('swagger-jsdoc');
const path=require('path');
const fs=require('fs');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'koa 项目 swagger 文档',
            version: '1.0.0',
            description: 'koa项目',
        },
        host: 'localhost:3000/swagger',// 想着改这里，如果不修改，那么接口文档访问地址为：localhost:8000/swagger
        basePath: '/' // Base path (optional)
    },
    // 文档api
    apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

// 写入json
fs.writeFileSync(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec;
