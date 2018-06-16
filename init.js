

const connectInfo = require('./config');



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

    await setAsync("drugResult",JSON.stringify(ret));


    // console.log("exit");
    process.exit(1);


};
//수집끝난상태에서 콘솔로 출력
// node init.js > drugMaster.json
getAll();


//처음 인덱스 입력
// main(33414,100);
