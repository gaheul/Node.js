
module.exports = (app,fs) => {

 app.get('/',(req,res)=>{
     res.render('index.ejs',{
         length:10
        });


});

app.get('/about',(req,res)=>{
    res.render('about.html');
       });


    app.get('/list',(req,res)=>{
        fs.readFile(__dirname + '/../data/memeber.json','utf8',(req,res)=>{
            if(!err){
                console.log(data);
                res.writeHead(200,{'content-type':'text/json;charset=utf8'});
                res.end(data);
            }else{
                console.log(err);
            }
        })
    });

    //localhost:3000/getMembaer/apple
    app.get('/getMember/:userid',(req,res)=>{
        fs.readFile(__dirname + '/../data/member.json','utf8',(err,data)=>{
            if(!err){
                console.log(data);
                res.writeHead(200,{'content-type':"text/json;charset=utf8"});
                res.end(data);
            }else{
                console.log(err);
            }
        })
    });

        //패턴정리
        //이름 잘못 입력하면 자동생성됨

        /*
        CRUD 연산
         CREATE : 생성(POST) 
         READ : 조회(GET)
         UPDATE : 수정(PUT)
         DELETE : 삭제(DELETE)
        */
    
         //JSON(JavaScript Object Notation)
         //:데이터를 교환하고 저장하기 위해 만들어진 텍스트 기반의 데이터 교환 표준

        //JSON파일 불러오는 방법
        /* json.parse() 
           : JSON 포맷으로 되어있는 문자열을 JSON 객체로 변환
           : JSON문자열을 매개변수로서 수용하고, 일치하는 자바스크립트 객체로서 변환
            JSON.parse(String 문자열)
        */

        /*  JSON.stringify() 
           : JSON 객체를 JSON 포맷의 문자열로 변환 
           : 객체를 매개변수로서 수용하고, JSON 문자열 형태로 변환
            JSON.stringify(JSON객체)
        */
       

        

        //if(memeber(json파일)[userid]조건)-> true/false로 나옴
    
    //회원가입
    app.post('/joinMember/:userid',(req,res)=>{
        const result = {};
        const userid = req.params.userid;

        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 100;
            result["msg"] ="매개변수가 전달되지 않음";
            res.json(result);
            return false;
        }

    //아이디 중복검사
    fs.readFile(__dirname + "/../data/member.json", "utf8",(err,data)=>{
        const member = JSON.parse(data); //읽어들인 jSON 파일을 객체로 변환
        if(member[userid]){ //member객체에 아이디 있는지 검사
            result["success"] = 101; //101: 중복
            result["msg"] = "중복된 아이디";
            res.json(result);
            return false; //더이상 진행이 안되고 앱 종료
        }
        console.log(req.body); //확인
    

    member[userid] = req.body; //아이디 전달
    fs.writeFile(__dirname + "/../data/member.json",JSON.stringify(member, null, '\t'),'utf-8',(err,data)=>{
        //JOSN.stringify
        //객체를 매개변수로서 수용하고, JSON 문자열 형태로 변환(저장)
        if(!err){
            result["success"] = 200;
            result["msg"] = "성공";
            res.json(result);
        }else{
            console.log(err);
        }
        })
      });
    });

    //회원수정
    //http://localhost:3000/updateMember/apple1
    app.put('/updateMember/:userid',(req,res)=>{
        const result ={};
        const userid = req.params.userid;

         //오류검사 : 패스워드 네임이 입력여부를 확인하고 없을 경우 오류 처리를 위한 부분
         if(!req.body["password"] || !req.body["name"]){
            result["success"]= 100; //100 : 실패 / result[""] -> {}안에 ""로 나타냄
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result);
            return false; //더이상 진행이 안되고 앱 종료
        }

        //수정하기 위해 json파일호출
        fs.readFile(__dirname + "/../data/member.json","utf8",(err,data)=>{
            if(!err){
                const member = JSON.parse(data); //JSON 파일로 저장
                member[userid] = req.body; //전달한 정보
                fs.writeFile(__dirname + "/../data/member.json",JSON.stringify(member,null,'\t'),'utf8',(err,data)=>{
                    //fs.writeFile 예외처리
                    if(!err){
                        result["success"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }else{
                        console.log(err);
                    }
                })
            }
        })
    });

    //회원정보 삭제
    app.delete('/deleteMember/:userid',(req,res)=>{
        let result = {};
        fs.readFile(__dirname + "/../data/member.json","utf8",(err,data)=>{
            const member = JSON.parse(data);
             //아이디가 저장되어 있는지 유무 상태 확인
            if(!member[req.params.userid]){ //아이디가 없다면
                result["success"] = 102;
                result["msg"] = "사용자를 찾을 수 없음";
                res.json(result);
                return false;
            }
            delete member[req.params.userid]; //아이디가 존재하면 ->데이터를 삭제
            fs.writeFile(__dirname + "/../data/member.json",JSON.stringify(member,null,'\t'),'utf8',(err,data)=>{
                result["success"] = 200;
                result["msg"] = "성공";
                res.json(result);
            })
        })
    });

    

      
    
}
