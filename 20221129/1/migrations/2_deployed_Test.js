const Test = artifacts.require("Test");

module.exports = function (deployer) {
  // Test의 배포가 되기전에
  // counstructor의 인수가 전달되어야한다.
  // constructor의 인수를 전달하기 위해선
  // deploy함수의 두번째 인수로 추가해주면된다. (deploy의 두번째 인수가 배포시킬 Test contract의 coustructor 인수로 들어가게됨)
  deployer.deploy(Test, 50);
};
