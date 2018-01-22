pragma solidity ^0.4.18;

import "./library/Utils.sol";
import "./library/Dataset.sol";

contract TokenManagement {
    uint8 symbolNameIndex ; 
    mapping (uint8 => Dataset.Token) tokens;
    event TokenAddedToExchange(uint _symbolIndex,string _symbolName, uint _timestamp);

    function TokenManagement() {
    }

    function addToken(string _symbolName, address _tokenAddress)  returns (bool){
        require(!hasToken(_symbolName));
        require(symbolNameIndex+1 > symbolNameIndex);
        symbolNameIndex++;
        tokens[symbolNameIndex].symbolName = _symbolName;
        tokens[symbolNameIndex].tokenContract = _tokenAddress;
        TokenAddedToExchange(symbolNameIndex,_symbolName,now);
        return true;
    }

    function getSymbolIndex(string _symbolName) public returns (uint8) {
        for (var index = 0; index < symbolNameIndex; index++) {
            if (Utils.stringsEqual(_symbolName, tokens[index].symbolName)) {
                return index;
            }
        }
        return 0;
    }

     function getTokenAddress(string _symbolName) public returns (address) {
        uint8 indexValue = getSymbolIndex(_symbolName);
        return tokens[indexValue].tokenContract;
    }

    function hasToken(string symbolName) constant returns (bool) {
        uint8 index = getSymbolIndex(symbolName);
        return (index != 0);
    }
}
