// 제네시스 블록은 여기다가

export const GENESIS: IBlock = {
  version: "1.0.0",
  height: 0,
  timestamp: new Date().getTime(),
  hash: "0".repeat(64),
  previousHash: "0".repeat(64),
  merkleRoot: "0".repeat(64),
  difficulty: 0,
  nonce: 0,
  data: ["The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"],
};
