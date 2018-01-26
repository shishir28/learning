var Exchange = artifacts.require("./Exchange.sol");
var MonadToken = artifacts.require("./ERC20/MonadToken.sol");

var Utils = artifacts.require("./Library/Utils.sol");

module.exports = function(deployer) {
  deployer.deploy(Utils);
  deployer.link(Utils, Exchange);
  deployer.deploy(Exchange);
  deployer.deploy(MonadToken);
  
};
