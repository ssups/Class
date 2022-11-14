// 지갑 클래스

import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

// elliptic 인스턴스 생성
// 암호화폐 지갑은 자산(암호화폐를) 상대방과 주고받기 위해서 사용하는 소프트웨어의 한 종류라고 보면된다.
// 개인키가 있어야 본인의 지갑에 접근이 가능하다.
// 지갑은 암호화폐 자산을 관리하고 Dapps(탈중앙화 애플리케이션)과 상호작용을 하기위해서 사용한다.

// 공개키는 우리가 사용하는 은행계좌번호라고 생각하면 되고
// 개인키는 비밀번호, 핀번호 or 계좌 관리를 위한 수표의 서명과 비슷하다.

// 공개키로는 네트워크 참여자의 거래내역이 정상인지 아닌지 확일할수 있고
// 개인키로는 직접 거래를할때(트랜젝션 발생시킬때) 사용한다. (절대 잃어버리면 안됨)
// 잃어버리면 본인이 소유한 암호화폐 자산들인 묶인다고 보면된다.

// 단방향 암호화(해싱)을 통해서 키를 만들어낸다.
// 개인키의 역할을 공개키를 만들어주는 것이고 만든 공개키를 통해서 주소를 만들어준다.
// 공개키로 개인키를 알아내는건 불가능하고 또한 주소로 공개키를 알아내는건 불가능하다.

const ec = new elliptic.ec("secp256k1");

export interface ReceivedTx {
  sender: string;
  received: string;
  amount: number;
  signature: elliptic.ec.Signature;
}

export class Wallet {
  public account: string;
  // public privateKey : string
  public publicKey: string;
  // 지갑 잔고
  public balance: number;
  public signature: elliptic.ec.Signature;

  constructor(sender: string, signature: elliptic.ec.Signature) {
    this.publicKey = sender;
    this.account = Wallet.getAccount(this.publicKey);
    this.balance = 0;
    this.signature = signature;
  }

  static getVerify(receivedTx: ReceivedTx): Failable<undefined, string> {
    const { sender, received, amount, signature } = receivedTx;
    const data: [string, string, number] = [sender, received, amount];
    const hash: string = SHA256(data.join("")).toString();

    // 공개키로 서명 검증
    const keyPair = ec.keyFromPublic(sender, "hex");
    const isVerify = keyPair.verify(hash, signature);
    if (!isVerify) return { isError: true, value: "서명 검증이 안됨" };
    return { isError: false, value: undefined };
  }
  static sendTransaction(receivedTx: ReceivedTx) {
    // 서명 검증
    // 공개키, 보내는 사람: 공개키, 받는사람 : 계정, 보낼금액
    const verify = Wallet.getVerify(receivedTx);
    if (verify.isError) throw new Error(verify.value);
    // 보내는 사람의 지갑 정보를 최신화
    // 현재 가지고 있는 정보 공개키, 실제 트랜젝에 넣을 정보는 account 정보
    // const myWallet = new this(receivedTx.sender, receivedTx.signature);
  }

  static getAccount(publicKey: string): string {
    // 지갑주소 만들고 들고오기
    // 만들어놓은 공개키에서 앞의 24자리를 잘라내고 40자리만큼을 남겨주면 된다.
    // 24개를 잘라내는데 slice(26)을 하는 이유는 elliptic을 이용해서 만든 공개키의
    // 앞자리에 02 혹은 03이 붙어서 이를 제거하기 위함
    return Buffer.from(publicKey).slice(26).toString();
  }

  // 코인 보내는 사람의 잔액을 확인하기 위한 함수
  static getBalance(account: string, unspentTxOuts: IUnspentTxout[]): number {
    return unspentTxOuts
      .filter(v => {
        return v.account === account;
      })
      .reduce((acc, utxo) => {
        return (acc += utxo.amount);
      }, 0);
    // 남아있는 잔액을 확인하고 확인한 잔액으로 보낼수 있는지 확인하기 위해
  }
}
