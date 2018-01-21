pragma solidity ^0.4.18;

import "./library/Utils.sol";
import "./library/Dataset.sol";

contract TokenManagement {

    uint8 symbolNameIndex ; 
    mapping (uint8 => Dataset.Token) tokens;

    function addToken(string _symbolName, address _tokenAddress)  returns (bool){
        require(!hasToken(_symbolName));
        require(symbolNameIndex+1 > symbolNameIndex);
        symbolNameIndex++;
        tokens[symbolNameIndex].symbolName = _symbolName;
        tokens[symbolNameIndex].tokenContract = _tokenAddress;
        return true;
    }

    function getSymbolIndex(string _symbolName) constant returns (uint8) {
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
}