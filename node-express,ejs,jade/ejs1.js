const ejs = require('ejs'); //npm i ejs
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const fs = require('fs');

router.route('/ejstest').post((req,res)=>{
    fs.readFile('./ejs1.ejs','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-type':'text/html'});
            res.end(ejs.render(data));
        }
    })
});

app.use('/',router);

//에러발생시
app.all('*',(req,res)=>{
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});

app.listen(port, ()=>{
    console.log(`${port}포트로 서버 실행중...`);
})