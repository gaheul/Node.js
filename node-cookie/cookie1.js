const express = require('express');
const cookieParser = require('cookie-parser');
//npm i cookie-parser

const app = express();
const port = 3000;

app.get('/setCookie',(req,res)=>{
    console.log('setCookie 호출');
    res.cookie('member',{// 쿠키 설정하기 :cookie(키,속성/값,옵션) 
                         id:'apple',
                         name:'김사과',
                         gender:'female'
    },{
        maxAge : 1000 * 60 * 60 //만료시간 설정 /60(초)60(분) *24(24시간) *7(7일)
    }); //쿠키 생성
    res.redirect('/showCookie'); //이동
});

app.get('/showCookie', (req,res)=>{
    console.log('showCookie 호출');
    res.send(req.cookies); //서버에서 저장된 정보를 사용자에게 전달
                           //쿠키 조회 : req.cookies.cookies키 ->일반쿠키
    res.end();
})

app.listen(port,()=>{
    console.log(`${port}포트로 서버 실행중..`);
});