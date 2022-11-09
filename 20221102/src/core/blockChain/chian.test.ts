import { Chain } from "@core/blockChain/chain";

// 테스트 코드 작성
describe("Chain 검증", () => {
  let node: Chain = new Chain(); // 최초 블록 하나 들어있느 체인 생성

  it("체인 가져오기 함수 테스트", () => {
    console.log(node.getChain());
  });
  it("체인 길이 가져오기 함수 테스트", () => {
    console.log(node.getLength());
  });
  it("체인 마지막 블록 가져오기 함수 테스트", () => {
    console.log(node.getLatestBlock());
  });
  it("체인 블록 추가 함수 테스트", () => {
    for (let i = 0; i < 100; i++) {
      node.addBlock([`${i}번째 블록`]);
      console.log(node.getChain().at(-1));

      // console.log(node.getLatestBlock());
    }
    console.log("추가완료된 체인", node.getChain());
  });
});
