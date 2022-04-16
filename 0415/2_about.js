//개체 로드 : require(모듈)
const http = require('http'); //http : 웹서버의 기능을 주는 모듈
const hostname = '127.0.0.1'; //노드의 기본주소
const port = 3000; //현재 실행하는 앱의 경로

//http를 작동하기 위한 함수
const server = http.createServer((/*요청,응답*/req,res)=>{//createServer메서드를 호출하여 http.Server 개체를 만듦
   /*응답해서 보여 줄것 statuscode:상태코드*/
    res.statusCode = 200 ;// 정상적으로 실행되었다.
    res.setHeader('Content-Type','text/plain'); //응답하는 코드의 설정(content-type...)
    res.end('Hello World');
})


server.listen(port,hostname,() => {
    console.log('127.0.0.1 : 3000실행');
}

) //서버를 작동했을 때 확인하는 메세지 메서드 