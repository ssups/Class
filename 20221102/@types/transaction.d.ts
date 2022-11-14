// output
declare interface ITxOut {
  account: string; //해당 사람의 주소
  amount: number; // 잔액
}

// ITxIN는 IUnspentTxOut[]을 참조해서만들고
// ITxIN을 만들떄 IUnspentTxOut[]에서 삭제

// input
declare interface ITxIN {
  txOutId: string; // ITransaction 객체의 hash값
  txOutIndex: number; // ITransaction에 있는 txouts 배열의 인덱스
  // ?: signature 속성이 없어도 되고 있어도 됨
  signature?: string;
}

// 트랜젝션
declare interface ITransaction {
  hash: string; // txIns, txOuts을 사용해서 만든 hash 값
  txOuts: ITxOut[];
  txIns: ITxIN[];
}

// TxOut을 만들때 IUnspentTxOut[]에 생성
// UTXO
declare interface IUnspentTxout {
  txOutId: string;
  txOutIndex: number;
  account: string;
  amount: number;
}
