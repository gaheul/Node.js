const express = require('express');
//post 데이터를 전달받기 위해 사용
const bodyPaser = require('body-parser');

const app = express(); 
const port = 3000; //경로

const router = express.Router(); //라우터 객체 선언
                                 //router : 기능을 찾아가는 경로

app.use(bodyPaser.urlencoded({extended: false})); //파싱(분석)
//urlencoded({extended:false}):"body 안의 데이터가 'application/x-www.form-urlencoded' 방식으로 인코딩 되었으니 알고 있어라" 


//http://localhost:3000/member/login
//http://127.0.0.1:3000/member.login
router.route('/member/login').post((req,res) => {
    console.log('/member/login 호출');
});

//http://localhost:3000/member/regist
//http://127.0.0.1:3000/member.regist
router.route('/member/regist').post((req,res) => {
    console.log('/member/regist 호출');
});

//http://127.0.0.1:3000/member/about
router.route('/member/about').get((req,res)=>{
    console.log('/member/about 호출');
});

app.use('/',router);

//에러가 발생했을 때
app.all('*',(req,res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});

app.listen(port, ()=>{
    console.log(`${port} 포트로 서버 실행중...`);
})