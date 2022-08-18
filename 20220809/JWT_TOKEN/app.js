const express = require("express");
const app = express();
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const PORT = 4000;

// 설치할 모듈
// =======================================
// npm i express-session
// 저장된 세션의 정보를 파일로 보기 위해
// npm i session-file-store
// =======================================d
// express session
app.listen(PORT, () => {
    console.log(PORT, "에 서버 열림");
});

app.use(
    session({
        // 세션을 발급할때 사용되는 키 소스코드 노출 안되게 하기.
        secret: "sekrkfk",
        // 세션을 저장하고 불러올때 다시 저장할지 여부
        resave: false,
        // 세션에 저장할때 초기화 여부
        saveUninitialized: true,
        // 저장소를 만들지 여부(실행시키면 sessions폴더가 생긴다)
        store: new FileStore(),
    })
);

// 루트로 절대경로 설정
app.use(express.static(__dirname));

// 앞에 url이 있으면 해당 url 요청에서 사용할 것이라는 뜻
const page = require("./view/page");
app.use(page); // 모든 요청에서 사용
// 모든 요청에서 사용
// 앞에 url이 있으면 해당 url 요청에서 사용할 것이라는 뜻
const createToken = require("./token");
const verifyToken = require("./verify");
app.use(createToken);
app.use(verifyToken);
// app.use("/userView", verifyToken);

// app.use 로 경로잡을때 인수1개만 쓰면 require방식으로 파일 경로 잡아줌
// 인수 2개 넣으면 첫번째는 브라우저 경로, 두번재는 파일 경로
// 브라우저 경로는 / 로 시작하고 폴더경로는 ./로 시작하는듯?

// app.get("/", (req, res) => {
//     if (!req.session.key) {
//         req.session.key = "tempkey!";
//     }
//     // req.session.cookie = "dfwer";
//     req.session.key = "first";
//     req.session.key2 = "second";
//     res.send(`key:${req.session.key}`);
// });
// app.get("/shop", (req, res) => {
//     req.session.key = "third";
//     res.send(`난 숍${req.session.key}`);
// });
