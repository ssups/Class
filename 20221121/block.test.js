const Web3 = require("web3");

describe("블록 테스트", () => {
  let web3;

  it("web3 연결", async () => {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9000"));
    const block_number = await web3.eth.getBlockNumber();

    const block = await web3.eth.getBlock(8, true);
    console.log(block_number);
    console.log(block);
  });
});
