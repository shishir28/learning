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

        mapping(uint => Offer) offers;

        uint offersKey;
        uint offersLength;
    }

    struct Token {

        address tokenContract;
        string symbolName;

        uint currentBuyPrice;
        uint lowestBuyPrice;
        uint amountBuyPrices;

        uint currentSellPrice;
        uint highestSellPrice;
        uint amountSellPrices;

        mapping(uint => OrderBook) buyBook;

        mapping(uint => OrderBook) sellBook;
    }

    uint8 symbolNameIndex;
    mapping(uint8 => Token) tokens;

    // Balance Management 

    mapping(address => uint) etherBalance;
    mapping(address => mapping(uint8 => uint)) tokenBalance;


    // -------------------------------Token Management  -------------------------------

    function addToken(string _symbolName, address _tokenAddress) returns(bool) {
        require(!hasToken(_symbolName));
        require(symbolNameIndex + 1 > symbolNameIndex);
        symbolNameIndex++;

        tokens[symbolNameIndex].symbolName = _symbolName;
        tokens[symbolNameIndex].tokenContract = _tokenAddress;
        TokenAddedToExchange(symbolNameIndex, _symbolName, now);
        return true;
    }

    event TokenAddedToExchange(uint _symbolIndex, string _symbolName, uint _timestamp);


    function getTokenAddress(string _symbolName) public returns(address) {
        uint8 indexValue = getSymbolIndex(_symbolName);
        return tokens[indexValue].tokenContract;
    }

    function getSymbolIndex(string _symbolName) public returns(uint8) {
        for (var index = 0; index < symbolNameIndex; index++) {
            if (Utils.stringsEqual(_symbolName, tokens[index].symbolName)) {
                return index;
            }
        }
        return 0;
    }

    function hasToken(string symbolName) constant returns(bool) {
        uint8 index = getSymbolIndex(symbolName);
        return (index != 0);
    }

    // -------------------------------Balance Management  -------------------------------

    function depositEther() payable {
        require((etherBalance[msg.sender] + msg.value) >= etherBalance[msg.sender]);
        etherBalance[msg.sender] += msg.value;
        EtherReceived(msg.sender, msg.value, now);
    }

    function withdrawEther(uint amountInWei) {
        require((etherBalance[msg.sender]) >= amountInWei);
        etherBalance[msg.sender] -= msg.value;
        msg.sender.transfer(amountInWei);
        EtherWithdrawn(msg.sender, msg.value, now);
    }

    function depositToken(string _symbolName, uint _amount) payable {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);
        address tokenAddress = tokens[symbolNameIndex].tokenContract;
        require(tokenAddress != address(0));
        ERC20 currentToken = ERC20(tokenAddress);
        require(currentToken.transferFrom(msg.sender, address(this), _amount) == true);
        require((tokenBalance[msg.sender][symbolNameIndex] + _amount) >= tokenBalance[msg.sender][symbolNameIndex]);
        tokenBalance[msg.sender][symbolNameIndex] += _amount;
        TokenReceived(msg.sender, symbolNameIndex, _amount, now);
    }

    function withdrawToken(string _symbolName, uint _amount) {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);
        address tokenAddress = tokens[symbolNameIndex].tokenContract;
        require(tokenAddress != address(0));
        require((tokenBalance[msg.sender][symbolNameIndex]) >= _amount);
        tokenBalance[msg.sender][symbolNameIndex] -= _amount;
        ERC20 currentToken = ERC20(tokenAddress);
        require(currentToken.transfer(msg.sender, _amount) == true);
        TokenWithdrawn(msg.sender, symbolNameIndex, _amount, now);
    }
    //events declaration 

    event EtherReceived(address indexed _from, uint _amount, uint _timestamp);
    event EtherWithdrawn(address indexed _to, uint _amount, uint _timestamp);

    event TokenReceived(address indexed _from, uint indexed _symbolIndex, uint _amount, uint _timestamp);
    event TokenWithdrawn(address indexed _to, uint indexed _symbolIndex, uint _amount, uint _timestamp);


    // -------------------------------Order Management  -------------------------------

    //events declaration 
    // buy events
    event BuyOrderCanceled(uint indexed _symbolIndex, uint _priceInWei, uint _orderKey);
    //event BuyOrderFulfilled(uint indexed _symbolIndex,uint _amount, uint _priceInWei, uint _orderKey);
    event LimitBuyOrderCreated(uint indexed _symbolIndex, address indexed _who, uint _amount, uint _priceInWei, uint _orderKey);
    // sell events
    event LimitSellOrderCreated(uint indexed _symbolIndex, address indexed _who, uint _amount, uint _priceInWei, uint _orderKey);
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
                counter++;
            }
        }
        return (priceBuyArray, volumeBuyArray);
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
                counter++;
            }
        }
        return (priceSellArray, volumeSellArray);
    }

    function cancelOrder(string _symbolName, bool _isSellOrder, uint _priceInWei, uint _offerKey) {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);

        if (_isSellOrder) {
            var currentSellBook = tokens[symbolNameIndex].sellBook[_priceInWei];
            require(currentSellBook.offers[_offerKey].who == msg.sender);
            var tokenAmount = currentSellBook.offers[_offerKey].amount;
            var currentTokenBalance = tokenBalance[msg.sender][symbolNameIndex];
            require(currentTokenBalance + tokenAmount >= currentTokenBalance);

            currentTokenBalance += tokenAmount;
            currentSellBook.offers[_offerKey].amount = 0;
            SellOrderCanceled(symbolNameIndex, _priceInWei, _offerKey);

        } else {
            var currentBuyBook = tokens[symbolNameIndex].buyBook[_priceInWei];
            require(currentBuyBook.offers[_offerKey].who == msg.sender);
            var etherRefund = currentBuyBook.offers[_offerKey].amount * _priceInWei;
            require(etherBalance[msg.sender] + etherRefund >= etherBalance[msg.sender]);
            etherBalance[msg.sender] += etherRefund;
            currentBuyBook.offers[_offerKey].amount = 0;
            BuyOrderCanceled(symbolNameIndex, _priceInWei, _offerKey);
        }
    }

    function addBuyOffer(uint8 symbolNameIndex, uint _priceInWei, uint _amount, address who) internal {
        var currentBuyBook = tokens[symbolNameIndex].buyBook[_priceInWei];
        currentBuyBook.offersLength++;
        currentBuyBook.offers[currentBuyBook.offersLength] = Offer(_amount, who);

        if (currentBuyBook.offersLength == 1) {
            currentBuyBook.offersKey = 1;
            tokens[symbolNameIndex].amountBuyPrices++;
            uint currentBuyPrice = tokens[symbolNameIndex].currentBuyPrice;
            uint lowestBuyPrice = tokens[symbolNameIndex].lowestBuyPrice;

            if ((lowestBuyPrice == 0) || (lowestBuyPrice > _priceInWei)) {
                if (currentBuyPrice == 0) {
                    tokens[symbolNameIndex].currentBuyPrice = _priceInWei;
                    currentBuyBook.higherPrice = _priceInWei;
                    currentBuyBook.lowerPrice = 0;
                } else {
                    tokens[symbolNameIndex].buyBook[lowestBuyPrice].lowerPrice = _priceInWei;
                    currentBuyBook.higherPrice = lowestBuyPrice;
                    currentBuyBook.lowerPrice = 0;
                }
                tokens[symbolNameIndex].lowestBuyPrice = _priceInWei;
            } else if (currentBuyPrice < _priceInWei) {
                tokens[symbolNameIndex].buyBook[currentBuyPrice].higherPrice = _priceInWei;
                currentBuyBook.higherPrice = _priceInWei;
                currentBuyBook.lowerPrice = currentBuyPrice;
                tokens[symbolNameIndex].currentBuyPrice = _priceInWei;
            } else {
                uint  buyPrice = tokens[symbolNameIndex].currentBuyPrice ;
                bool found  = false;
                while((buyPrice > 0) && (!found) ) {
                    if(buyPrice <  _priceInWei &&  tokens[symbolNameIndex].buyBook[buyPrice].higherPrice  > _priceInWei ) {
                        currentBuyBook.lowerPrice = buyPrice;
                        currentBuyBook.higherPrice = tokens[symbolNameIndex].buyBook[buyPrice].higherPrice;
                        tokens[symbolNameIndex].buyBook[tokens[symbolNameIndex].buyBook[buyPrice].higherPrice].lowerPrice = _priceInWei;
                        tokens[symbolNameIndex].buyBook[buyPrice].higherPrice = _priceInWei;
                        found = true;
                    }
                    buyPrice = tokens[symbolNameIndex].buyBook[buyPrice].lowerPrice;
                }
            }
        }
    }

    function addSellOffer(uint8 symbolNameIndex, uint _priceInWei, uint _amount, address who) internal {
        
        var currentSellBook = tokens[symbolNameIndex].sellBook[_priceInWei];
        currentSellBook.offersLength++;
        currentSellBook.offers[currentSellBook.offersLength] = Offer(_amount, who);

        if (currentSellBook.offersLength == 1) {
            currentSellBook.offersKey = 1;
            tokens[symbolNameIndex].amountSellPrices++;
            uint currentSellPrice = tokens[symbolNameIndex].currentSellPrice;
            uint highestSellPrice = tokens[symbolNameIndex].highestSellPrice;

            if ((highestSellPrice == 0) || (highestSellPrice < _priceInWei)) {
                if (currentSellPrice == 0) {
                    tokens[symbolNameIndex].currentSellPrice = _priceInWei;
                    currentSellBook.higherPrice = 0;
                    currentSellBook.lowerPrice = 0;
                } else {
                    tokens[symbolNameIndex].sellBook[highestSellPrice].higherPrice = _priceInWei;
                    currentSellBook.lowerPrice = highestSellPrice;
                    currentSellBook.higherPrice = 0;
                }
                tokens[symbolNameIndex].highestSellPrice = _priceInWei;
            } else if (currentSellPrice > _priceInWei) {
                tokens[symbolNameIndex].sellBook[currentSellPrice].lowerPrice = _priceInWei;
                currentSellBook.higherPrice = currentSellPrice;
                currentSellBook.lowerPrice = 0;
                tokens[symbolNameIndex].currentSellPrice = _priceInWei;
            } else {
                uint  sellPrice = tokens[symbolNameIndex].currentSellPrice ;
                bool found  = false;
                while((sellPrice > 0) && (!found) ) {
                    if(sellPrice <  _priceInWei &&  tokens[symbolNameIndex].sellBook[sellPrice].higherPrice  > _priceInWei ) {
                        currentSellBook.lowerPrice = sellPrice;
                        currentSellBook.higherPrice = tokens[symbolNameIndex].sellBook[sellPrice].higherPrice;
                       
                        tokens[symbolNameIndex].sellBook[tokens[symbolNameIndex].sellBook[sellPrice].higherPrice].lowerPrice = _priceInWei;
                        tokens[symbolNameIndex].sellBook[sellPrice].higherPrice = _priceInWei;
                        found = true;
                    }
                    sellPrice = tokens[symbolNameIndex].sellBook[sellPrice].higherPrice;
                }
            }
        }
    }


    function buyToken(string _symbolName, uint _priceInWei, uint _amount) {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);
        uint requiredEtherAmount = 0;

        if(tokens[symbolNameIndex].amountSellPrices==0 || tokens[symbolNameIndex].currentSellPrice > _priceInWei) {
            requiredEtherAmount = _amount * _priceInWei;
            require(requiredEtherAmount >= _amount);
            require(requiredEtherAmount >= _priceInWei);
            require(etherBalance[msg.sender] >= requiredEtherAmount);
            require(etherBalance[msg.sender] - requiredEtherAmount >= 0);
            
            etherBalance[msg.sender] -= requiredEtherAmount;
            addBuyOffer( symbolNameIndex, _priceInWei, _amount, msg.sender);
            LimitBuyOrderCreated(symbolNameIndex, msg.sender, _amount, _priceInWei, tokens[symbolNameIndex].buyBook[_priceInWei].offersLength);
        } else {
            uint totalAvailableEther = 0;
            uint currentSellPrice = tokens[symbolNameIndex].currentSellPrice;
            uint amountNecessary = _amount;
            uint offersKey ;

            while(currentSellPrice < _priceInWei && amountNecessary > 0) {
                offersKey = tokens[symbolNameIndex].sellBook[currentSellPrice].offersKey;
                while(offersKey <= tokens[symbolNameIndex].sellBook[currentSellPrice].offersLength && amountNecessary > 0){
                    uint volumePriceFromAddress = tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].amount;
                    if(volumePriceFromAddress <= amountNecessary) {
                        totalAvailableEther = volumePriceFromAddress * currentSellPrice;
                        require(etherBalance[msg.sender] >= totalAvailableEther);
                        require(etherBalance[msg.sender] - totalAvailableEther >= etherBalance[msg.sender]);
                        etherBalance[msg.sender] -= totalAvailableEther;
                        require((tokenBalance[msg.sender][symbolNameIndex] + volumePriceFromAddress) >= (tokenBalance[msg.sender][symbolNameIndex]));
                        require(etherBalance[tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].who] + totalAvailableEther >= etherBalance[tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].who]);
                        tokenBalance[msg.sender][symbolNameIndex] += volumePriceFromAddress;
                        tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].amount = 0;
                        etherBalance[tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].who] += totalAvailableEther;
                        tokens[symbolNameIndex].sellBook[currentSellPrice].offersKey++;
                        SellOrderFulfilled(symbolNameIndex, volumePriceFromAddress,currentSellPrice, offersKey);
                        amountNecessary -= volumePriceFromAddress;
                    } else {
                        require(tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].amount > amountNecessary);
                        requiredEtherAmount = amountNecessary * currentSellPrice;
                        require(etherBalance[msg.sender] - requiredEtherAmount <= etherBalance[msg.sender]);
                        etherBalance[msg.sender] -= requiredEtherAmount;
                        require(etherBalance[tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].who] + requiredEtherAmount >= etherBalance[tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].who]);
                        tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].amount -= amountNecessary;
                        etherBalance[tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].who] += requiredEtherAmount;
                        tokenBalance[msg.sender][symbolNameIndex] += amountNecessary;
                        amountNecessary = 0;
                        SellOrderFulfilled(symbolNameIndex, amountNecessary,currentSellPrice, offersKey);
                    }

                    if((offersKey == tokens[symbolNameIndex].sellBook[currentSellPrice].offersLength) && 
                       ( tokens[symbolNameIndex].sellBook[currentSellPrice].offers[offersKey].amount == 0) ) {
                           tokens[symbolNameIndex].amountSellPrices--;

                           if(currentSellPrice == tokens[symbolNameIndex].sellBook[currentSellPrice].higherPrice || tokens[symbolNameIndex].buyBook[currentSellPrice].higherPrice == 0 ) {
                                tokens[symbolNameIndex].currentSellPrice = 0;
                           } else {
                               tokens[symbolNameIndex].currentSellPrice = tokens[symbolNameIndex].sellBook[currentSellPrice].higherPrice;
                               tokens[symbolNameIndex].sellBook[tokens[symbolNameIndex].buyBook[currentSellPrice].higherPrice].lowerPrice = 0;
                           }
                    }
                    offersKey++;
                }
                currentSellPrice = tokens[symbolNameIndex].currentSellPrice;
            } // end of outer  while  loop 

            if(amountNecessary > 0) {
                buyToken(_symbolName,_priceInWei,amountNecessary);
            }
        }
    }  //end of function

    function sellToken(string _symbolName, uint _priceInWei, uint _amount) {
        uint8 symbolNameIndex = getSymbolIndex(_symbolName);
        uint requiredEtherAmount = 0;
        uint totalAvailableEther = 0;

        if(tokens[symbolNameIndex].amountBuyPrices == 0 || tokens[symbolNameIndex].currentBuyPrice < _priceInWei) {
            requiredEtherAmount = _amount * _priceInWei;
            require(requiredEtherAmount >= _amount);
            require(requiredEtherAmount >= _priceInWei);
            require(tokenBalance[msg.sender][symbolNameIndex] >= _amount);
            require(tokenBalance[msg.sender][symbolNameIndex] - _amount >= 0);
            require((etherBalance[msg.sender] + requiredEtherAmount) >= etherBalance[msg.sender]);
            tokenBalance[msg.sender][symbolNameIndex] -= _amount;
            addSellOffer( symbolNameIndex, _priceInWei,_amount, msg.sender);
            LimitSellOrderCreated(symbolNameIndex, msg.sender, _amount, _priceInWei, tokens[symbolNameIndex].sellBook[_priceInWei].offersLength);
        } else {
           
            uint currentBuyPrice = tokens[symbolNameIndex].currentBuyPrice;
            uint amountNecessary = _amount;
            uint offersKey;

            while(currentBuyPrice >= _priceInWei && amountNecessary > 0) {
                offersKey = tokens[symbolNameIndex].buyBook[currentBuyPrice].offersKey;
                while(offersKey <= tokens[symbolNameIndex].buyBook[currentBuyPrice].offersLength && amountNecessary > 0) {

                    uint volumePriceFromAddress = tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].amount;

                    if (volumePriceFromAddress <= amountNecessary) {
                        totalAvailableEther = volumePriceFromAddress * currentBuyPrice;
                        require(tokenBalance[msg.sender][symbolNameIndex] >= volumePriceFromAddress);
                        tokenBalance[msg.sender][symbolNameIndex] -= volumePriceFromAddress;
                        require((tokenBalance[msg.sender][symbolNameIndex] - volumePriceFromAddress) >= 0);
                        require((tokenBalance[tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].who][symbolNameIndex] + totalAvailableEther) > (tokenBalance[tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].who][symbolNameIndex]));
                        require((etherBalance[msg.sender] + totalAvailableEther) >= etherBalance[msg.sender]);
                        tokenBalance[tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].who][symbolNameIndex] += volumePriceFromAddress;
                        tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].amount = 0;
                        etherBalance[msg.sender] += totalAvailableEther;
                        tokens[symbolNameIndex].buyBook[currentBuyPrice].offersKey++;
                        SellOrderFulfilled(symbolNameIndex, volumePriceFromAddress,currentBuyPrice, offersKey);
                        amountNecessary -= volumePriceFromAddress;
                    } else {
                        require(volumePriceFromAddress - amountNecessary > 0);
                        requiredEtherAmount = amountNecessary * currentBuyPrice;
                        require(tokenBalance[msg.sender][symbolNameIndex] >= amountNecessary);
                        tokenBalance[msg.sender][symbolNameIndex] -= amountNecessary;
                        require(tokenBalance[msg.sender][symbolNameIndex] >= amountNecessary);
                        require(etherBalance[msg.sender] + requiredEtherAmount >= etherBalance[msg.sender] );
                        require(tokenBalance[tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].who][symbolNameIndex] + amountNecessary >= tokenBalance[tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].who][symbolNameIndex]);
                        tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].amount -= amountNecessary;
                        etherBalance[msg.sender] += amountNecessary;
                        tokenBalance[tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].who][symbolNameIndex] += amountNecessary;
                        SellOrderFulfilled(symbolNameIndex, amountNecessary,currentBuyPrice, offersKey);
                        amountNecessary = 0;
                    }

                    if((offersKey == tokens[symbolNameIndex].buyBook[currentBuyPrice].offersLength) && 
                       (tokens[symbolNameIndex].buyBook[currentBuyPrice].offers[offersKey].amount == 0)) {
                           tokens[symbolNameIndex].amountBuyPrices--;

                           if(currentBuyPrice == tokens[symbolNameIndex].buyBook[currentBuyPrice].lowerPrice || tokens[symbolNameIndex].buyBook[currentBuyPrice].lowerPrice == 0 ) {
                                tokens[symbolNameIndex].currentBuyPrice = 0;
                           } else {
                               tokens[symbolNameIndex].currentBuyPrice = tokens[symbolNameIndex].buyBook[currentBuyPrice].lowerPrice;
                               tokens[symbolNameIndex].buyBook[tokens[symbolNameIndex].buyBook[currentBuyPrice].lowerPrice].higherPrice =  tokens[symbolNameIndex].currentBuyPrice;
                           }
                    }
                    offersKey++;
                }
                currentBuyPrice = tokens[symbolNameIndex].currentBuyPrice;
            } // end of outer  while  loop 

            if(amountNecessary > 0) {
                sellToken(_symbolName,_priceInWei,amountNecessary);
            }
        }
    }  //end of function
}