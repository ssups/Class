// 지갑 서버

import express from "express";
import { Wallet } from "./wallet";
import axios from "axios";
import path from "path";
import nunjucks from "nunjucks";
// ==========================================
// npm i axios
// npm i --save-dev @types/axiosa
// ==========================================

const app = express();

// nunjucks 설치하기
// ==========================================
// npm i nunjucks
// npm i --save-dev @types/nunjucks
// ==========================================

nunjucks.configure("view", {
  express: app, //express 속성에 우리가 만든 express 연결해준것
  watch: true, // watch옵션은 true면 html파일이 변경되면 템플릿 엔진이 리로드 시켜줌
});
app.set("view engine", "html");

// axios 사용할때 디폴트값 세팅
//
const baseURL = "http://localhost:3000";
const baseAuth = Buffer.from("soon" + ":" + "1234").toString("base64");
const request = axios.create({
  baseURL,
  headers: {
    // api 서버에서 데이터를 요청 응답할때 http Authorization 헤더에
    // 유저의 아이디와 비밀번호를 base64형태로 인코딩한 문자를 추가해서 인증하는 방식
    // base64로 인코딩 되어 전송되기 때문에 중간  공격에 취약하기는 하다.
    Authorization: "Basic " + baseAuth,
    "Content-type": "application/json",
  },
});

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/newWallet", (req, res) => {
  res.json(new Wallet());
});
app.post("/walletListAll", (req, res) => {
  const list = Wallet.getWalletList();
  res.json(list);
});
app.post("/sendTransaction", async (req, res) => {
  console.log(req.body);
  const {
    sender: { publicKey, account },
    received,
    amount,
  } = req.body;
  // 서명 만들기
  // 필요한 값은 SAH256(보낸사람 : 공개키 / 받는사람 : 계정 / 보낼 금액)
  const signature = Wallet.createSign(req.body);
  // 보낼사람 : 공개키
  // 받는사람 : 계정 ,서명
  const txObject = {
    sender: publicKey,
    received,
    amount,
    signature,
  };

  // 블록체인 인터페이스 관리 HTTP 서버에 요청
  const response = await request.post("/sendTransaction", txObject);
  console.log(response.data);
  res.json({});
});
app.get("/wallet/:account", (req, res) => {
  const { account } = req.params;
  const privateKey = Wallet.getWalletPrivateKey(account);
  res.json(new Wallet(privateKey));
});
app.listen(4000, () => {
  console.log("서버 4000번에 열렸다.");
});
