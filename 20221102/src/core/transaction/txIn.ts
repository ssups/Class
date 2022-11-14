// txIn 객체를 생성해줄 클래스

export class TxIn implements ITxIN {
  public txOutId: string;
  public txOutIndex: number; // 배열의 인덱스 값 (첫 트랜젝션의 경우 블록의 높이)
  public signature?: string; // 첫 트랜젝션은 (코인베이스 트랜젝션) 서명이 없으니 undefined도 같이 설정
  constructor(txOutId: string, txOutIndex: number, signature: string | undefined) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.signature = signature;
  }

  // TxIns 생성 함수
  static createTxINs(receivedTx: any, myUTXO: IUnspentTxout[]) {
    let sum = 0;
    let txIns: TxIn[] = [];
    for (let i = 0; i < myUTXO.length; i++) {
      const { txOutId, txOutIndex, amount } = myUTXO[i];
      const item: TxIn = new TxIn(txOutId, txOutIndex, receivedTx.signature);
      txIns.push(item);
      sum += amount;
      if (sum >= receivedTx.amount) return { sum, txIns };
    }
    return { sum, txIns };
  }
}
