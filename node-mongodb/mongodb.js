const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient; //설치 : npm i mongodb

const app = express();
const router = express.Router();

const port = 3000;
app.use(bodyParser.urlencoded({extended:false}));

let database; //mongodb 연결 객체명 , 데이터베이스 저장할 변수

//mongodb연결함수
function connectDB(){
    const databaseURL = "mongodb://localhost:27017" //몽고디비 프로토콜
    MongoClient.connect(databaseURL,(err,db)=>{//데이터베이스 연결 메소드
        if(!err){
            const tempdb = db.db('frontenddb'); //접근하고자하는 데이터베이스 : db.db(데이터베이스명)
            database = tempdb; //database변수에 연결된 데이터베이스 삽입
            console.log('mongodb 데이터베이스 연결성공!');
        }else{
            console.log(err);
        }
    })
}

//회원가입
//http://localhost:3000/member/regist (post)
router.route('/member/regist').post((req,res)=>{
    console.log('/member/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const age = req.body.age;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name}, age:${age}`);
    //post 방식으로 입력된 내용 확인

    if(database){//데이터베이스 연결여부 확인(함수연결,데이터베이스연결,매개변수값 확인)
        joinMember(database,userid,userpw,name,age,(err,result)=>{
            if(!err){//회원가입 실행 함수 연결여부확인
                if(result.insertedCount >0){
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>가입이 성공적으로 완료되었습니다.</p>');
                    res.end();
                }
            }else{
                res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>오류발생</p>');
                res.end();
            }

        })
    }else{
        res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
    
});

//로그인
//http://localhost:3000/member/login (post)
router.route('/member/login').post((req,res)=>{
    console.log('/member/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw:${userpw}`);

    if(database){
        loginMember(database,userid,userpw,(err,result)=>{
            if(!err){
                if(result){
                    console.dir(result); //로그인되어진 정보를 db에서 갖고옴

                    //toArray()를 사용했기때문에 ->반복문
                    const resultUserid = result[0].userid;
                    const resultUserpw = result[0].userpw;
                    const resultName = result[0].username;
                    const resultAge = result[0].age;

                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>로그인 성공</h2>');
                    res.write(`<p>${resultUserid}(${resultName})님 환영합니다.</p>`);
                    res.write(`<p>나이:${resultAge}</p>`);
                    res.end();
                }else{
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>서버오류 발생! 로그인실패했습니다.</p>');
                    res.end();
                }
            }else{
                res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>서버오류 발생! 로그인실패했습니다.</p>');
                res.end();
            }
        })
    }else{
        res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
})



//정보수정
//http://localhost:3000/member/edit (post)
router.route('/member/edit').post((req,res)=>{
    console.log('/member./edit 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.username;
    const age = req.body.age;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name}, age:${age}`);

    if(database){//database연결
        editMember(database,userid,userpw,name,age,(err,result)=>{
            if(!err){
                if(result.modifiedCount > 0){//1개 이상 수정됨
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원정보 수정 성공</h2>');
                    res.write('<p>회원정보 수정에 성공했습니다.</p>');
                    res.end();
                }else{
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원정보 수정 실패</h2>');
                    res.write('<p>서버에 오류 발생! 정보수정 실패했습니다.</p>');
                    res.end();
                }
            }else{
                res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>서버에 오류 발생! 정보수정 실패했습니다.</p>');
                res.end();
            }
        })
    }else{
        res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }

})

//회원삭제
//http://localhost:3000/member/delete (post)
router.route('/member/delete').post((req,res)=>{
    console.log('/member/delete 호출!');

    const userid = req.body.userid;

    console.log(`userid:${userid}`);

    if(database){
        deleteMember(database,userid,(err,result)=>{
            if(!err){
                if(result.deletedCount > 0){
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>데이터베이스 삭제 성공</h2>');
                    res.write('<p>회원정보 삭제 성공했습니다.</p>');
                    res.end(); 
                }else{
                    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>데이터베이스 삭제 실패</h2>');
                    res.write('<p>회원정보 삭제 실패했습니다.</p>');
                    res.end(); 
                }
            }else{
                res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                res.write('<h2>데이터베이스 삭제 실패</h2>');
                res.write('<p>서버오류! 회원정보 삭제 실패했습니다.</p>');
                res.end(); 
            }
        })
    }else{
        res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
})

//-------------------------------------------------------------------------------------------------
//회원가입 함수
const joinMember = function(database,userid,userpw,name,age,callback){
    console.log('joinMember 호출!');
    const members = database.collection('member'); //컬렉션을 객체로 가져옴
    //컬렉션을 저장 ->members.insetMany()  
    members.insertMany([{userid:userid,userpw:userpw,username:name,age:age}],(err,result)=>{
        if(!err){//insert에 에러가 발생하지 않았을경우
            if(result.insertedCount > 0){//insert가 발생했다면
                console.log(`사용자 document ${result.insertedCount}명 추가 되었음!`);
            }else{
                console.log(`사용자 document 추가되지 않음!`);
            }
            callback(null,result); //에러가 null, 성공인값이 result
            return;
        }else{
            console.log(err);
            callback(err,null)
        }
    });

}

//로그인 함수
const loginMember = function(database,userid,userpw,callback){
    console.log('loginMember호출!'); //함수명 호출 확인
    const members = database.collection('member');
    members.find({userid:userid,userpw:userpw}).toArray((err,result)=>{
        //find()는 여러개의 객체를 찾을 수 있기 때문에 배열로 toArray()를 사용
        if(!err){
            if(result.length > 0){ //1개 이상 찾음
                console.log('사용자를 찾았습니다.');
                callback(null,result);
            }else{
                console.log('일치하는 사용자가 없습니다.');
                callback(null,null);
            }
            return;
        }else{
            console.log(err);
            callback(err,null);
        }
    })
}

//회원정보 수정
const editMember = (database,userid,userpw,name,age,callback) =>{
    console.log('editMember 호출');
    const members = database.collection('member');

    members.updateOne({userid:userid},{$set:{userid:userid,userpw:userpw,username:name,age:age}},(err,result)=>{
        if(!err){
            if(result.modifiedCount >0 ){ //modifiedCount 프로퍼티 수정한 갯수
                console.log(`사용자 document ${result.modifiedCount}명 수정됨`);
            }else{
                console.log('수정된 document없음');
            }
            callback(null,result);
            return;
        }else{
            console.log(err);
            callback(err,null);
        }
    })
}

//회원정보 삭제
const deleteMember=function(database,userid,callback){
    console.log('deleteMember 호출!');
    const members = database.collection('member');
    members.deleteOne({userid:userid},(err,result)=>{
        if(!err){
            if(result.deletedCount > 0){
                console.log(`사용자 document ${result.deletedCount}명 삭제됨`);
            }else{
                console.log('삭제된 document없음');
            }
            callback(null,result);
            return;
        }else{
            console.log(err);
            callback(err,null);
        }
    })
}



app.use("/",router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중..`);
    connectDB();
});