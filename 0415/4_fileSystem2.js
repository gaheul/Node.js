const fs = require('fs'); //파일을 다루는 모듈(읽기,쓰기)
const data ="노드 글쓰기";

fs.writeFile('text2.txt',data,'utf-8',(err)=>{ 
    //writefile은 파일 자동생성 ,비동기식
    //fs.writeFile(파일(파일명,경로,확장자명),데이터,인코딩,콜백함수(err))
    if(err){//err가 발생하면
        console.log('에러발생!');
    }else{
        console.log('저장완료/비동기');
    }
});

fs.writeFileSync('text3.txt', data, 'utf-8');
 //동기식
 //fs.writeFileSyne(파일(파일명,경로,확장자명),데이터,인코딩)
console.log('저장완료/동기'); //같이 있을 시 동기 먼저 실행
