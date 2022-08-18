// express 모듈 가져오기
const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");
const dot = require("dotenv");
dot.config();
const secretkey = process.env.SECRETKEY;

// app.js에서 use() 함수로 요청 url을 설정해서
// /userView url 부터 시작
router.post("/userView", (req, res) => {
    // express session에서 token 가져와서 변수에 담고
    const token = req.session.token;
    // 토큰을 해석하는 함수 verify()
    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            console.log("정상적이지 않은 토큰");
        }
        // 해석된 객체 decoded
        console.log(decoded);
        res.send(decoded);
    });
});

module.exports = router;
