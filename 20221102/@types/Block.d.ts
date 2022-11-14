// 블록 타입 정의

// 인터페이스로 만든 이유
// version, height, timestamp, previousHash 값들의 타입이 정해진 클래스 형태를 편하게 사용하기위해서 만듬
declare interface IBlockHeader {
  version: string;
  height: number;
  timestamp: number;
  previousHash: string;
}

// IBlock 인터페이스에 IBlockHeader를 extends로 상속시켜
// IBlockHeade의 구성요소 타입과 IBlock을 합친것
declare interface IBlock extends IBlockHeader {
  merkleRoot: string;
  hash: string;
  nonce: number;
  difficulty: number;
  data: ITransaction[];
}

// 블록 생성을 하는 클래스를 만들때
// 헤더부분만 만드는 클래스를 따로 만들고 상속받아서 온다.

// nonce, difficulty 속성들은
// 차후에 채굴 난이도와 마이닝 부분을 구현할때 사용할 속성
