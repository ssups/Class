const helloworld = artifacts.require("HelloWorld");

// 테스트코드 실행 명령어
// npx truffle test
contract("HelloWorld", account => {
  console.log(account);

  let hello;
  describe("hello contract", async () => {
    it("contract", async () => {
      hello = await helloworld.deployed();
    });
    it("get value", async () => {
      console.log(await hello.value.call());
    });
  });
});
