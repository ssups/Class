// 로그인 만들어 보자

// express, dotenv, fs, jsonwebtoken, express-session, mysql2
// 개발용으로 nodemon

// npm 초기화
// packjson 생성
// ----------------------------------------------------
// npm init -y
// ----------------------------------------------------

// 모듈 설치
// ----------------------------------------------------
// npm i express dotenv jsonwebtoken express-session mysql2
// ----------------------------------------------------
// 개발용 설치
// ----------------------------------------------------
// npm i --save-dev nodemon
// ----------------------------------------------------
const express = require("express");
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const mysql = require("mysql2");
const fs = require("fs");
const { off } = require("process");
const PORT = 3000;

// mysql 로컬 데이터 베이스 연결
// mysql createConnection 함수를 이용해서 연결 및 생성
const client = mysql.createConnection({
    // 데이터 베이스 계정의 이름
    user: "root",
    // root 계정의 비밀번호
    password: "!!Min159357",
    // 연결할 데이터 베이스의 이름
    database: "test7",
    // multipleStatements 다중 쿼리문을 사용 할수 있도록 하는 옵션
    multipleStatements: true,
});
// 서버 객체 생성
const app = express();

// req.body 객체를 사용 할거니까
// express 12버전쯤인가 버전업 되면서 express 설정으로 body 객체를 사용하게 설정할수 있다.
app.use(express.urlencoded({ extended: false }));

// 세션도 사용할거니까
app.use(
    session({
        // 세션 발급할때 사용할때 사용되는 키 노출되면 안되니깐 .env파일에 값을 저장해놓고 사용
        secret: process.env.SESSION_KEY,
        // 세션을 저장하고 불러올때 세션을 다시 저장할지 여부
        resave: false,
        // 세션에 저장할때 초기화 여부를 설정
        saveUninitialized: true,
        store: new FileStore(),
    })
);

app.get("/", (req, res) => {
    fs.readFile("view/login.html", "utf-8", (err, data) => {
        res.send(data);
    });
});
app.get("/join", (req, res) => {
    fs.readFile("view/join.html", "utf-8", (err, data) => {
        res.send(data);
    });
});

// const sql =
//     // id는 INT AUTO_INCREMENT PRIMARY KEY 컬럼 값을 추가하지 않아도 자동으로 증가하는 숫자
//     // user_id 이름으로 컬럼을 만들고 VARCHAR(255) 문자 255자까지 허용
//     "create table users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), password VARCHAR(255), refresh VARCHAR(255))";
// // client 객체안의 query 함수로 쿼리문 실행
// client.query(sql);

app.post("/join", (req, res) => {
    const { userId, password } = req.body; // const userId = req.body.userId 랑 같은표현
    // 쿼리문 INSERT INTO users -> users테이블에 추가한다
    // 추가하는 컬럼은 user_id, password 두개
    // VALUES(?,?)값의 벨류는 옵션으로 전달한다.
    const sql = "INSERT INTO users (user_id,password) VALUES(?,?)";
    // VALUES(?,?) 순서대로 [userId, password]값 전달
    client.query(sql, [userId, password], () => {
        // redirect 함수로 매개변수 url 해당 경로로 페이지를 이동시켜 준다.
        res.redirect("/");
    });
});
app.post("/login", (req, res) => {
    const { userId, password } = req.body;
    // SELECT * FROM users = users 테이블을 찾고
    // WHERE user_id = ? = users 테이블에서 user_ide 값으로 검색
    const sql = "SELECT * FROM users WHERE user_id=?";
    client.query(sql, [userId], (err, result) => {
        if (err) {
            res.send("계정 없음");
        } else {
            // result[0]에 값이 있으면 계정이 존재한다는 뜻. 아니면 계정이 없다.
            // result[0]?.password -> password 값이 없으면 오류띄우지말고 그냥 넘겨라
            if (password === result[0]?.password) {
                // 로그인 성공했으니깐 토큰 발급
                // accessToken 발급
                const accessToekn = jwt.sign(
                    {
                        // payload 값 전달할 값
                        userId: result[0].user_id,
                        mail: "dlflerl@naver.com",
                        name: "dflwerl",
                    },
                    // ACCESS_TOKEN 비밀키
                    process.env.ACCESS_TOKEN,
                    {
                        // 유지기간 5초
                        expiresIn: "5s",
                    }
                );
                // refresh token 발급
                const refreshToekn = jwt.sign(
                    {
                        userId: result[0].user_id,
                    },
                    process.env.REFRESH_TOKEN,
                    {
                        expiresIn: "1m",
                    }
                );
                // UPDATE users SET = user테이블의 값을 수정
                // WHERE user_id=? 로그인한 아이디 값으로 검색
                const sql = "UPDATE users SET refresh=? WHERE user_id=?";
                client.query(sql, [refreshToekn, userId]);
                // 세션에 accessToken 값을 access_token키 값으로 할당
                req.session.access_token = accessToekn;
                // 세션에 refreshToken 값을 refresh_token키 값으로 할당
                req.session.refresh_token = refreshToekn;
                res.send({ access: accessToekn, refresh: refreshToekn });
            } else {
                res.send("계정없음");
            }
        }
    });
});

// 미들웨어란
// 로그인을 해서 어서오세요 환영합니다 로그인이 유지되어 있는 페이지에 접속되고
// 로그인이 유지되고 있는 동안에만 동작해야하는 페이지들이 있는데. 로그인 유지를 확인하고 요청을 보내야한다.
// 어떻게 해야하나...
// 미들웨어란 간단하게 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하는 중간(미들)에 목적에 맞게 처리해주는
// 중간단계 통과하는 미들웨어 함수이다.
// 요청의 응답에 도달하기 위해선 미들웨어를 통과해야 한다.
// 즉 중간 문지기라고 볼수있다.(미들웨어를 통과해야 지나갈 수 있다.)
// req(요청)객체, res(응답)객체, next() 함수를 이용해서 통과 요청을 넘길수있다.
// 지나가세요 = next()
// 요청을 처리하기 전 중간에 기능을 동작시켜주는 애

// 매개변수는 (요청객체, 응답객체, next함수)
const middleware = (req, res, next) => {
    const { access_token, refresh_token } = req.session;
    // access_token 값의 유효기간이 끝나지 않았는지 검사한다
    jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, acc_decoded) => {
        if (err) {
            // 유효기간이 끝난 토큰이면
            // 여기서 로그인 페이지로 넘긴다던지
            // 404 500 에러메세지를 만들어서 보여준다던지
            // 본인의 방향성으로 페이지 구성 하시면 됩니다.
            // res.send("에로로 들어감 다시 로그인 해 주세요");
            jwt.verify(
                refresh_token,
                process.env.REFRESH_TOKEN,
                (err, ref_decoded) => {
                    if (err) {
                        res.send("다시 로그인 해주세요");
                    } else {
                        const sql = "SELECT * FROM users WHERE user_id=?";
                        client.query(
                            sql,
                            [ref_decoded.userId],
                            (err, result) => {
                                if (err) {
                                    res.send(
                                        "데이터 베이스 연결을 확인해주세요"
                                    );
                                } else {
                                    if (result[0].refresh == refresh_token) {
                                        const accessToken = jwt.sign(
                                            {
                                                userId: ref_decoded.userId,
                                            },
                                            process.env.ACCESS_TOKEN,
                                            { expiresIn: "5s" }
                                        );
                                        req.session.access_token = accessToken;
                                        next();
                                    } else {
                                        res.send("다시 로그인 하세요");
                                    }
                                }
                            }
                        );
                    }
                }
            );
        } else {
            // 토큰의 유효기간이 끝나지 않았으면
            next(); //이게 있으면 밑에 app.get('/check',middleware, 다음 콜백함수로 넘어감)

            // if (acc_decoded == undefined) {
            //     jwt.verify(
            //         refresh_token,
            //         process.env.REFRESH_TOKEN,
            //         (err, ref_decoded) => {
            //             if (err) {
            //                 res.send("다시 로그인 해주세요");
            //             } else {
            //                 const sql = "SELECT * FROM users WHERE user_id=?";
            //                 client.query(
            //                     sql,
            //                     [ref_decoded.userId],
            //                     (err, result) => {
            //                         if (err) {
            //                             res.send(
            //                                 "데이터 베이스 연결을 확인해주세요"
            //                             );
            //                         } else {
            //                             if (
            //                                 result[0].refresh == refresh_token
            //                             ) {
            //                                 const accessToken = jwt.sign(
            //                                     {
            //                                         userId: ref_decoded.userId,
            //                                     },
            //                                     process.env.ACCESS_TOKEN,
            //                                     { expiresIn: "5s" }
            //                                 );
            //                                 req.session.access_token =
            //                                     accessToken;
            //                                 next();
            //                             } else {
            //                                 res.send("다시 로그인 하세요");
            //                             }
            //                         }
            //                     }
            //                 );
            //             }
            //         }
            //     );
            // } else {
            //     next();
            // }
        }
        // 유효기간이 끝나지 않은 토큰이면
    });
};

// middleware 콜백에서 next()를 만나지 못하면 다음 콜백함수로 넘어가지 못한다
// next()를 만나면 다음 콜백으로 이동해서 요청 및 응답 작업을 한다.
// 따라서 이 middleware를 사용하면 특정 페이지 접근 가능 여부를 로그인 여부로 설정할 수 있다.
app.get("/check", middleware, (req, res) => {
    res.send("로그인 되어 있음");
});

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에 서버가 열렸어요`);
});
