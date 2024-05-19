const Redis = require('ioredis')

// 创建 Redis 客户端实例, 连接指定的 Redis 服务器
const redis = new Redis({
    port: 6379, // redis服务器默认端口号
    host: '127.0.0.1' // redis服务器的IP地址
})

// 配置 键值对
const setRedisConfig = (key, value) => {
    redis.set(key, value);
}

// 获取键值对
const getRedisKey = async(key) => {
    return new Promise((resolve, reject) => {
        // ioredis supports the node.js callback style
        redis.get(key, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = {
    getRedisKey,
    setRedisConfig
}