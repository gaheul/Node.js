const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    fs.readFile('node.png',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-Type' : 'image/png'});
            res.end(data);//data=> test.html
        }
    })
    }).listen(3000,()=>{console.log('이미지 서버 실행중...')}); //port : 경로
                                                                //server : 클라이언트에게 다양한 서비스를 제공하는 컴퓨터
http.createServer((req,res)=>{
    fs.readFile('sunny.mp3',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-Type' : 'audio/mp3'});
            res.end(data);//data=> test.html
          }
    })
    }).listen(3001,()=>{console.log('사운드 서버 실행중...')});