import { BlockChain } from "@core/index";
import { P2PServer } from "@core/server/p2p";
import { ReceivedTx, Wallet } from "@core/wallet/wallet";
import express from "express";

const app = express();
const PORT = 3000;
const ws = new P2PServer();

// 터미널에서 실행시킬때 ts-node index.ts 이런식으로 타입스크립트 노드로 실행시켜줘야함

app.use(express.json());

// 블록체인 인터페이스 관리
// 다른사람이 내 노드의 블록을 조회하는것을 방지
// 헤더에 Authorization을 조회
// 사용자가 인증된 경우에만 조회 가능
// Autorization : Basic 방식을 사용해서 인증되지 않은 사용자는 조회가 불가능하게
// 이부분은 요청의 헤더의(req.headers.uathorization) authorization 값이
// userid = "soon", userpw = '1234' 정보를 가지고 요청한 사용자만 서버조회 가능하도록 처리
// 해당 서버(포트?)의 모든 주소에 대한 요청에서 사용되는 미들웨어
app.use((req, res, next) => {
  // req.headers.authorization 타입이 string | undefined
  const baseAuth: string = (req.headers.authorization || "").split(" ")[1];
  if (baseAuth === "") return res.send("오류 빈값이다.");
  const [userid, userpw] = Buffer.from(baseAuth, "base64").toString().split(":");
  // 통과 다되면 next()
  next();
});

// sendTransaction 라우터
app.post("/sendTransaction", (req, res) => {
  //   console.log(req.body);
  try {
    const receivedTx: ReceivedTx = req.body;
    Wallet.sendTransaction(receivedTx);
    // console.log(receivedTx);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
  res.json({});
});

app.get("/", (req, res) => {
  res.send("bit-chain");
});
// 블록 내용 조회
app.get("/chains", (req, res) => {
  res.json(ws.getChain());
});
// 블록 채굴
app.post("/mineBlock", (req, res) => {
  const { data } = req.body;
  const newBlock = ws.addBlock(data);
  if (newBlock.isError) return res.send(newBlock.value);
  res.json(newBlock.value);
});
// P2PServer 웹소켓 연결 요청
app.post("/addToPeer", (req, res) => {
  const { peer } = req.body;
  ws.connectToPeer(peer);
});
// 연결된 소켓 조회
app.get("/peer", (req, res) => {
  const sockets = ws.getSockets().map((socket: any) => {
    return res.json(socket);
  });
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에 서버 열림`);
  ws.listen();
});
