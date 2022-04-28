const express = require('express');
const cookieParser = require('cookie-parser');
//npm i cookie-parser
const bodyParser = require('body-parser');
const fs = require('fs');
const res = require('express/lib/response');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('!@#$%^&*()'));

//로그인 -> 로그인 성공시 페이지
//       -> 로그인 실패시 페이지

//로그아웃

//처음에 열리는 로그인 페이지
app.get('/login',(req,res)=>{
    fs.readFile('login.html','utf-8',(err,data)=>{
        if(!err){
            res.writeHead(200,{'content-type':'text/html'});
            res.end(data);
        }else{
            console.log(err);
        }
    })
})

//로그인 페이지에서 정보 입력하고 서버로 전송
app.post('/loginOk',(req,res)=>{
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(userid);
    console.log(userpw);
})

    //쿠키생성
   if(userid=='admin' && userpw == '1234'){
       const expiresDay = new Date(Date.now()+(1000*60*60*24));
       res.cookie('userid',usesrpw,{expires: expiresDay,signed:true})
       res.redirect('/main');
   }else{
       res.redirect('/fail');
   }

    //로그인 처리가 완료
    app.get('/main',(req,res)=>{
        const cookieUserid=req.signedCookies.userid;
        console.log(cookieUserid);
        if(cookieUserid){
            fs.readFile('main.html','utf-8',(err,date)=>{
                res.writeHead(200,{'content-type':'text/html'});
                res.end(data);
            })
        }else{
            res.redirect('/login');
        }
    });

//처음부터 로그인 실패
app.get('/fail',(req,res)=>{
    fs.readFile('fail.html','utf-8',(err,date)=>{
        res.writeHead(200,{'content-type':'text/html'});
        res.end(data);
    })
})

//로그인 성공 후 로그아웃 ->쿠키삭제
app.get('/logout',(req,res)=>{
    res.clearCookie('userid');
    res.redirect('/login');
})


app.listen(port,()=>{
    console.log(`${port}포트로 서버 실행중..`);
});