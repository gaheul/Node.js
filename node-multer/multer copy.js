const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer'); //설치 : npm i multer
//multer : 파일 업로드 하기 위한 익스프레스 미들웨어

const static = require('serve-static'); // 설치 : npm i serve-static
//특정 폴더를 요청에 의해 직접 파일에 접근할 수 있도록 기능을 제공하는 익스프레스 미들웨어

const path = require('path'); //url(주소를) 컨트롤 하는 모듈
const logger = require('morgan'); // 설치 : npm i morgan
//로그를 관리하기 위한 라이브러리 모듈
//특정 사이트에 접속했을 때 정보(접속시간 등등) 확인하는 모듈

const port = 3000;
const app = express();
const router = express.Router();

app.use(bodyparser.urlencoded({extended:false}));
app.use('/public',static(path.join(__dirname, 'public'))); //특정폴더의 기준-> 현재폴더의 'public'
app.use('/uploads',static(path.join(__dirname, 'uploads')));
app.use(logger('dev')); // dev, short, common, bombined


const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads');
    },
    filename:(req,file,callback)=>{
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname,extension);
        callback(null,basename+"_"+Date.now()+extension);
    }
});

    const upload =multer({
        storage: storage,
        limit :{
            fiiles:5,
            fileSize : 1024 * 1024 * 100
        }
    });


    //라우터생성
   router.route('/write').post(upload.array('phonto',1),(req,res)=>{
       console.log('/write호출!');
       try {
        const title = req.body.title;
        const content = req.body.content;
        const files = req.files;//multer미들웨어를 등록하면 객체( req )에 file, files 객체가 추가
        console.dir(req.files[0]); //요청한 파일 전달
        const originalname = files[0].originalname;
        const filename = files[0].filename;
        const mimetype = files[0].mimetype;
        const size = files[0].size;

        console.log(`파일 정보 : 원본 파일명: ${originalname}, 파일 이름: ${filename}, mimetype:${mimetype}, 파일크기 : ${size}`);

        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>파일 업로드 성공</h2>');
        res.write('<hr>');
        res.write(`<p>제목:${title}</p>`);
        res.write(`<p>내용:${content}</p>`);
        res.write(`<p>원본파일명:${originalname}</p>`);
        res.write(`<p>파일명:${filename}</p>`);
        res.write(`<p>mimetype:${mimetype}</p>`);
        res.write(`<p>파일크기:${size}</p>`);
        res.write(`<p><img src= '/uploads/${filename}' width = '200'></p>`);
        res.end();
       } catch (e) {
           console.log(e);
       }
   })











app.use("/",router);

app.listen(port,()=>{
    console.log(`${port}포트로 서버 동작중...`);
});