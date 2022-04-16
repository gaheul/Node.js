//process객체 : 노드에서 항상 사용 할 수 있는 객체
//on()과 emit()메소드는 객체를 생성하거나 모듈을 가져오지 않아도 바로 사용가능

process.on('exit',() => { 
    //이벤트생성
    //on()메소드를 호출하면서 이벤트 이름을 exit로 지정하면 내부적으로 프로세스가 끝날 때를 알수 있음
    console.log('exit 이벤트가 발생');
}); 

setTimeout(()=>{
    //setTimeout(콜백함수,밀리초): 주어진 밀리초 이후에 콜백함수를 실행
    console.log('3초 후 시스템 종료'); //3초후 먼저 실행
    process.exit; //process.이벤트 ->이벤트 실행
},3000)