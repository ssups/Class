const GoonToken = artifacts.require("GoonToken");
const EthSwap = artifacts.require("Ethswap");

module.exports = async function (deployer) {
  // 토큰부터 먼저 배포를 진행해준다음에
  await deployer.deploy(GoonToken);
  // 배포된 토큰컨트렉트 인스턴스 가져오기
  const token = await GoonToken.deployed();
  // token.address 하면 토큰컨트렉트의 CA 값이 가져와진다.

  // 배포한 토큰컨트렉트의 CA값을 인수로 전달해서 EthSwap 컨트렉트 배포함
  await deployer.deploy(EthSwap, token.address);
};
