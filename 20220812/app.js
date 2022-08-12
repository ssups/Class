// 입장 토큰만 사용해서 로그인 검증을 했는데

// Acess Token만 쓴 방식은 (08/09 폴더 방식) ======================

// 1. 이용자가 로그인 시도를 하고.
// 2. 서버에서 이용자를 확인하고 입장권을  발급하는데,
//    JWT토큰 인증정보를 payload에 할당하고 생성
// 3. 생성한 토큰을 클라이언트에 반환해주고 클라이언트가 이 토큰을 가지고 있는다.
// 4. 클라이언트에서 권한을 인증 요청할때 이 토큰을 같이 보낸다.
// 5. 서버는 토큰을 확인하고 payload의 값(인코딩되어 있는 값)을 디코딩 해서
//    사용자의 권한을 확인하고(입장권이 맞는지) 데이터를 반환한다.
// 6. 토큰이 정상인지(토큰이 썩었는지 혹은 입장권 시간이 지났는지) 확인하고
// 7. 날짜가 지난 토큰이면 새로 로그인 시킨다. 토큰 재발급(입장권을 새로 발급)

// ============================================================

// Refresh Token와 같이 사용하면 ==================================

// Access Token만 쓰면 인증보안에 취약할수 있고 다른사람이 악의적으로 토큰을
// 취득하여 접속하면 토큰의 유효기간이 끝나기 전까지는 막을수 없다.(이미 입장권 보여주고 입장함)
// Acess Toekn의 유효기간을 짧게하면 유효기간이 짧으니깐 로그인을 자주 해야하는 문제가 생기는데(사용자가 이용하는데 불편함)
// Refresh Token과 Access Token은 둘다 JWT토큰이고
// Refresh token은 유효기간을 길게 주고 Access Token이 유효기간이 끝났을때
// 재발급해주는 역할만 한다.
// Refresh Token은 쿠키에 담이서 저장됨

// Access Token은 보안성 때문에 유효기간을 짧게 잡는데 그러면 이용자의 로그인이 너무 짧은 주기로 풀리기 때문에 불편하다
// 따라서 Access Token을 일정기간동안 계속 자동으로 재발급 해주는 Refresh Token을 사용하는 것이다.

// 보통 Access Token을 30분만 주면
// Refresh Token의 유효기간을 하루 주고
// Access token의 유효기간이 끝나면 Refresh Token의 유효기간을 확인하고
// Access token을 재발급 해준다.

// ============================================================

// Access token과 Refresh Token둘다 이용한 인증방식========================

// 1. 이용자 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를 payload에 할당해서 생성한다.
//    Refresh token도 생성해서 서버에 저장하고 두 토큰 모두 클라이언트에 반환한다.
// 3. 클라이언트도 두 토큰을 저장한다.
// 4. 클라이언트가 권한 인증이 필요해서 요청하면 Access Token을 전달해서 요청한다.
// 5. 서버는 전달받은 토큰을 확인하고 payload의 인코딩된 값을 디코딩해서 사용자의 권한을 확인한다.
// 6. 만약에 토큰이 정상적인지 확인을 하고(썩은토큰인지)
// 7. 날짜가 지난 토큰이면 새로 로그인 시켜서 토큰을 발급받게 한다.(만료된 Access Token과 Refresh Token을 헤더에 실어서 서버에 보다.)
// 8. 서버는 ACccess Token과 Refresh Token을 확인하고 Refresh Token이 만료되지 않았으면,
//    새로운 Access Token을 발급해서 클라이언트에 전달한다.

// ============================================================

// express, fs, dotenv, cookie_parser, jsonwebtoken, nodemon 사용

const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const dot = require("dotenv");
dot.config();
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { serialize } = require("v8");
const { addAbortSignal } = require("stream");

// body-parser 필요없이 body객체를 쓸 수 있게하는 express 기능
app.use(express.urlencoded({ extended: false }));
// 헤더에 쿠키를 추가하기위해서 사용(로컬쿠키 말하는듯?)
app.use(cookie());
// view의 이름으로 view 폴더의 경로를 설정
// app.use("/view", express.static("view"));

const user = {
    id: "soon",
    password: "123",
};

app.listen(PORT, () => {
    console.log(PORT, "에 서버 열림");
});

app.get("/", (req, res) => {
    fs.readFile("view/login.html", "utf-8", (err, data) => {
        console.log(err);
        res.send(data);
    });
});

app.post("/login", (req, res) => {
    const { user_id, password } = req.body; // const user_id = req.body.user_id 이거임
    if (user_id === user.id && password === user.password) {
        // 아이디랑 비밀번호 맞는지 검증
        const accessToken = jwt.sign(
            {
                id: user.id,
                // 타입설정은 따로 안해주면 jwt로 인식함
            },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "5m",
            }
        );
        // refreshToken 발급
        const refreshToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: "1d",
            }
        );
        // 쿠키의 이름은 refresh 유효시간은 하루
        res.cookie("refresh", refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
        return res.send(accessToken);
    } else {
        return res.send("아이디 비밀번호 오류");
    }
});

app.post("/refresh", (req, res) => {
    // ?. 뒤에 오는 키값이 있으면 먼저 확인하고 값반환
    // req.cookies?.refresh -> refresh 키값이 없어도 크러쉬 방지
    if (req.cookies?.refresh) {
        const refreshToken = req.cookies.refresh;
        res.send(refreshToken);
    } else {
    }
});
