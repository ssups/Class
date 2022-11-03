import { Block } from "@core/blockChain/block";
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from "@core/config";

export class Chain {
  private blockchain: Block[];
  constructor() {
    this.blockchain = [Block.getGENESIS()];
  }

  public getChain(): Block[] {
    return this.blockchain;
  }
  public getLength(): number {
    return this.blockchain.length;
  }
  public getLastestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }
  public addBlock(data: string[]): Failable<Block, string> {
    const previousBlock = this.getLastestBlock();
    const adjustmentBlock: Block = this.getAdjustmentBlock();
    const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock);
    const isValid = Block.isValidNewBlock(newBlock, previousBlock);

    if (isValid.isError) return { isError: true, value: "에러남" };

    this.blockchain.push(newBlock);
    // console.log("블록추가된 체인",this.blockchain);

    return { isError: false, value: newBlock };
  }

  // 생성 시점기준으로 블록높이 -10 블록 구하기

  // 현재 높이값 < DIFFICULTY_ADJUSTMENT_INTERVAL : 최초블록값 반환
  // 현재 높이값 > DIFFICULTY_ADJUSTMENT_INTERVAL : -10번째 블록 반환
  public getAdjustmentBlock() {
    const currentLength = this.getLength();
    const adjustmentBlock: Block =
      this.getLength() < DIFFICULTY_ADJUSTMENT_INTERVAL
        ? Block.getGENESIS()
        : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL];

    return adjustmentBlock; // 최초블록 or -10번째 블록 반환
  }
}
