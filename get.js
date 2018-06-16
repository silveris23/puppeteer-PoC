const connectInfo = require('./config').redisConfig;
const client = require('./redisHelper').init(connectInfo);

( async () => {

    const dataList = await client.smembersAsync('drugInfo');

    let ret = [];
    dataList.forEach(
        row => {
            let rowList = JSON.parse(row);
            // console.log("\n\n=========>" + rowList.length);

            ret = ret.concat(rowList);
        }
    );

    await client.setAsync("drugResult",JSON.stringify(ret));

    console.log("finished...", ret.length);
    process.exit(1);

})();
