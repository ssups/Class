// 작성한 코드들을 테스트해보기 위해서 만든 파일
import { Block } from "@core/blockChain/block";
import { GENESIS } from "@core/config";

describe("Block 검증", () => {
  let newBlock: Block;

  // it() => 테스트할 코드의 최소 단위 공간
  it("블록 추가", () => {
    const data = ["Block 2"];
    newBlock = Block.generateBlock(GENESIS, data);
    console.log(newBlock);
  });

  it("블록 검증", () => {
    const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
    if (isValidBlock.isError) {
      console.error(isValidBlock.isError);
      // expect(결과값).toBe(예상값)
      // expect().toBe() 테스트 코드 사용시 자주 사용하고
      // 테스트 코드 작성해서 진행할때 우리가 원하는 결과값이 나오는 경우에만
      // 테스트 성공한것으로 결과를 도출하고싶을때 사용한다.
      // 예상한 결과가 나오지 않으면 테스트 실패로 반환 가능.
      return expect(true).toBe(false);
    }
    expect(isValidBlock.isError).toBe(false);
  });
});

// decribe 함수를 사용해서 테스트 할거고,
// 함수들이 많을경우 연관 테스트 함수끼리 그룹핑 시켜주는 역할
