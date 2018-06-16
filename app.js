const puppeteer = require('puppeteer');

const redis = require('redis');
const {promisify} = require('util');

//https://github.com/NodeRedis/node_redis

const connectInfo = {

    host: '211.180.114.87',
    port: 6380

};

const redisClient = redis.createClient(connectInfo);




(async() => {


    redisClient.on('connect', function () {
        console.log('connected to redis!!');
    });


    redisClient.on("error", function (err) {
        console.log("Error " + err);
    });

    const spopAsync = promisify(redisClient.spop).bind(redisClient);
    const saddAsync = promisify(redisClient.sadd).bind(redisClient);
    const scardAsync = promisify(redisClient.scard).bind(redisClient);


    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    let end = false;

    let remain = await scardAsync('drug');
    if(remain > 0) end = true;

    while (end) {

        let index = await spopAsync('drug');
        console.log('index : ', index);

        await page.goto(`http://www.health.kr/searchDrug/result_detailmore.asp?input_drug_nm=&search_sunb1=&search_sunb2=&search_sunb3=&search_drugnm_initial=%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+&drug_nm_mode=field&drug_nm=&sunb_equals1=&sunb_equals2=&sunb_equals3=&sunb_where1=and&sunb_where2=and&input_upsoNm=&search_effect=&cbx_sunbcnt=0&cbx_sunbcnt_mode=0&cbx_bohtype=%2C+%2C+%2C+&cbx_bohtype_mode=0&cbx_class=0%2C+%2C+%2C+&cbx_class_mode=0&search_bohcode=&anchor_dosage_route_hidden=&anchor_form_info_hidden=&mfds_cd=&mfds_cdword=&cbx_narcotic=%2C+%2C+%2C+%2C+&cbx_narcotic_mode=0&kpic_atc_nm=&kpic_atc_nm_opener=&atccode_name=&atccode_val=&atccode_val_opener=&input_hiraingdcd=&cbx_bio=%2C+%2C+%2C+&cbx_bio_mode=0&icode=&fixed_cnt=33414&search_detail=Y&TabState=0&proYN=Y&pageNo=${index}&rowLength=100&inner_search_word=&inner_search_flag=drug_name&viewmode=&listup=10&more=`,
            {waitUntil: 'domcontentloaded'});
        const SELECTOR = '#tbl_pro > tbody > tr';
        const data = await page.evaluate((sel) => {

            const trArray = document.querySelectorAll(sel).entries();

            return Array.from(trArray).slice(1).map(tr => {
                const tdList = tr[1].querySelectorAll('td').entries();
                const attrList = Array.from(tdList).map(td => td[1].innerText);
                /*
     [ '', 0
        '가오브릭정80mg', 1
        'Febuxostat　80mg',2
        '',3
        '한국휴텍스제약',4
        '394',5
        '정제',6
        '전문',7
        '311원/1정',8
        '' ],9

        1) OTC 의약품- Over-the-Counter 의약품이라는 뜻으로, 의사에 처방전 없이 구입할 수 있는 일반 의약품을 말합니다.
    예)동아제약 박카스 등
        2) ETC 의약품(prescription drugs)- Ethical 의약품이라는 뜻으로, 의사의 처방전이 있어야 구입할 수 있는 전문 의약품을 말합니다.

                 */

                return {
                    name: attrList[1], //품명
                    ingredient: attrList[2], //성분
                    companyName: attrList[4], //회사명
                    classNo: attrList[5], //분류
                    dosageForm: attrList[6], //제형
                    drugType: attrList[7], //전문/일반
                    drugInsurancePrice: attrList[8] //보험수가
                }

            });

            // .map(tr => {tr.querySelectorAll('td')})
        }, SELECTOR);

        console.log(data);

        await saddAsync('drugInfo', JSON.stringify(data));
        let remain = await scardAsync('drug');
        if(remain === 0) end = false;

    }

    // await page.screenshot(
    //     { path: export_path,
    //         fullPage:true,
    //         type:"jpeg",
    //         quality:99
    //     }
    // );
    console.log("end");
    browser.close();
    process.exit(1);
})();
