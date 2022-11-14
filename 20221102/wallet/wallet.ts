// 지갑 클래스

import { ECDH, randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";
import fs from "fs";
import path from "path";
import { toUSVString } from "util";

// __dirname -> 지금 폴더 경로
const dir = path.join(__dirname, "../data");

// elliptic 인스턴스 생성
const ec = new elliptic.ec("secp256k1");

export class Wallet {
  public account: string;
  public privateKey: string;
  public publicKey: string;
  public balance: number;

  constructor(privateKey: string = "") {
    // private의 존재 여부를 통해서 지갑이 생성되어 있는지 확인하는거임
    // 없으면 만들어줌
    this.privateKey = privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.account = this.getAccount();
    this.balance = 0;
    // fs모듈을 사용해서 지갑을 만들때 개인키를 안전하게 저장하는게 중요함
    // 따라서 루트 폴더에 data 폴더를 만들어준 후 createWallet 함수를 사용할때 마다 data 폴더에
    // 계정명과 파일명을 가지고 privateKey 값의 내용을 파일로 생성해준다.
    Wallet.createWallet(this);
  }

  static createWallet(myWallet: Wallet) {
    // fs 모듈을 이용해서 개인키를 저장할 파일 만들기
    // writeFileSync 함수의 인수 첫번째엔 파일이름 , 두번째엔 파일 내용이 들어감
    // 여기서 filename 에서 path.join 의 첫번째 인수로 저장할 경로를 설정해줌
    const filename = path.join(dir, myWallet.account);
    const filecontent = myWallet.privateKey;
    fs.writeFileSync(filename, filecontent);

    // 경로는?
  }

  // 전자서명을 만드는 함수
  static createSign(obj: any): elliptic.ec.Signature {
    // 객체로 보낸 사람의 공개키랑 주소를 sender에 전달하고
    // received에 받는 사람의 지갑주소
    // amount 에 보낼금액을 저장
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
    // 파일이름이 담긴 string타입의 원소를 가진 배열타입의 값을 뱉는다.
    return files;
  }
  // 지갑계정(주소)를 받고 개인키를 저장된 지갑 파일에서 구해주는 함수
  static getWalletPrivateKey(account: string): string {
    const filepath = path.join(dir, account);
    const filecontent = fs.readFileSync(filepath);
    return filecontent.toString();
  }

  public getPrivateKey(): string {
    // 개인키 만들기
    // 개인키 메타마스크에서 지갑별로 비공개키 표시 하면 보이는 그거인듯
    // 총 64자리 개인키가 생성됨
    return randomBytes(32).toString("hex");
  }
  public getPublicKey() {
    // 개인키와 페어를 이루는 공개키 생성
    // 현재 개인키의 type은 문자열이고
    // elliptic로 해석할수 있게 변환작업
    const keyPair = ec.keyFromPrivate(this.privateKey);
    return keyPair.getPublic().encode("hex", true);
  }
  public getAccount(): string {
    // 지갑주소 들고오기
    // Buffer.from은 인수로받은 문자열을 2진수테이터 형태로 뱉어주는거 같다.
    return Buffer.from(this.publicKey).slice(26).toString();
  }
}

const privateKey = "64ad715dccc19e0c9a7346d894f8c90236b3eff54af1db6c0f0048c12d9ca4bd";
// 지갑주소 0xb2E401C2E20e391F8F5b8FD7dfc8f02f24917612 42자리
const keyPair = ec.keyFromPrivate(privateKey);
const publicKey = keyPair.getPublic().encode("hex", true);
const address = Buffer.from(publicKey).slice(26).toString();
console.log(`공개키: ${publicKey} / 길이: ${publicKey.length}`);
console.log(`지갑주소: ${address} / 길이: ${address.length}`);

const privateKey2 = "436bf4a92202bd50aa035590b46cf575c0fae1b23787a39da26a518c99a146f2";
// 지갑주소 1bb702ca4ed0fffeb67a5cbf1c46973668509a15 40자리
const keyPair2 = ec.keyFromPrivate(privateKey2);
const publicKey2 = keyPair2.getPublic().encode("hex", true);
const address2 = Buffer.from(publicKey2).slice(26).toString();
console.log(`공개키2: ${publicKey2} / 길이: ${publicKey2.length}`);
console.log(`지갑주소2: ${address2} / 길이: ${address2.length}`);
