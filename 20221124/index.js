const { Contract } = require("./controll/compile");
const { Client } = require("./controll/client");

const [abi, bytecode] = Contract.compile("test.sol");

const client = new Client("ws://127.0.0.1:9005");

const contract = new client.web3.eth.Contract(abi);
// console.log(contract);
const txObject = { data: bytecode };

const Address = "0xd066e1059db7ec8b9f722d99b50e6cac611dafe8";

async function init() {
  // deploy() : 반환값이 promise 객체
  // 트랜젝션이 처리될때까지 기다린다 -> 마이닝으로 블록 캐주면 값이 찍힌다.
  const instance = await contract.deploy(txObject).send({ from: Address });
  // 배포하고 메소드나 변수들을 가져와야하는데
  // 필요한게 Contract Address
  // instance 객체 안에 options.address에 contract address 가 들어있다.
  const CA = instance.options.address;
  //   console.log(CA);
}
init();

// const CA = "0xce5d6ed7077499ec2785808bd6718a0c0c8fe91c";
// // 컨트렉트 조회해서 함수와 변수 가져오기
// // 필요한게 abi와 contract address
// const deployed = new client.web3.eth.Contract(abi, CA);
// // getter로 value값 가져오기
// const methods = deployed.methods;
// methods
//   .value()
//   .call()
//   .then(val => console.log(val));
// methods
//   .setValue("하하하하 이게 바뀐거임")
//   .send({ from: Address })
//   .then(data => {
//     console.log(data);
//     // methods
//     //   .value()
//     //   .call()
//     //   .then(val => console.log(val));
//   });
