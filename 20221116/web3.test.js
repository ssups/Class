const Web3 = require("web3");
const ethTx = require("ethereumjs-tx").Transaction;

describe("web3 test", () => {
  let web3;
  let accounts;
  let sender;
  let received;
  it("web3 연결", () => {
    // http://127.0.0.1:8545 경로의 가나쉬에서 실행되고 있는 이더리움 클라이언트로
    // web3 인스턴스 생성
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  });

  // 최신 블록의 높이
  it("최신 블록 높이", async () => {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log(latestBlock);
  });

  // 전체 account 가져오기
  it("전체 주소", async () => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
  });

  // 잔액 조회
  it("계정 잔액 조회", async () => {
    // 첫번째 지갑의 잔고
    const balance = await web3.eth.getBalance(accounts[1]);
    const senderBalance = await web3.eth.getBalance(accounts[6]);
    console.log("받는사람 잔고: ", balance);
    console.log("보내는사람 잔고: ", senderBalance);
    // 여기서 찍히는 값은 웨이(wei)라는 단위로
    // 이더의 -18승 단위다 (1eth = 1wei*10^18)
  });

  // 단위 변경
  // 이더리움 단위
  // wei
  // gwei : wei * 10 ** 9 wei (가스비 단위)
  // Eth : wei * 10 ** 18 wei
  it("Eth 단위 변경", () => {
    console.log(web3.utils.toWei("1", "gwei")); // 1기위를 웨이 단위로 변경
    console.log(web3.utils.toWei("1", "ether")); // 1이더를 웨이 단위로 변경
    console.log("1000wei 기위단위로", web3.utils.fromWei("1000", "gwei"));
  });

  // 트랜젝션 횟수 조회
  it("트랜젝션 횟수 조회", async () => {
    // 두번째 지갑의 트젝횟수 조회
    const txCount = await web3.eth.getTransactionCount(accounts[2]);
    console.log(txCount);
  });
  // 트랜젝션의 내용
  // nonce : 보내는 계정이 발생시킨 총 트랜젝션 횟수
  // from : 보내는 계정
  // to : 받는 계정
  // value: 보내는 금액(wei)
  // gasLimit : 해당 트젝이 사용할수있는 가스의 최대
  // gasPrice : 보내는 사람이 지불하는 가스 가격
  // data : 스마트 컨트렉트와 관련된 데이터

  it("트랜젝션 실행", async () => {
    // 보내는 사람의 트랜젝션 횟수
    const txCount = await web3.eth.getTransactionCount(accounts[6]);
    // 보내는 사람의 개인키
    const privateKey = Buffer.from(
      "733a7f7270a0ddaddfb3b953090186becb186edef9332aa6bbdd74deaf8e9dfe",
      "hex"
    );
    // 트랜젝션 내용 객체
    const txObject = {
      // 보내는 사람의 트랜젝션 횟수를 Hex로 변환해놓고 nonce에 대입
      nonce: web3.utils.toHex(txCount),
      // 보내는사람
      from: accounts[6],
      // 받는사람
      to: accounts[1],
      // 보낼금액인데 단위를 wei로 해준다.
      value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
      // 트랜젝션에서 사용할 가스 최대치(단위 없음)
      gasLimit: web3.utils.toHex(207128),
      // 보내는 사람이 지불할 가스 가격                
      // gasPrice: web3.utils.toHex(20000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
      data: web3.utils.toHex(""),

      //실제 gasFee 는 gasPrice * gasUsage(단위 없음)
    };
    const tx = new ethTx(txObject);
    tx.sign(privateKey);
    console.log(tx);
    // serialize함수를 사용해서 내용을 정렬(트랜젝션 데이터(객체)를  하고)
    const serializedTx = tx.serialize();
    // sendSignedTransaction 함수로 트랜젝션을 전송
    const _TxObject = await web3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"));
    console.log(_TxObject);
  });
});
