pragma solidity ^0.4.18;

library Dataset {

    struct Offer {
        uint amount;
        address who;
    }

    struct OrderBook {
        uint higherPrice;
        uint lowerPrice;

        mapping (uint => Offer) offers;
        
        uint offers_key;
        uint offers_length;
    }

    struct Token {

        address tokenContract;
        string symbolName;

        uint currentBuyPrice ;
        uint lowestBuyPrice ;
        uint amountBuyPrice ;

        uint currentSellPrice ;
        uint highestSellPrice ;
        uint amountSellPrice ;
        
        mapping(uint => OrderBook) buyBook;
        
        mapping(uint => OrderBook) sellBook;
    }
}

