const express = require("express");
const app = express();
const PORT = 4000;
const ejs = require("ejs");
const path = require("path"); // path는 기본 경로를 다룰수 있게 도와주는 모듈
const { sequelize, User, Post } = require("./model"); // 이렇게 폴더경로까지만 적으면 그안에있는 index.js 를 기본으로 불러옴
// model안에 index.js에서 db 객체를 export했으니깐 그안에 있는 sequelize 키벨류만 빼올라면 객체형태로 적어줘야함

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에 서버 열림`);
});

// path.join()함수는 인수로 받은 문자열들을 주소처럼 합쳐줌
// ex) path.join('page','join') -> page/join 이런식으로 합쳐줌
// views 폴더까지의 경로가 기본값 렌더링할 파일을 모아둔 폴더
// app.set express에 값을 저장가능 및에 구문은 views키의 벨류에 주소값을 넣어 저장시키는부분
// app 자체는 하나의 거대한 객체임 app.set 이렇게 쓰면 app객체에 있는 set 키값의 벨류를 불러오는거
// set에 담겨져있는 벨류는 함수인데 app객체를 수정시켜 주는 함수임
app.set("views", path.join(__dirname, "view"));

// 렌더링하는 기본 엔진을 ejs처럼 사용한다고 알려주는것.
// engine('파일의 타입', ) 뷰 엔진이 그릴때
// app.get('/',(req,res)=>{
//     // fs모듈로 파일을 가져왔다 치고
//     res.send(
//         ejs.render(data,{e})
//     )
// })
// 원래 위처럼 썻던거를
// html의 뷰 엔진을 ejs 렌더링 방식으로 바꾼다.
app.engine("html", ejs.renderFile);

// 뷰 엔진 설정을 html을 렌더링 할때 사용하겠따.
app.set("view engine", "html");

// body 객체 사용
app.use(express.urlencoded({ extended: false }));

// 시퀄라이즈 구성해보자 연결 및 테이블 생성 여기가 처음 매핑
// sync 함수는 데이터베이스 동기화 하는데 사용, 필요한 테이블을 생성해준다.
// 여기서 필요한 테이블들이 다 생기고 매핑된다. 절대 어긋날 일이 없다.
// 테이블의 내용이 다르면 오류를 뱉어냄
// 여기서 CREATE TABLE 문이 여기서 실행된다는 것
// force 강제로 초기화 시킬것인지 설정. (테이블 내용을 다 비워줄것인지)
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DB연결 성공");
    })
    .catch(err => {
        console.log(err);
    });

app.get("/", (req, res) => {
    // 위에 app.use()구문 때문에 경로가 알아서 view 폴더로 잡혀있다.
    res.render("create");
});
app.post("/create", (req, res) => {
    // create함수 -> sequelize에 있는 메서드
    // create함수 사용하면 해당 테이블에 컬럼을 추가할수 있다.
    // 쿼리문 대신 사용 가능
    const { name, age, msg } = req.body;
    const create = User.create({
        // 컬럼에 각각 대입
        name,
        age,
        msg,
    });
});
// 클라이언트에서 입력한 데이터 받아서 넘기기
app.get("/user", (req, res) => {
    // 여기서는 추가된 유저들을 봐야하니깐
    // 전체를 조회한다.
    // findAll 사용
    // findAll은 인수로 검색할 옵션을 받는다.
    // 인수에 아무것도 안적으면 데이터 다가지고온다.
    User.findAll({})
        .then(e => {
            // page.html에 객체형태로 뽑은 데이터 전송
            res.render("page", { data: e });
        })
        .catch(() => {
            // 실패하면 에러 페이지를 보여주면 된다.
            res.render("데이터불러오기 실패~!");
        });
});

app.post("/create_post", (req, res) => {
    const { name, text } = req.body;
    console.log(name, text);
    // User테이블이랑 Post랑 연결되있는데
    // User는 소스키가 id(기본키였고) Post는 user_id
    // 테이블에서 하나의 컬럼값 가져온다.
    // findOne하나를 검색할때 사용
    // find는 인수로 검색할 옵션
    User.findOne({
        where: { name: name },
    }).then(e => {
        Post.create({
            msg: text,
            // foreignkey는 user_id 이고 유저의 아이디와 연결한다고 정의를 해놓았기때문에
            user_id: e.id,
        });
    });
});
