const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting, ["민섭", "경국", "태석", "한결"]);
};
