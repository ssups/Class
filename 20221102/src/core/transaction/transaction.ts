// transaction 객체 생성 클래스

import { TxIn } from "./txin";
import { TxOut } from "./txout";
import { UnspentTxOut } from "./unspentTxOut";
import { SHA256 } from "crypto-js";

export class Transaction implements ITransaction {
  public hash: string;
  public txIns: TxIn[];
  public txOuts: TxOut[];
  constructor(txIns: TxIn[], txOut: TxOut[]) {
    this.txIns = txIns;
    this.txOuts = txOut;
    this.hash = this.createTransactionHash();
  }
  //static
  // 인스턴스 생성하고 만들어준다.
  createTransactionHash(): string {
    // txOuts 배열의 원소(객체)의 value값만 뽑아서 문자열로 join
    const txOutContent: string = this.txOuts.map(v => Object.values(v)).join("");
    const txInContent: string = this.txIns.map(v => Object.values(v)).join("");

    // 트랜잭션의 해시값을 만들어주고
    return SHA256(txOutContent + txInContent).toString();
  }

  createUTXO(): UnspentTxOut[] {
    const utxo: UnspentTxOut[] = this.txOuts.map((txOut: TxOut, index: number) => {
      return new UnspentTxOut(this.hash, index, txOut.account, txOut.amount);
    });
    return utxo;
  }

  // 트랜젝션을 만들어 주는 함수
  // 트랜젝션 만들때 내 계정과 일치하는 UTXO 필요
  static createTransaction(receivedTx: any, myUTXO: UnspentTxOut[]): Transaction {
    const { sum, txIns } = TxIn.createTxINs(receivedTx, myUTXO);
    const txOuts: TxOut[] = TxOut.createTxOuts(sum, receivedTx);
    const tx = new Transaction(txIns, txOuts);
    return tx;
  }
}
