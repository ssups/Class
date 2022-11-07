import { Chain } from "./blockChain/chain";

export class BlockChain {
  public chain: Chain;
  constructor() {
    this.chain = new Chain();
  }
}
