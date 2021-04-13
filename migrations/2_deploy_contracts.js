const HealthPass = artifacts.require("HealthPass.sol");

module.exports = function(deployer) {
  deployer.deploy(HealthPass);
};