const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan'); //설치 : npm i morgan
//로깅을 도와주는 모듈 -> 로깅: 현재 앱에서 일어나는 일들을 기록하는 것
const mongoose = require('mongoose'); //설치 : npm i mongoose
//데이터베이스 스키마를 생성하는 모듈

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

//데이터베이스 연결
let database;
let UserSchema;
let UserModel;

function connectDB(){
    const url = 'mongodb://127.0.0.1:27017/frontenddb';
    console.log('데이터베이스 연결 시도중...');

    mongoose.Promise = global.Promise;
    //몽구스의 프로미스 객체를 global의 프로미스 객체로 사용 -> 동기식이더라도 비동기식으로 사용
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}); //useUnifiedTopology:데이터 전달 원할
    database = mongoose.connection; //스키마가 적용된 mongoose->database
    database.on('error',console.error.bind(console,"mongoose 연결 실패!")); 
    database.on('open', ()=>{//데이터베이스 연결->데이터베이스 열렸을때
        console.log('데이터베이스 연결 성공!');
        UserSchema = mongoose.Schema({//스키마생성
            userid : String,
            userpw : String,
            name : String,
            gender : String
        });
        console.log('UserSchema 생성완료!');

        //가상의 함수를 생성 list생성시 사용
        UserSchema.static('findAll',function(){//static : 모델객체에서 사용할 수 있는 함수를 등록
            return this.find({},callback);
        });

        //모델 생성
        UserModel = mongoose.model('user',UserSchema); //모델은 스키마와 컬렉션을 연결시키는 역할 -> 모델을 컬렉션이라고 생각하면 쉬움
        console.log('UserModel이 정의되었습니다.');
    })
}

//회원가입
//localhost:3000/user/regist (post)
router.route('/user/regist').post((req,res)=>{
    console.log('/user/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;
    console.log(`userid:${userid}, userpw:${userpw}, username:${name}, gender:${gender}`);

    if(database){//데이터베이스 연결여부 확인(함수연결,데이터베이스연결,매개변수값 확인)
        joinUser(database,userid,userpw,name,gender,(err,result)=>{
            if(!err){//회원가입 실행 함수 연결여부확인
                if(result){
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.end();
                }else{
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.end();
                }
            }else{
                res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                res.write('<h2>서버에러,,,회원가입 실패</h2>');
                res.end();
            }

        })
    }else{
        res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
    
});

//로그인
//http://localhost:3000/user/login (post)
router.route('/user/login').post((req,res)=>{
    console.log('/user/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw:${userpw}`);

    if(database){
        loginUser(database,userid,userpw,(err,result)=>{
          if(!err){
              if(result){
                console.dir(result);
                const name = result[0].name;
                const gender = result[0].gender;

                res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                res.write('<h2>로그인성공</h2>');
                res.write(`<p>아이디 : ${userid}</p>`);
                res.write(`<p>이름 : ${name}</p>`);
                res.write(`<p>성별 : ${gender}</p>`);
                res.end();

              }else{
                res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                res.write('<h2>로그인실패</h2>');
                res.end();
              }
          }else{
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.write('<h2>서버오류,, 로그인실패</h2>');
            res.end();
          }
        });
    }else{
        res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
})



//회원가입 함수
const joinUser = function(database,userid,userpw,name,gender,callback){
    console.log('joinUser호출!');
    const users = new UserModel({userid:userid, userpw:userpw, name:name, gender:gender});

    users.save((err,result)=>{//모델 인스턴스 객체의 데이터를 저장
        if(!err){
            console.log('회원 document가 추가되었습니다.');
            callback(null,result);
            return;
        }
        callback(err,null);
    });  
}

//로그인 함수
const loginUser=function(database,userid,userpw,callback){
    console.log('loginUser 호출!');

    UserModel.find({userid:userid, userpw:userpw},(err,result)=>{
        if(!err){
            if(result.length > 0){
                console.log('일치하는 사용자를 찾음');
                callback(null,result);
            }else{
                console.log('일치하는 사용자가 없음');
                callback(null,null);
            }
            return;
        }
        callback(err,null);
    })
}


app.use('/',router);
app.listen(port,()=>{
    console.log(`${port}번 포트로 서버 실행중...`);
    connectDB(); //데이터베이스 연결함수 호출
})