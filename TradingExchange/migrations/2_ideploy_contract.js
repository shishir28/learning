var Exchange = artifacts.require("./Exchange.sol");
var TokenManagement = artifacts.require("./TokenManagement.sol");

var Dataset = artifacts.require("./Library/Dataset.sol");
var Utils = artifacts.require("./Library/Utils.sol");

module.exports = function(deployer) {
  deployer.deploy(Dataset);
  deployer.deploy(Utils);
  deployer.link(Dataset, TokenManagement);
  deployer.link(Utils, TokenManagement);
  deployer.deploy(TokenManagement);
};
