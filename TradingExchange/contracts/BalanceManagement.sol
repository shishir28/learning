pragma solidity ^0.4.18;

import "./library/Utils.sol";
import "./library/Dataset.sol";
import "./TokenManagement.sol";
import "./ERC20/MonadToken.sol";
import "./ERC20/ERC20.sol";


contract BalanceManagement {

mapping (address => uint ) etherBalance;
mapping (address => mapping (uint8 => uint)) tokenBalance;

function depositEther() payable {
    require((etherBalance[msg.sender] + msg.value) >= etherBalance[msg.sender]);
    etherBalance[msg.sender] += msg.value;
    EtherReceived(msg.sender,msg.value,now);
}

function  withdrawEther (uint amountInWei) {
    require((etherBalance[msg.sender]) >= amountInWei);
    etherBalance[msg.sender] -= msg.value;
    msg.sender.transfer(amountInWei);
    EtherWithdrawn(msg.sender,msg.value,now);
}

function depositToken(string _symbolName, uint _amount) payable {
    var tm = new TokenManagement();
    uint8 symbolNameIndex = tm.getSymbolIndex(_symbolName);
    address tokenAddress = tm.getTokenAddress(_symbolName);
    require(tokenAddress != address(0));
    ERC20 currentToken = ERC20(tokenAddress);
    // transferFrom(address from, address to, uint256 value) 
    require(currentToken.transferFrom(msg.sender,address(this),_amount) == true);
    require((tokenBalance[msg.sender][symbolNameIndex] + _amount) >= tokenBalance[msg.sender][symbolNameIndex]);
    tokenBalance[msg.sender][symbolNameIndex] += _amount;
    TokenReceived(msg.sender,symbolNameIndex,_amount,now);
}

function  withdrawToken (string _symbolName, uint _amount) {
      var tm = new TokenManagement();
    uint8 symbolNameIndex = tm.getSymbolIndex(_symbolName);
    address tokenAddress = tm.getTokenAddress(_symbolName);
    require(tokenAddress != address(0));
    require((tokenBalance[msg.sender][symbolNameIndex]) >= _amount);
    tokenBalance[msg.sender][symbolNameIndex] -= _amount;
    ERC20 currentToken = ERC20(tokenAddress);
    require(currentToken.transfer(msg.sender,_amount) == true);
    TokenWithdrawn(msg.sender,symbolNameIndex,_amount,now);
}
//events declaration 

event EtherReceived(address indexed _from, uint _amount, uint _timestamp);
event EtherWithdrawn(address indexed _to, uint _amount, uint _timestamp);


event TokenReceived(address indexed _from, uint indexed _symbolIndex ,uint _amount, uint _timestamp);
event TokenWithdrawn(address indexed _to, uint indexed _symbolIndex ,uint _amount, uint _timestamp);


}