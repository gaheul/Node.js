const http = require('http');

http.createServer((req,res)=>{
    //writeHead : response 객체의 메소드에서 헤더 정보를 응답에 작성해서 내보내는 것 
    //res.writeHead(상태코드,헤더정보)
    res.writeHead(200,{'content-Type':'text/html'}); 
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>http 모듈 테스트</title></head><body><h2>http 모듈 테스트</h2><p>처음으로 실행 노드서버</p></body></html>');
    //res.end() : 응답종료 / res.end(응답본문): 응답본문을 클라이언트로 보내고 응답종료
}).listen(3000,()=>{console.log('서버 실행중...')});// .listen(port번호)