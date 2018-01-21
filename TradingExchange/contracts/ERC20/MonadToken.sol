pragma solidity ^0.4.18;

import "./ERC20.sol";
import  "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract MonadToken is ERC20, Ownable {
  string public constant name = "Monad Token";
  string public constant symbol= "MON";
  uint8 public constant decimals = 0;

  uint256 totalInSupply = 1000000;
  address public owner;
  mapping (address => uint256) balance;
  mapping (address => mapping (address => uint256)) allowed;


  function MonadToken() {
    owner = msg.sender;
  }

  function totalSupply() public view returns (uint256) {
    return totalInSupply;
  }

  function balanceOf(address who) public view returns (uint256) {
    return balance[who];
  }

  function transfer(address to, uint256 value) public returns (bool) {
     if ((balance[msg.sender] >= value) && (value > 0)) {
       balance[msg.sender] = balance[owner] - value;
       balance[to] = balance[to] + value; 
       // notifiy by invoking event
       Transfer(msg.sender, to, value);
      return true;
     }
     return false;
  }

  function transferFrom(address from, address to, uint256 value) public returns (bool) {
     if ((balance[from] >= value) && (allowed[from][msg.sender] >= value) && (value > 0)) {
          balance[from] = balance[from] - value;
          allowed[from][msg.sender] = allowed[from][owner] - value;
          balance[to] = balance[to] + value; 
          // notifiy by invoking event
          Transfer(from, to, value);
          return true;
     }
     return false;
  }

  function allowance(address owner, address spender) public view returns (uint256) {
    return  allowed[owner][spender];
  }

  function approve(address spender, uint256 value) public returns (bool) {
    allowed[msg.sender][spender] = value;
    // notifiy by invoking event
    Approval(msg.sender, spender, value);
    return true;
  }

}