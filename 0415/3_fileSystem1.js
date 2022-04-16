const fs = require('fs'); //파일을 다루는 모듈(읽기,쓰기)

//fs모듈 사용
fs.readFile('text1.txt','utf-8',(err,data)=>{ 
    //readfile:비동기식/ fs.readFile(파일경로,인코딩,콜백함수(err:작업에 실패하면 나타나는 오류,data:파일의 내용))
    //예외처리 비동기식 : if  동기식 : try catch
    if(err){
        console.log(err);
    }else{
        console.log(`비동기식으로 읽음: ${data}`);
    }
})

const text = fs.readFileSync('text1.txt','utf-8');
//readFileSync: 동기식 / fs.readFileSync(파일경로,인코딩)
console.log(`동기식으로 읽음: ${text}`); //동기식과 비동기식이 같이있으면 동기식이 먼저실행
