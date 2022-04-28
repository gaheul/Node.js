const express = require('express');
//post 데이터를 전달받기 위해 사용
const bodyPaser = require('body-parser');

const app = express(); 
const port = 3000;

app.use(bodyPaser.urlencoded({extended: false})); //파싱(분석)
app.use((req,res) => { //post방식으로 데이터를 주고받기 위해 구현해놓음
    const userid = req.body.userid; //요청하는 페이지 body안에 있는 userid
    const userpw = req.body.userpw;
    const name = req.body.name;

    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    res.write('<h2>익스프레스 서버에서 응답하는 메세지입니다.</h2>');
    res.write(`<p>아이디 : ${userid}</p>`); //postman으로 받음
    res.write(`<p>비밀번호: ${userpw}</p>`);
    res.write(`<p>이름: ${name}</p>`);
    res.end();
});

app.listen(port, ()=>{
    console.log(`${port} 포트로 서버 실행중...`);
})