const express = require('express');
const app = express();
const port = 3000;

//127.0.0.1:3000(실행)
//localhost:3000

app.get('/',(req,res) => { //get:함수실행
    res.send('익스프레스 서버 테스트');
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
    //'변수명':변수의 이름 / `${변수명}`: 변수의 값
});