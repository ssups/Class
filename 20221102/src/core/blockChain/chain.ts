import { Block } from "@core/blockChain/block";
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from "@core/config";
import { Transaction } from "@core/transaction/transaction";
import { TxIn } from "@core/transaction/txin";
import { TxOut } from "@core/transaction/txout";
import { UnspentTxOut } from "@core/transaction/unspentTxOut";

export class Chain {
  // Block타입의 원소를 가지는 배열 타입의 변수
  private blockchain: Block[];
  private unspentTxOuts: IUnspentTxout[];
  private transactionPool: ITransaction[];
  // 처음 생성될때 constructor로 클래스를 동적할당으로 생성
  constructor() {
    // 최초의 블록은 거의 하드코딩으로 넣어준다.
    // 생성될때 최초 블록 하나 블록체인 배열에 추가
    this.blockchain = [Block.getGENESIS()];
    // UTXO라는 배열을 만들어준것
    this.unspentTxOuts = [];
    this.transactionPool = [];
  }

  //트랜젝션 풀을 반환해주는 함수
  public getTransactionPool(): ITransaction[] {
    return this.transactionPool;
  }

  // 트랜젝션 풀에 트랜젝션 추가 함수
  public appendTransactionPool(transaction: ITransaction) {
    this.transactionPool.push(transaction);
  }

  // 트랜젝션 풀 업데이트
  public updateTransactionPool(newBlock: IBlock) {
    let txPool: ITransaction[] = this.getTransactionPool();
    newBlock.data.forEach((tx: ITransaction) => {
      txPool = txPool.filter(txp => txp.hash !== tx.hash);
    });
    this.transactionPool = txPool;
  }

  // UTXO get하는 함수(UTXO 조회 함수)
  public getUnspentTxOuts(): IUnspentTxout[] {
    return this.unspentTxOuts;
  }

  // UTXO 추가 함수
  public appendUTXO(utxo: IUnspentTxout[]) {
    // unspentTxOuts배열에 utxo 값을 복사해서 배열에 추가
    this.unspentTxOuts.push(...utxo);
  }

  // 마이닝 블록
  public miningBlock(account: string): Failable<Block, string> {
    // 코인베이스 트랜젝션의 내용을 임의로 만든것
    const txIn: ITxIN = new TxIn("", this.getLatestBlock().height + 1, undefined);
    const txOut: ITxOut = new TxOut(account, 50);
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    // createUTXO 함수로 UTXO에 담을 객체를 만들어준것
    const utxo = coinbaseTransaction.createUTXO();
    // UTXO에 appendUTXO함수로 만든 객체를 추가
    this.appendUTXO(utxo);

    return this.addBlock([coinbaseTransaction]);
  }

  // 현재 연결된 블록들 리스트를 확인하기 위해
  // 연결된 노드들을 확인할수 있는 함수
  public getChain(): Block[] {
    return this.blockchain;
  }

  // 현재 연결된 블록들의 갯수 길이
  // 연결된 노드의 갯수 확인하는 함수
  public getLength(): number {
    return this.blockchain.length;
  }

  // 맨 마지막 블록을 확인하는 함수
  public getLatestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  // 블록체인에 블록을 추가하는 함수, 인수로는 블록의 내용(data)를 받는다
  // return 값의 타입은 Block 타입 혹은 string 타입이 될수 있는데
  // 객체로 return 값을 뱉어줘서 제너릭으로 isError라는 키값을 통해서 최종적으로 타입이 둘중에 뭘로될지 결정한다.
  public addBlock(data: ITransaction[]): Failable<Block, string> {
    // 마지막 블록 가져옴
    const previousBlock = this.getLatestBlock();
    // 10번쨰 전 블록을 가져옴
    const adjustmentBlock: Block = this.getAdjustmentBlock();
    const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock);
    // 새로생성된 블록을 검증함 (이전블록과 비교해서)
    const isValid = Block.isValidNewBlock(newBlock, previousBlock);

    // 블록검증에서 에러발생하면 에러반환해서 제너릭에 전달?
    if (isValid.isError) return { isError: true, value: "에러남" };

    // 에러가 안나면 newBlock 체인에 추가
    this.blockchain.push(newBlock);
    // console.log("블록추가된 체인",this.blockchain);

    // 에러없다고 알려주고
    return { isError: false, value: newBlock };
  }

  // 체인 검증 코드
  public isValidChain(chain: Block[]): Failable<undefined, string> {
    // 초최 블록 검사하는 코드
    const genesis = chain[0];
    for (let i = 0; i < chain.length; i++) {
      const newBlock = chain[i];
      const previousBlock = chain[i - 1];
      const isValid = Block.isValidNewBlock(newBlock, previousBlock);
      if (isValid.isError) return { isError: true, value: isValid.value };
    }
    return { isError: false, value: undefined };
  }

  public replaceChain(receivedChain: Block[]): Failable<undefined, string> {
    // 본인 체인과 상대방 체인을 검사하는 코드
    const latestReceivedBlock: Block = receivedChain[receivedChain.length - 1];
    const latestBlock: Block = this.getLatestBlock();
    // 높이가 0이면 받은블록이 최초블록이라서 검사할필요가 없고
    if (latestReceivedBlock.height === 0) {
      return { isError: true, value: "받은 블록이 최초 블록록" };
    }
    // 본인의 블록의 높이가 더 높으면(더 최신 블록이면) 검사할 필요가 없음
    if (latestReceivedBlock.height <= latestBlock.height) {
      return { isError: true, value: "본인의 블록보다 높이가 낮거나 같은 블록" };
    }
    // 여러명이 빠르게 블록을 추가하다보면 검증단계에서 블록의 높이 차이가 발생하는데
    // 해시를 비교해서 받은 블록의 이전 해시가 내 블록의 해시랑 같으면 블록의 갯수차이가 발생한것
    // 이 문제는 사람들이 빠르게 블록을 추가하다가 비슷한시기에 여러명의 블록이 생성되서 발생하는것.
    if (latestReceivedBlock.previousHash === latestBlock.hash) {
      return { isError: true, value: "블록이 하나만큼 모자라다." };
    }

    // 체인을 갱신해줌
    this.blockchain = receivedChain;

    return { isError: false, value: undefined };
  }

  // 생성 시점기준으로 블록높이 -10 블록 구하기

  // 현재 높이값 < DIFFICULTY_ADJUSTMENT_INTERVAL : 최초블록값 반환
  // 현재 높이값 > DIFFICULTY_ADJUSTMENT_INTERVAL : -10번째 블록 반환
  public getAdjustmentBlock() {
    const currentLength = this.getLength();
    // 현재의 체인 길이가 DIFFICULTY_ADJUSTMENT_INTERVAL(현재는 10으로 설정) 보다 작으면
    // 최초블록을 반환하고
    // 길이가 더 크면
    // -DIFFICULTY_ADJUSTMENT_INTERVAL(현재는 10으로 설정) 번째 블록을 반환한다.
    const adjustmentBlock: Block =
      this.getLength() < DIFFICULTY_ADJUSTMENT_INTERVAL
        ? Block.getGENESIS()
        : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL];

    return adjustmentBlock; // 최초블록 or -10번째 블록 반환
  }

  updateUTXO(tx: ITransaction) {
    // txOutId, txOutIndex, account, amount
    // UTXO 배열을 가져오고 getUnspentTxOuts함수를 사용해서
    const unspentTxOuts: UnspentTxOut[] = this.getUnspentTxOuts();
    // UTXO에 추가할 unspentTxOuts 객체를 생성
    // 트랜젝션 객체의 배열안에있는 txOut 객체를 사용해서 새로 생성될
    // UnspentTxOut 객체를 만들어준다
    const newUnspentTxOuts = tx.txOuts.map((txOut, index) => {
      return new UnspentTxOut(tx.hash, index, txOut.account, txOut.amount);
    });
    // filter로 unspentTxOuts 배열 안세 txOut 객체들은 제거하고
    // 생성된 newUnspentTxOuts 배열을 붙여준다.
    const tmp = unspentTxOuts
      .filter((val: UnspentTxOut) => {
        const bool = tx.txIns.find((v: TxIn) => {
          return val.txOutId === v.txOutId && val.txOutIndex === v.txOutIndex;
        });
        // bool 값이 undefiend 면 return 은 true
        // bool 값이 빈개체{} 면 return 은 false
        return !bool;
      })
      .concat(newUnspentTxOuts);
    // UTXO에 사용한 unspentTxOut 객체 제거와 생성된 unspentTxOuts 객체를 UTXO에 추가

    // tmp배열을 reduce 함수로 acc 배열 안에서 해당 조건에 맞는 값을 내보내주고
    // acc 배열에 push해서 배열에 넣어주고 acc 배열을 반환해서
    // unspentTmp에 담고
    // unspentTmp를 this.unspentTxOuts에 바인딩
    let unspentTmp: UnspentTxOut[] = [];
    const result = tmp.reduce((acc, utxo) => {
      const find = acc.find(el => {
        const { txOutId, txOutIndex } = el;
        return txOutId === utxo.txOutId && txOutIndex === utxo.txOutIndex;
      });
      if (!find) acc.push(utxo);
      return acc;
    }, unspentTmp);
    this.unspentTxOuts = result;
  }
}
