const fs = require('fs'); //파일을 다루는 모듈(읽기,쓰기)

//비동기처리는 예외처리를 할 필요가 없다
fs.readFile('text11.txt','utf-8',(err,data) => {
    if(err){
        console.log('에러발생!/비동기');
    }else{
        console.log(data);
    }
});

//동기식은 text11파일이 없기때문에 에러발생!/동기 
try{
    const text = fs.readFileSync('text11.txt','utf-8');
    console.log(`동기식으로 읽음 : ${text}`);
}catch(e){
    console.log('에러발생!/ 동기');
}
