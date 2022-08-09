const { doesNotThrow } = require("assert");

const express = require("express"),
    app = express(),
    PORT = 4000,
    fs = require("fs"),
    bodyParser = require("body-parser"),
    jwt = require("jsonwebtoken"),
    session = require("express-session"),
    FileStore = require("session-file-store")(session),
    dot = require("dotenv");
dot.config();
// session;

app.listen(PORT, () => {
    console.log(PORT, " 번 서버에 열림");
});

// 정적 폴더인 css폴더를 사용하겠다
app.use(express.static("css"));
// bodyParser 사용
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
// session 사용
app.use(
    session({
        secret: "blablabla",
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

app.get("/", (req, res) => {
    fs.readFile("index.html", "utf-8", (err, data) => {
        res.send(data);
    });
});
app.post("/login", (req, res) => {
    let loginData = req.body, // body-parser를 통해서 입력한 input value를 객체로 받아옴
        userId = loginData.userId,
        userPw = loginData.userPw,
        key = process.env.KEY,
        token = jwt.sign(
            {
                type: "JWT",
                name: userId,
                pw: userPw,
            },
            key, //질문? 여기에 아무값이나(문자)를 넣어도 어차피 암호화되서 뜨는데 왜 굳이 env파일을 쓰지?, js를 통해서 env 파일에 값을 추가할수 있나?
            {
                expiresIn: "1h",
                issuer: "someone",
            }
        ),
        tokenData = {
            msg: "유저정보토큰",
            token,
        };
    req.session[userId] = token;
    console.log(loginData);
    res.send(
        `토큰데이터: ${JSON.stringify(tokenData)}, 세션정보: ${
            req.session[userId]
        }`
    );
});
// app.get("/login", (req, res) => {
//     req.session[]
// });
