const merkle = require("merkle");
// Merkle Tree는 Block에 포함된 트랜잭션들을 Tree 형태로 요약한것ㅎ
const data = ["12q312312312", "123asdf", "123asdf", "45566", "asdfsdf", "123adsd"];
// 머클트리는 비트코인 및 다른 암호화폐들에 필수적인 요소
// 데이터들을 해시화해서 더한후 해시화를 반복해서 트리처럼 뻗어 마지막 루트 해시값을 구한다.
// 머클루트가 처리하는게 암호화폐의 마이닝과 트랜잭션 검증

const merkleTree = merkle("sha256").sync(data);
const Root = merkleTree.root();
console.log(Root);
