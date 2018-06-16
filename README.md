# 약학정보원 의약품 수집

> http://www.health.kr/searchDrug/result_detailmore.asp?input_drug_nm=&search_sunb1=&search_sunb2=&search_sunb3=&search_drugnm_initial=%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+%2C+&drug_nm_mode=field&drug_nm=&sunb_equals1=&sunb_equals2=&sunb_equals3=&sunb_where1=and&sunb_where2=and&input_upsoNm=&search_effect=&cbx_sunbcnt=0&cbx_sunbcnt_mode=0&cbx_bohtype=%2C+%2C+%2C+&cbx_bohtype_mode=0&cbx_class=0%2C+%2C+%2C+&cbx_class_mode=0&search_bohcode=&anchor_dosage_route_hidden=&anchor_form_info_hidden=&mfds_cd=&mfds_cdword=&cbx_narcotic=%2C+%2C+%2C+%2C+&cbx_narcotic_mode=0&kpic_atc_nm=&kpic_atc_nm_opener=&atccode_name=&atccode_val=&atccode_val_opener=&input_hiraingdcd=&cbx_bio=%2C+%2C+%2C+&cbx_bio_mode=0&icode=&fixed_cnt=33414&search_detail=Y&TabState=0&proYN=Y&pageNo=295&rowLength=100&inner_search_word=&inner_search_flag=drug_name&viewmode=&listup=10&more=

- 수집하여 redis를 저장소로 사용
- config.json 에 redis 저장소 정보와 약학정보원 파라미터 정보를 저장
## 실행방법 

### 로컬에서 실행 
 1. `git clone {project}`
 2. `cd {project}`
 3. `npm install`
 4. `node app` : 정보수집 시작 'drug' 셋에서 인덱스를 SPOP , 'drugInfo' 셋에 크롤링한 정보를 SADD
 5. `node get` : 수집이 끝난뒤 redis에 접속하여 하나로 묶어서 'drugResult' 키로 SADD

### 도커로 서버에서 실행
>당연히 도커는 서버에 설치되어 있어야 한다. 


 1. 동일
 2. 동일
 3. 도커이미지 만들기 `docker build -t puppeteer-chrome-linux .`
 4. 도커이미지를 다만든후 도커 프로세스를 띄우고 실행 스크립트 `run.sh`

> 주의!! app.js 외 다른 파일이 변경되었을 경우(레디스 접속정보등) 위의 3번 이미지생성부터 다시한다 
또한 레디스 저장소 위치는 로컬호스트가 될수없다.  (도커호스트안에서 실행 되기때문에 '로컬호스트'가 호스트를 의미하지 않음) 

참고 
```

npm install

node app.js 

#get 
node get

#docker build image
docker build -t puppeteer-chrome-linux .
#docker run
docker run -i --rm --cap-add=SYS_ADMIN --name puppeteer-chrome puppeteer-chrome-linux node -e "`cat app.js`"

```


참고자료

https://developers.google.com/web/tools/puppeteer/

https://github.com/GoogleChrome/puppeteer

https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
