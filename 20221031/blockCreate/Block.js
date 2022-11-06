// 최초 블록 만들기(제네시스 블록)
const merkle = require("merkle");
const SHA256 = require("crypto-js/sha256");

// 블록 헤더를 만들 클래스
class Header {
  constructor(_height, _previousHash) {
    // 블록의 버전
    this.version = Header.getVersion();
    // 블록의 높이
    this.height = _height;
    // 블록의 생성 시간
    this.timestamp = Header.getTimestamp();
    // 이전 블록의 해시값
    // 최초 블록은 이전 블록의 해시값이 없으니깐
    // 0으로 만들어진 문자열 넣어줌
    this.previousHash = _previousHash || "0".repeat(64);
  }
  //  static으로 만들어서 버전 정보 전역적으로 볼수있게 만듬
  static getVersion() {
    return "1.0.0";
  }

  static getTimestamp() {
    return new Date().getTime();
  }
}

// 블록 class

class Block {
  constructor(_header, _data) {
    // 받아온 헤더의 값들 넘겨줌
    this.version = _header.version;
    this.height = _header.height;
    this.timestamp = _header.timestamp;
    this.previousHash = _header.previousHash;

    this.data = _data;
    this.merkleRoot = Block.getMerkelRoot(_data);
    this.hash = Block.createBlockHash(_header, this.merkleRoot);
  }
  static getMerkelRoot(_data) {
    const merkleTree = merkle("sha256").sync(_data);
    return merkleTree.root();
  }
  static createBlockHash(_header, _merkleRoot) {
    const values = Object.values(_header);
    // 해더값들이랑 머클루트를 합친값을 다시 해싱한게 블록해시값
    const data = values.join("") + _merkleRoot;
    return SHA256(data).toString();
  }
}

// 2009년 1월 3일 (제네시스 블록): '더 타임즈, 은행들의 두번째 구제 금융을 앞두고 있는 U.K 재무장관'
// 실제로 비트코인 최초 트렌젝션에 적혀있는 코멩트임
const data1 = ["Thie Times 03/Jan/2009 Chancellor on brink of second bailout"];
// 헤더 동적할당으로 생성
const header1 = new Header(0);
const block1 = new Block(header1, data1);
console.log(block1);

const header2 = new Header(1, block1.hash);
const block2 = new Block(header2, ["두번째 블록"]);
console.log(block2);
