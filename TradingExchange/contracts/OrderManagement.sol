pragma solidity ^0.4.18;

import "./library/Utils.sol";
import "./library/Dataset.sol";

contract OrderManagement {


//events declaration 
// buy events
event BuyOrderCanceled(uint indexed _symbolIndex,uint _priceInWei, uint _orderKey);
event BuyOrderFulfilled(uint indexed _symbolIndex,uint _amount, uint _priceInWei, uint _orderKey);
event LimitBuyOrderCreated(uint indexed _symbolIndex, address indexed _who, uint _amount,uint _priceInWei,  uint _orderKey);
// sell events
event LimitSellrderCreated(uint indexed _symbolIndex, address indexed _who, uint _amount,uint _priceInWei,  uint _orderKey);
event SellOrderCanceled(uint indexed _symbolIndex,uint _priceInWei, uint _orderKey);
event SellOrderFulfilled(uint indexed _symbolIndex,uint _amount, uint _priceInWei, uint _orderKey);


}