const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session'); //설치 npm i express-session
const fs = require('fs');
const req = require('express/lib/request');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false})); 
app.use(expressSession({
    secret:'!@#$%^&*()', //입력하는 데이터 암호화하기 위한 특수문자
    resave: false, 
    saveUninitialized: true //session 저장되기전 미리 session에 대한 정보를 저장할지말지/ 초기화할지말지 
}))

app.get('/login',(req,res)=>{
    fs.readFile('login.html','utf-8',(err,data)=>{ //객체가 만들어짐
        if(!err){
             res.writeHead(200,{'content-type':'text/html'});
             res.end(data);
        }else{
             console.log(err); //데이터를 실행
        }
    });
})

app.post('/loginOk',(req,res)=>{
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    // console.log(userid);
    // console.log(userpw);


    if(userid == 'admin' && userpw == '1234'){ //로그인 성공
    req.session.member = {
        id:userid,
        userpw : userpw,
        isauth: true //인증으 되었는지 
    }
        
        res.redirect('/main'); //메인화면으로 이동
    }else{//로그인 실패
        res.redirect('/fail'); //로그인 실패 화면으로 이동
    }

})

app.get('/main',(req,res)=>{
    if(req.session.member){ //session에 저장된 정보가 있다면
        fs.readFile('main.html','utf-8',(err,data)=>{
            res.writeContinue(200,{'content-type':'text/html'});
            res.end(data);
        })
    }else{
        res.redirect('/login');
    }
});

app.get('/fail',(req,res)=>{ //app.get:정보전달
    fs.readFile('fail.html','utf-8',(err,data)=>{ //fs.readfile : 눈에 보이는 부분
        res.writeHead(200,{'content-type':'text/html'});
        res.end(data);
    });
});

//로그인 성공 후 로그아웃 ->쿠키삭제
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{ //세션삭제
        console.log('세션이 삭제되었습니다.')
    }) // 세션삭제됨
    res.redirect('/login');
});

app.listen(port,()=>{
    console.log(`${port}포트로 서버 실행중...`)
})