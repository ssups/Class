import { BlockChain } from "@core/index";
import { P2PServer } from "@core/server/p2p";
import express from "express";

const app = express();
const PORT = 8000;
const ws = new P2PServer();

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에 서버 열림`);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("bit-chain");
});
app.get("/chains", (req, res) => {
  res.json(ws);
});
// 터미널에서 실행시킬때 ts-node index.ts 이런식으로 타입스크립트 노드로 실행시켜줘야함
