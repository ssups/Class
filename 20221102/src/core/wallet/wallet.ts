// 지갑 클래스

import { ECDH, randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";
import fs from "fs";
import path from "path";

// __dirname -> 지금 폴더 경로
const dir = path.join(__dirname, "../data");

// elliptic 인스턴스 생성
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
  public balance: number;
  public signature: elliptic.ec.Signature;

  constructor(sender: string, signature: elliptic.ec.Signature) {
    // this.privateKey = privateKey || this.getPrivateKey()
    this.publicKey = sender;
    this.account = this.getAccount();
    this.balance = 0;
    this.signature = signature;
    // fs모듈을 사용해서 지갑을 만들때 개인키를 안전하게 저장하는게 중요함
    // 따라서 루트 폴더에 data 폴더를 만들어준 후 createWallet 함수를 사용할때 마다 data 폴더에
    // 계정명과 파일명을 가지고 privateKey 값의 내용을 파일로 생성해준다.
    // Wallet.createWallet(this);
  }

  //   static createWallet(myWallet: Wallet) {
  //     // fs 모듈을 이용해서 개인키를 저장할 파일 만들기
  //     // writeFileSync 함수의 인수 첫번째엔 파일이름 , 두번째엔 파일 내용이 들어감
  //     const filename = path.join(dir, myWallet.account);
  //     const filecontent = myWallet.privateKey;
  //     fs.writeFileSync(filename, filecontent);
  //     // 경로는?
  //   }
  static createSign(obj: any): elliptic.ec.Signature {
    const {
      sender: { publicKey, account },
      received,
      amount,
    } = obj;

    // 해싱
    // 합쳐서 해싱하고 문자열로 지정
    const hash: string = SHA256([publicKey, received, amount].join("")).toString();

    // 개인키
    const privateKey: string = Wallet.getWalletPrivateKey(account);

    // 서명
    const keyPair: elliptic.ec.KeyPair = ec.keyFromPrivate(privateKey);

    return keyPair.sign(hash, "hex");
  }
  static getWalletList(): string[] {
    const files: string[] = fs.readdirSync(dir);
    return files;
  }
  // 지갑계정(주소)를 받고 개인키를 구해주는 함수
  static getWalletPrivateKey(account: string): string {
    const filepath = path.join(dir, account);
    const filecontent = fs.readFileSync(filepath);
    return filecontent.toString();
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
    //
    const myWallet = new this(receivedTx.sender, receivedTx.signature);
  }

  public getPrivateKey(): string {
    // 개인키 만들기
    return randomBytes(32).toString("hex");
  }
  //   public getPublicKey() {
  //     // 개인키와 페어를 이루는 공개키 생성
  //     // 현재 개인키의 type은 문자열이고
  //     // elliptic로 해석할수 있게 변환작업
  //     const keyPair = ec.keyFromPrivate(this.privateKey);
  //     return keyPair.getPublic().encode("hex", true);
  //   }
  public getAccount(): string {
    // 지갑주소 들고오기
    return Buffer.from(this.publicKey).slice(26).toString();
  }
}
