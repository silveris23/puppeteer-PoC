const redis = require('redis');
const {promisify} = require('util');

const RedisHelper = {};

RedisHelper.init = (option={}) => {

    //option default
    if (  option === {}) option = {host: 'localhost', port: 6379};

    const redisClient = redis.createClient(option);
    redisClient.on('connect', function () {
        console.log('connected to redis!! ');
        console.log(option);
    });

    redisClient.on("error", function (err) {
        console.log("Error " + err);
    });

    RedisHelper.client = redisClient;

    RedisHelper.setAsync = promisify(redisClient.set).bind(redisClient);
    RedisHelper.getAsync = promisify(redisClient.get).bind(redisClient);
    RedisHelper.hlenAsync = promisify(redisClient.hlen).bind(redisClient);
    RedisHelper.hgetAsync = promisify(redisClient.hget).bind(redisClient);
    RedisHelper.spopAsync = promisify(redisClient.spop).bind(redisClient);
    RedisHelper.saddAsync = promisify(redisClient.sadd).bind(redisClient);
    RedisHelper.scardAsync = promisify(redisClient.scard).bind(redisClient);
    RedisHelper.hsetAsync = promisify(redisClient.hset).bind(redisClient);
    RedisHelper.smembersAsync = promisify(redisClient.smembers).bind(redisClient);


    return RedisHelper;
};

module.exports = RedisHelper;