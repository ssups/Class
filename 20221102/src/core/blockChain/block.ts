import { SHA256 } from "crypto-js";
import merkle from "merkle";
import { BlockHeader } from "./blockHeader";
import {
  GENESIS,
  DIFFICULTY_ADJUSTMENT_INTERVAL,
  BLOCK_GENERATION_INTERVAL,
  BLOCK_GENERATION_TIME_UNIT,
} from "@core/config";
import hexToBinary from "hex-to-binary";

// 부모 속성 extends로 가져오고 implement로 블럭 타입 들고와서 클래스 만듦
export class Block extends BlockHeader implements IBlock {
  public hash: string;
  public merkleRoot: string;
  public nonce: number;
  public difficulty: number;
  public data: string[];
  constructor(_previousBlock: Block, _data: string[], _adjustmentBlock: Block) {
    // 부모 클래스 속성 가져와야하니깐 super 사용
    super(_previousBlock);
    this.merkleRoot = Block.getMerkleRoot(_data);
    this.hash = Block.createBlockHash(this);
    this.nonce = 0;
    this.difficulty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock);
    this.data = _data;
  }

  // 최초블록 가져오는 함수
  public static getGENESIS(): Block {
    return GENESIS;
  }

  // 블록 추가 함수
  public static generateBlock(
    _previousBlock: Block,
    _data: string[],
    _adjustmentBlock: Block
  ): Block {
    const generateBlcok = new Block(_previousBlock, _data, _adjustmentBlock);
    const newBlock = Block.findBlock(generateBlcok);
    return newBlock;
  }

  // 난이도 구현 함수
  public static getDifficulty(
    _newBlock: Block,
    _adjustmentBlock: Block,
    _previousBlock: Block
  ): number {
    // 최초 10개까지 블록은 난이도 0 혹은 1로 정해줌
    if (_newBlock.height <= 9) return 0;
    if (_newBlock.height <= 10) return 3;
    // if (_newBlock.height === 10) return 1;

    // 10번째 배수의 블록에 한해서만 난이도 구현
    // 한 블록묶음(블록10개)는 같은 난이도를 가지게 한다.
    if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) {
      return _previousBlock.difficulty;
    }
    // 블록 1개당 생성시간 : 10분, 10개 생성되는데 걸리는 시간 6000초 (10*60*10개)
    const timeTaken: number = _newBlock.timestamp - _adjustmentBlock.timestamp;
    const TimeExpected: number =
      BLOCK_GENERATION_INTERVAL * BLOCK_GENERATION_TIME_UNIT * DIFFICULTY_ADJUSTMENT_INTERVAL; //6000
    // console.log(`걸린시간: ${timeTaken} 예상시간: ${TimeExpected}`);
    if (timeTaken < TimeExpected / 2) {
      // console.log(_adjustmentBlock.difficulty + 1);
      return _adjustmentBlock.difficulty + 1;
    } else if (timeTaken > TimeExpected * 2) return _adjustmentBlock.difficulty - 1;
    // else return _adjustmentBlock.difficulty;

    return _adjustmentBlock.difficulty;
  }

  // findBlock()
  // 마이닝 작업 코드
  public static findBlock(generateBlock: Block) {
    let hash: string;
    let nonce: number = 0;

    while (true) {
      nonce++;
      generateBlock.nonce = nonce;
      hash = Block.createBlockHash(generateBlock);
      // hexToBinary(hash) : 16진수 -> 2진수로 변환시키는 함수
      // hexToBinary 모듈 설치해서 사용
      // =====================================\
      // npm i hex-to-binary
      // =====================================
      // @types 에 파일 만들어서 declare module 주기
      const binary: string = hexToBinary(hash);
      // startsWith() 함수는 대상 문자열이 인수로 들어가는 문자열로로 시작하는지 체크 true or false
      const result: boolean = binary.startsWith("0".repeat(generateBlock.difficulty));

      if (result) {
        generateBlock.hash = hash;
        return generateBlock;
      }
    }
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
    // difficulty, nonce
    const { version, timestamp, height, merkleRoot, previousHash, difficulty, nonce } = _block;
    const values: string = `${version}${timestamp}${height}${merkleRoot}${previousHash}${difficulty},${nonce}`;
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
