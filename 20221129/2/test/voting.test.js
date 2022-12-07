const Voting = artifacts.require("Voting");

// only메서드는 해당 테스트코드만 실행시켜준다
describe.only("Voting", () => {
  let deployed; //배포 컨트렉트 객체
  let candidateList; //후보자 리스트

  it("deployed", async () => {
    deployed = await Voting.deployed();
  });
  it("candidateList", async () => {
    // 컨트렉트에서 배열을 전부 하번에 들고올수가 없어서
    // 하나씩 호출해주는 방식
    const req = [
      deployed.candidateList.call(0),
      deployed.candidateList.call(1),
      deployed.candidateList.call(2),
      deployed.candidateList.call(3),
    ];

    // 비동기로 부르는동안 처리해주기
    // Promise.all(req); 이런식으로 써주면 인수값의 요소들이 전부 처리될때까지 기다림

    // 배열을 다 가져와서 담아주고
    candidateList = await Promise.all(req);
    console.log(candidateList);
  });
  it("voteForCandidate", async () => {
    await deployed.voteForCandidate(candidateList[0]);
    for (const key of candidateList) {
      let count = await deployed.totalVotesFor(key);
      console.log(`${key}: ${count}`);
    }
  }).timeout(10000);
});

// 테스트실행할때 npx truffle test
