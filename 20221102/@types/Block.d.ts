// 블록 타입 정의

declare interface IBlockHeader {
  version: string;
  height: number;
  timestamp: number;
  previousHash: string;
}

declare interface IBlock extends IBlockHeader {
  merkleRoot: string;
  hash: string;
  nonce: number;
  difficulty: number;
  data: string[];
}

// 블록 생성을 하는 클래스를 만들때
// 헤더부분만 만드는 클래스를 따로 만들고 상속받아서 온다.

// nonce, difficulty 속성들은
// 차후에 채굴 난이도와 마이닝 부분을 구현할때 사용할 속성
