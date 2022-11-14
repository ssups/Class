import { Chain } from "@core/blockChain/chain";

// 테스트 코드 작성
// describe("Chain 검증", () => {
//   let node: Chain = new Chain(); // 최초 블록 하나 들어있느 체인 생성

//   it("체인 가져오기 함수 테스트", () => {
//     console.log(node.getChain());
//   });
//   it("체인 길이 가져오기 함수 테스트", () => {
//     console.log(node.getLength());
//   });
//   it("체인 마지막 블록 가져오기 함수 테스트", () => {
//     console.log(node.getLatestBlock());
//   });
//   it("체인 블록 추가 함수 테스트", () => {
//     for (let i = 0; i < 200; i++) {
//       node.addBlock([`${i}번째 블록`]);
//       console.log(node.getChain().at(-1));

//       // console.log(node.getLatestBlock());
//     }
//     console.log("추가완료된 체인", node.getChain());
//   });
// });

describe("UTXO 테스트", () => {
  let node: Chain = new Chain();
  it("miningBlock() 함수", () => {
    for (let i = 0; i < 10; i++) {
      node.miningBlock("7C91020020680EFBE45B775942839479739294C686E15D70AD824E16822D7424");
    }
    // console.log(`마지막 블록: ${node.getLatestBlock().data}`);
    // console.log(`UTXO: ${node.getUnspentTxOuts()}`);
    console.log(node.getLatestBlock().data);
    console.log(node.getUnspentTxOuts());
  });
});

// 테스트 파일 실행시키는거
// npx jest 파일경로/파일이름
