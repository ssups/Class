// 입장 토큰만 사용해서 로그인 검증을 했는데

// Access Token만 쓴 방식은

// 1. 이용자가 로그인 시도를 하고.
// 2. 서버에서 이용자를 확인하고 입장권을 발급하는데
// JWT토큰 인증정보를 payload에 할당하고 생성
// 3. 생성한 토큰을 클라이언트에 반환해주고 클라이언트가 이 토큰을 가지고 있는다.
// 4. 클라이언트에서 권한을 인증 요청할때 이 토큰을 같이 보낸다.
// 5. 서버는 토큰을 확인하고 payload의 값 인코딩되어 있는 값을 디코딩해서
// 사용자의 권한을 확인하고 (입장권이 맞는지) 데이터를 반환한다.
// 6. 만약에 토큰이 정상적인지 확인하고(토큰이 썩었는지 입장권 시간이 지났는지)
// 7. 날짜가 지난 토큰이면 새로 로그인 시킨다. 토큰 재발급(입장권 새로 산다.)

// Refresh Token와 같이 사용하면
// Access token 만쓰면 인증보안에 취약할수 있고 다른사람이 악의적으로 토큰을
// 취득하면 토큰의 유효기간이 끝나기 전까지는 막을수 없다.(이미 입장권 보여주고
// 입장함) Access token의 유효기간을 짧게하고 유효기간이 짧으니까 로그인을 자주
// 해야하는 문제가 생기는데 (사용자가 이용하기 힘들다.) Refresh token으로 해결
// 할수가 있다. Refresh token과 Access token은 둘다 JWT토큰이고
// Refresh token은 유효기간을 길게 주고 Access token이 유효기간이 끝났을때
// 발급해주는 역활만 한다.

// 보통 Access token을 30분만 주면
// Refresh token의 유효기간을 하루 주고
// Access token의 유효기간이 끝나면 Refresh token의 유효기간을 확인하고
// Access token을 재발급 해준다.

// Access token과 Refresh둘다 이용한 인증 방식
// 1. 이용자 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를 payload에 할당해서 생성하고
// Refresh token도 생성해서 서버에 저장하고 두토큰 모두 클라이언트에 반환한다.
// 3. 클라이언트도 두 토큰을 저장한다.
// 4. 클라이언트가 권한 인증이 필요해서 요청하면 Access Token을 전달해서 요청한다.
// 5. 서버는 전달받은 토큰을 확인하고 payload의 인코딩된 값을 디코딩해서 사용자의 권한을
// 확인한다.
// 6. 만약에 토큰이 정상적인지 확인을 하고(썩은 토큰인지)
// 7. 날짜가 지난 토큰이면 새로 로그인 시켜서 토큰을 발급 받게 한다.(만료 된
// Access token과 Refresh token을 해더에 실어서 서버에게 보낸다.)
// 8. 서버는 Access token과 Refresh token을 확인하고 Refresh token이
// 만료 되지 않았으면 새로운 Access token을 발급해서 클라이언트에 전달한다.

// dotenv, express, cookie-parser, jsonwebtoken, fs, nodemon

// 모듈 설치
// -------------------------------------------------
// npm i dotenv express cookie-parser jsonwebtoken
// npm i --save-dev nodemon
// -------------------------------------------------
// 모듈 가져오기
const express = require("express");
const dot = require("dotenv");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// .env파일 사용하기위해 설정
dot.config();

// 서버 객체 생성
const app = express();

// body 객체를 사용하기 위해 설정
app.use(express.urlencoded({ extended: false }));

// 헤더에 쿠키를 추가위해서 사용
app.use(cookie());

// /view의 이름으로 view 폴더의 경로를 설정
// app.use("/view", express.static("view"));

// 사용자 정보 객체 하나 더미
const user = {
  id: "soon",
  password: "123",
};

app.get("/", (req, res) => {
  fs.readFile("view/login.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  //아이디 비밀번호
  // req.body 객체 안에 있는
  // 키 값으로 아이디 비밀번호 값 받아 놓기
  const { user_id, password } = req.body;
  // 아이디 비밀번호 검증 맞는지
  if (user_id === user.id && password === user.password) {
    // access token 발급
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "5m",
      }
    );
    // refresh token 발급
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );
    // 쿠키의 이름은 refresh 유효 시간은 하루
    res.cookie("refresh", refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
    // fs에 readFile함수를 사용해서 join.html 불러온다. res의 send 함수로 응답
    fs.readFile("view/join.html", "utf-8", (err, data) => {
      res.send(accessToken + data);
    });
  } else {
    return res.send("아이디 비밀번호 오류");
  }
});

app.post("/refresh", (req, res) => {
  // ?. 뒤에 오는 키값이 있으면 먼저 확인하고 값 반환
  // req.cookies?.refresh refresh키값이 없어도 크래쉬 방지
  if (req.cookies?.refresh) {
    const refreshtoken = req.cookies.refresh;
    // refresh token이 정상인지 확인
    jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
      // err가 있으면 refresh token이 썩었기 때문에 다시 로그인 시킨다.
      if (err) {
        res.send("로그인을 다시 해주세요");
      } else {
        // err가 없고 정상적인 토큰이면 다시 access token 발급
        // jwt에 sign함수로 토큰 다시 생성
        const accessToken = jwt.sign(
          {
            // 토큰의 payload 값들
            id: user.id,
          },
          // 토큰을 암호화 시킬 키값
          process.env.ACCESS_TOKEN_KEY,
          {
            // 토큰의 유효기간 10분
            expiresIn: "10m",
          }
        );
        res.send(accessToken);
      }
    });
  } else {
    res.send("다시 로그인 해주세요");
  }
});

app.listen(3000, () => {
  console.log("서버 열림");
});

// access token을 왜 짧게 하고 새로 로그인정보를 갱신해줄까.
// 해커가 악의적으로 access token을 얻었을때 로그인이 이미 되어있는 상태라
// 막기가 힘들어서 access token의 유효기간을 짧게하고 refresh token의 유효기간을
// 길게해서 사용자가 로그인을 자주 하는 불편함을 보완해준다.
// 그리고 악의적으로 탈취된 access token을 갱신해주는 역활도 해준다.
// refresh token을 다시 확인 시켜서.
// 좀더 해킹이 힘들게