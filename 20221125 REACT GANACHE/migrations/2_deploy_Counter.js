const Counter = artifacts.require("Counter"); // build -> contracts 폴더안에있는 json 파일명이 들어가는거

module.exports = function (deployer) {
  deployer.deploy(Counter);
};
