pragma solidity ^0.4.18;

import "./library/Utils.sol";
import "./ERC20/ERC20.sol";

contract Exchange {
 
 struct Offer {
        uint amount;
        address who;
    }

    struct OrderBook {
        uint higherPrice;
        uint lowerPrice;

        mapping (uint => Offer) offers;
        
        uint offersKey;
        uint offersLength;
    }

     struct Token {

        address  tokenContract ;
        string symbolName;

        uint currentBuyPrice ;
        uint lowestBuyPrice ;
        uint amountBuyPrices ;

        uint currentSellPrice ;
        uint highestSellPrice ;
        uint amountSellPrices ;
        
        mapping(uint => OrderBook) buyBook;
        
        mapping(uint => OrderBook) sellBook;
    }

    uint8 symbolNameIndex ; 
    mapping (uint8 => Token) tokens;

    // Balance Management 
    
     mapping (address => uint ) etherBalance;
    mapping (address => mapping (uint8 => uint)) tokenBalance;


// -------------------------------Token Management  -------------------------------

    function addToken(string _symbolName, address _tokenAddress)  returns (bool){
        require(!hasToken(_symbolName));
        require(symbolNameIndex+1 > symbolNameIndex);
        symbolNameIndex++;
         
        tokens[symbolNameIndex].symbolName = _symbolName;
        tokens[symbolNameIndex].tokenContract = _tokenAddress;
        TokenAddedToExchange(symbolNameIndex,_symbolName,now);
        return true;
    }

    event TokenAddedToExchange(uint _symbolIndex,string _symbolName, uint _timestamp);


    function getTokenAddress(string _symbolName) public returns (address) {
        uint8 indexValue = getSymbolIndex(_symbolName);
        return tokens[indexValue].tokenContract;
    }

    function getSymbolIndex(string _symbolName) public returns (uint8) {
        for (var index = 0; index < symbolNameIndex; index++) {
            if (Utils.stringsEqual(_symbolName, tokens[index].symbolName)) {
                return index;
            }
        }
        return 0;
    }

      function hasToken(string symbolName) constant returns (bool) {
        uint8 index = getSymbolIndex(symbolName);
        return (index != 0);
    }

    // -------------------------------Balance Management  -------------------------------

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
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);
        address tokenAddress = tokens[symbolNameIndex].tokenContract;
        require(tokenAddress != address(0));
        ERC20 currentToken = ERC20(tokenAddress);
        require(currentToken.transferFrom(msg.sender,address(this),_amount) == true);
        require((tokenBalance[msg.sender][symbolNameIndex] + _amount) >= tokenBalance[msg.sender][symbolNameIndex]);
        tokenBalance[msg.sender][symbolNameIndex] += _amount;
        TokenReceived(msg.sender,symbolNameIndex,_amount,now);
    }

    function  withdrawToken (string _symbolName, uint _amount) {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);
        address tokenAddress = tokens[symbolNameIndex].tokenContract;
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


    // -------------------------------Order Management  -------------------------------

    //events declaration 
    // buy events
    event BuyOrderCanceled(uint indexed _symbolIndex, uint _priceInWei, uint _orderKey);
    //event BuyOrderFulfilled(uint indexed _symbolIndex,uint _amount, uint _priceInWei, uint _orderKey);
    event LimitBuyOrderCreated(uint indexed _symbolIndex, address indexed _who, uint _amount, uint _priceInWei, uint _orderKey);
    // sell events
    event LimitSellrderCreated(uint indexed _symbolIndex, address indexed _who, uint _amount, uint _priceInWei, uint _orderKey);
    event SellOrderCanceled(uint indexed _symbolIndex, uint _priceInWei, uint _orderKey);
    event SellOrderFulfilled(uint indexed _symbolIndex, uint _amount, uint _priceInWei, uint _orderKey);

    function getBuyOrderBook(string _symbolName) constant returns(uint[], uint[]) {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);

        uint[] memory priceBuyArray = new uint[](tokens[symbolNameIndex].amountBuyPrices);
        uint[] memory volumeBuyArray = new uint[](tokens[symbolNameIndex].amountBuyPrices);

        uint currentLowestOffer = tokens[symbolNameIndex].lowestBuyPrice;

        uint counter = 0;

        if (tokens[symbolNameIndex].currentBuyPrice > 0) {
            while (currentLowestOffer <= tokens[symbolNameIndex].currentBuyPrice) {
                priceBuyArray[counter] = currentLowestOffer;
                uint volumeAtThisPrice = 0;
                var currentBuyBook = tokens[symbolNameIndex].buyBook[currentLowestOffer];
                uint offersKey = currentBuyBook.offersKey;

                while (offersKey < currentBuyBook.offersLength) {
                    volumeAtThisPrice += currentBuyBook.offers[offersKey].amount;
                    offersKey++;
                }
                volumeBuyArray[counter] = volumeAtThisPrice;

                if (currentLowestOffer == currentBuyBook.higherPrice) {
                   break; 
                } else {
                    currentLowestOffer = currentBuyBook.higherPrice;
                }
                counter ++;
            }
        }
        return (priceBuyArray,volumeBuyArray);
    }

     function getSellOrderBook(string _symbolName) constant returns(uint[], uint[]) {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);

        uint[] memory priceSellArray = new uint[](tokens[symbolNameIndex].amountSellPrices);
        uint[] memory volumeSellArray = new uint[](tokens[symbolNameIndex].amountSellPrices);

        uint currentSellOffer = tokens[symbolNameIndex].currentSellPrice;

        uint counter = 0;

        if (tokens[symbolNameIndex].currentSellPrice > 0) {
            while (currentSellOffer <= tokens[symbolNameIndex].highestSellPrice) {
                priceSellArray[counter] = currentSellOffer;
                uint volumeAtThisPrice = 0;
                var currentSellBook = tokens[symbolNameIndex].sellBook[currentSellOffer];
                uint offersKey = currentSellBook.offersKey;

                while (offersKey < currentSellBook.offersLength) {
                    volumeAtThisPrice += currentSellBook.offers[offersKey].amount;
                    offersKey++;
                }
                volumeSellArray[counter] = volumeAtThisPrice;

                if (currentSellBook.higherPrice == 0) {
                   break; 
                } else {
                    currentSellOffer = currentSellBook.higherPrice;
                }
                counter ++;
            }
        }
        return (priceSellArray,volumeSellArray);
    }
}
