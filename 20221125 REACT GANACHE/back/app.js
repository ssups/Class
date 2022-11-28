// npm init -y 해주고

// 필요한 모듈
// express, web3
const express = require("express");
const app = express();
const cors = require("cors");
const Web3 = require("web3");
// HttpProvider 함수를 사용해서 web3 객체 생성
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const PORT = 4000;
const CounterContract = require("./Counter.json");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/increment", async (req, res) => {
  // req에 넘어온 트젝 발생시킨 계정을 받고
  const { from } = req.body;
  // 해당 계정으로  getTransactionCount함수를 써서 받은 값을 nonce에 할당
  // 중복트젝을 막기위해서 사용하는듯?
  const nonce = await web3.eth.getTransactionCount(from);

  // 연걸된 web3 넹트워크 아이디 할당
  const networkId = await web3.eth.net.getId();

  // 네트워크 아이디로 컨트렉트 주소 할당
  const CA = CounterContract.networks[networkId].address;
  const abi = CounterContract.abi;

  // 컨트렉트 조회
  const deployed = new web3.eth.Contract(abi, CA);
  // increment().encodeABI() 함수로 원본 데이터로 변환
  // 바이트코드로 변환
  const data = await deployed.methods.increment().encodeABI();

  // 트랜젝션 객체 만들어서
  let txObject = {
    nonce,
    from,
    to: CA,
    data,
  };
  console.log(txObject);
  // json 객체로 반환
  res.json(txObject);
});

app.listen(PORT, () => {
  console.log(PORT, "번포트에 서버 열림");
});
