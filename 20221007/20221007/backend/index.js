const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize, User } = require("./public");

// cors 에러 해결 방법(보안상의 문제때문에 발생)
// cors 설정을 해주어야 한다.

// cors란 브라우저의 보안정책
// cors는 부라우저가 서로 다른 도메인/포트의 서버로 요청했을때 발생한다.
// 접근을 허용해줘야한다.
// cors 설치
// npm i cors
// cors 사용
// app.use(cors({
//  origin: '*' -> 누가요청하든 허용
//  origin: true -> 들어오는 요청 도메인/포트가 자동으로 origin에 들어간다.
//  origin: '도메인주소' -> 실제로 서비스되는 도메인을 입력해줘서 해당 도메인만 접근할수 있게 허용한다.
//  credential: true(false) -> (사용자 인증이 필요한 리소스 접근을 허용해줄지 안할지 쿠키같은거 등등..)
// }))

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결이 잘됐다.");
  })
  .catch(err => {
    console.log(err);
  });

const options = {
  origin: "http://localhost:3000", // 이 주소를 허용해줬고
  // 배포한 이후엔 그 도메인을 넣어주면 된다.
  // 지금은 로컬에서 작업하기 때문에 localhost 주소를 사용한것
};

app.use(express.json()); // 전달받은 객체 형태를 해석해서 사용할수 있게 설정하는거
app.use(cors(options));

app.get("/", (req, res) => {
  res.send({ id: "aaa" });
});

app.post("/signUp", async (req, res) => {
  let { id, pw } = req.body;
  const users = await User.findOne({
    where: { user_id: id },
  });
  if (!users) {
    User.create({
      user_id: id,
      user_pw: pw,
    }).then(() => {
      res.send("가입완료");
    });
  } else {
    res.send("동일한 아이디가 있음");
  }
});

app.listen(8000, () => {
  console.log("8000 포트에 서버 열림");
});
