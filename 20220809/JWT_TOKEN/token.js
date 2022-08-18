// jwt, express, router
// jsonwebtoken 모듈 가져오기
const jwt = require("jsonwebtoken");
// express 모듈 가져오기
const express = require("express");
// express 라우터 설정을 위해 express.Router() 반환값 변수에 담기
const router = express.Router();
const dot = require("dotenv");
const fs = require("fs");

dot.config();

const secretkey = process.env.SECRETKEY;

router.post("/login", (req, res) => {
    const name = "soon";
    let token = jwt.sign(
        {
            // 타입 JWT
            type: "JWT",
            name: name,
        },
        secretkey,
        {
            // 토큰의 유효 시간
            expiresIn: "5m",
            // 토큰 발급한 사람
            issuer: "soon",
        }
    );
    req.session.token = token;
    let temp = {
        msg: "토큰 발급됨",
        token,
    };
    fs.readFile("view/page2.html", "utf8", (err, data) => {
        res.send(data);
    });
});

// 설정한 라우터 내보내기
module.exports = router;
