import { SHA256 } from "crypto-js";
import merkle from "merkle";
import { BlockHeader } from "./blockHeader";
import { GENESIS } from "@core/config";

// 부모 속성 extends로 가져오고 implement로 블럭 타입 들고와서 클래스 만듦
export class Block extends BlockHeader implements IBlock {
  public hash: string;
  public merkleRoot: string;
  public nonce: number;
  public difficulty: number;
  public data: string[];
  constructor(_previousBlock: Block, _data: string[]) {
    // 부모 클래스 속성 가져와야하니깐 super 사용
    super(_previousBlock);
    this.merkleRoot = Block.getMerkleRoot(_data);
    this.hash = Block.createBlockHash(this);
    this.nonce = 0;
    this.difficulty = 0;
    this.data = _data;
  }

  // 최초블록 가져오는 함수
  public static getGENESIS(): Block {
    return GENESIS;
  }

  // 블록 추가
  public static generateBlock(_previousBlock: Block, _data: string[]): Block {
    const generateBlcok = new Block(_previousBlock, _data);
    return generateBlcok;
  }

  // 머클루트 변환 함수
  // 여기서 사용된 <T>는 제너릭의 일종인데 택1의 형태가 아니고 이 함수가 실행될때 T가 함수의 인수type을 직접 받는형태이다
  // _data 타입이 어떤형태로 들어올지 모르기 때문에 타입을 일종의 변수? 형태로 받는 것이다.
  // string 은 return 값에대한 타입
  public static getMerkleRoot<T>(_data: T[]): string {
    const merkleTree = merkle("sha256").sync(_data);
    return merkleTree.root();
  }

  // 블록 해시 생성 함수
  public static createBlockHash(_block: Block): string {
    const { version, timestamp, height, merkleRoot, previousHash } = _block;
    const values: string = `${version}${timestamp}${height}${merkleRoot}${previousHash}`;
    return SHA256(values).toString();
  }

  // 블록 유효 검사 함수
  public static isValidNewBlock(_newBlock: Block, _previousBlock: Block): Failable<Block, string> {
    // 새로운 블록의 높이가 이전 블록높이 +1과 같은지 확인 => 같아야 통과
    if (_previousBlock.height + 1 !== _newBlock.height)
      return { isError: true, value: "블록 높이 오류" };
    // 새로운 블록의 previous해시값이 이전 블록의 해시값과 같은지 체크 => 같아야 통과
    if (_previousBlock.hash !== _newBlock.previousHash)
      return { isError: true, value: "이전 해시 오류" };
    // 새로운 블록의 정보를 가지고 다시 해싱해서 새로 생성된 블록의 해시값과 비교 =>같아야 통과
    if (Block.createBlockHash(_newBlock) !== _newBlock.hash)
      return { isError: true, value: "블록 해시 오류" };

    return { isError: false, value: _newBlock };
  }
}
