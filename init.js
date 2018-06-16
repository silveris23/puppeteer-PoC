const redis = require('redis');
const {promisify} = require('util');
const redisClient = redis.createClient({});



redisClient.on('connect', function () {
    // console.log('connected to redis!!');
});


redisClient.on("error", function (err) {
    console.log("Error " + err);
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const hlenAsync = promisify(redisClient.hlen).bind(redisClient);
const hgetAsync = promisify(redisClient.hget).bind(redisClient);
const spopAsync = promisify(redisClient.spop).bind(redisClient);
const saddAsync = promisify(redisClient.sadd).bind(redisClient);
const scardAsync = promisify(redisClient.scard).bind(redisClient);
const hsetAsync = promisify(redisClient.hset).bind(redisClient);
const smembersAsync = promisify(redisClient.smembers).bind(redisClient);

const main = async (length,cntPerPage) => {


    const pageSize = length/cntPerPage;
    console.log("size : ", pageSize);

    for( var i = 1 ; i < pageSize + 1; i++) {
        await saddAsync("drug", i);
        console.log(i);
    }
    console.log("exit");
    process.exit(1);
};



const getAll = async () => {

    const dataList = await smembersAsync('drugInfo');


    let ret = [];
    dataList.forEach(
        row => {
            let rowList = JSON.parse(row);
            // console.log("\n\n=========>" + rowList.length);

            ret = ret.concat(rowList);
        }
    );

    console.log(JSON.stringify(ret));


    // console.log("exit");
    process.exit(1);


};
//수집끝난상태에서 콘솔로 출력
// node init.js > drugMaster.json
getAll();


//처음 인덱스 입력
// main(33414,100);
