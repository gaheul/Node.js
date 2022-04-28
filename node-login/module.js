const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.engine('html',require('ejs').renderFile);
//views엔진등록,ejs파일을 들고와서 rendering해서 html파일로 띄워줌 , views폴더 생성이 공식(무조건 만들어줘야함)
app.use(bodyParser.urlencoded({extended:false}));

//사용자 정의 모듈
const module1 = require('./router/module1')(app,fs); //(모듈객체명) - 모듈객체사용하게 객체로 전달 

app.listen(port,()=>{
    console.log(`${port}번 포트로 서버 실행중...`);
})