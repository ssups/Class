const express = require("express");
const app = express();
const PORT = 4000;
const ejs = require("ejs");
const path = require("path"); // path는 기본 경로를 다룰수 있게 도와주는 모듈
const { sequelize } = require("./model"); // 이렇게 폴더경로까지만 적으면 그안에있는 index.js 를 기본으로 불러옴
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
