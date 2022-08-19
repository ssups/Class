// 모듈 사용할것
// express, ejs, sequelize 내장 모듈 path, 개발할때 쓸것 nodemon
// path 기본 경로를 다룰 수 있게 도와주는 모듈 입니다.

const express = require("express");
const ejs = require("ejs");
const path = require("path");
// 이렇게 폴더 경로까지만 잡으면 index 탐색 찾은 index파일을 기본을 가져옴
// 이름이 index여야만 한다.
const { sequelize, User, Post } = require("./model");

// 서버 객체 만들고
const app = express();

// path.join함수는 매개변수를 받은 문자열들을 주소처럼 합쳐줌
// path.join('a','b') = a/b 주소처럼 만들어줌
// app2.js가 있는 위치 __dirname
// views 폴더까지의 경로가 기본값 렌더링할 파일을 모아둔 폴더
// app.set express에 값을 저장가능 밑에 구문은 views키에 주소값 넣은부분
app.set("views", path.join(__dirname, "view"));

// 랜더링하는 기본 엔진을 ejs 처럼 사용한다고 알려주는것.
// engine('파일의 타입', ejs 그릴때 방식을) 뷰 엔진이 그릴때
// app.get("/", (req, res) => {
//   //fs 모듈로 파일을 가져왔다 치고
//   res.send(ejs.render(data,{e}));
// });
// html의 뷰 엔진을 ejs 랜더링 방식으로 바꾼다.
app.engine("html", ejs.renderFile);

// 뷰 엔진 설정을 html을 랜더링 할때 사용 하겠다.
app.set("view engine", "html");

// body 객체 사용
app.use(express.urlencoded({ extended: false }));

// 시퀼라이즈 구성 해보자 연결 및 테이블 생성 여기가 처음 매핑
// sync 함수는 데이터 베이스 동기화 하는 사용 필요한 테이블을 생성해준다.
// 필요한 테이블들이 다 생기고 매핑된다. 절대 어긋날 일이 없다.
// 테이블의 내용이 다르면 오류를 밷어냄
// 여기서 CREATE TABLE 문이 여기서 실행된다는것.
// force 강제로 초기화 시킬것인지. (테이블 내용을 다 비워줄것인지)
sequelize
  .sync({ force: false })
  .then(() => {
    // 연결 성공
    console.log("DB연결 성공");
  })
  .catch((err) => {
    // 연결 실패
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  // create이 함수를 사용하면 해당 테이블에 컬럼을 추가할수 있다.
  const { name, age, msg } = req.body;
  const create = User.create({
    // name 컬럼의 값
    name: name,
    // age 컬럼의 값
    age: age,
    // msg 컬럼의 값
    msg: msg,
  });
  // 위의 객체를 전달해서 컬럼을 추가할수있다
  // 자바스크립트 구문으로 SQL 동작을 시킬수 있다.
  // 쿼리문 짤 필요가 없어진다.
});

app.get("/user", (req, res) => {
  // 여기서는 추가된 유저들을 봐야하니까
  // 조회를 하는데 전체를 조회해야한다.
  // findAll 전체를 찾는다
  // findAll은 매개변수로 검색할 옵션
  User.findAll({})
    .then((e) => {
      res.render("page", { data: e });
    })
    .catch(() => {
      // 실패하면 에러 페이지를 보여주면 된다.
      res.render("err");
    });
});

app.post("/create_post", (req, res) => {
  const { name, text } = req.body;
  console.log(name, text);
  // User테이블이랑 Post랑 연결되있는데
  // User id 기본키로 되어있고 Post는 user_id
  // 테이블에서 하나의 컬럼값 가져온다.
  // findOne 함수 하나를 검색할때 사용
  // find 매개변수로 검색할 옵션
  User.findOne({
    where: { name: name },
  }).then((e) => {
    Post.create({
      msg: text,
      // foreignkey user_id이거고 유저의 아이디와 연결한다고 정의를 해놓기때문에
      // 말해놓았다 모델에 userㄴ.js와 posts.js 에 만든 모델에
      user_id: e.id,
    });
  });
});

app.get("/view/:name", (req, res) => {
  User.findOne({
    where: {
      name: req.params.name,
    },
    include: [
      {
        model: Post,
      },
    ],
  }).then((e) => {
    e.dataValues.Posts = e.dataValues.Posts.map((i) => i.dataValues);
    const Posts = e.dataValues;
    //console.log(e.dataValues);
    res.render("view", { data: Posts });
  });
});

app.post("/view_updata", (req, res) => {
  const { id, msg, text } = req.body;
  console.log(id, msg, text);
  Post.update(
    { msg: text },
    {
      where: { id: id, msg: msg },
    }
  );
});

app.get("/del/:id", (req, res) => {
  Post.destroy({
    where: { id: req.params.id },
  }).then(() => {
    res.redirect("/user");
  });
});

// 서버 연결
app.listen(3000, () => {
  console.log("잘 열림");
});
