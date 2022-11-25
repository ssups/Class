const helloworld = artifacts.require("HelloWorld");
// artifacts.require: 스마트컨트렉트 계정 정보 읽어오는 코드
//                    인수로 'HelloWorld'는 json 파일명이다.

module.exports = function (deployer) {
  // deployer는 트러플이 제공해주는 배포를 위한 툴
  // deployer.deploy 함수는 인수로 읽어온 계약정보를 받는다(HelloWorld.json 파일에서 읽어온 계약정보)
  deployer.deploy(helloworld);
};
