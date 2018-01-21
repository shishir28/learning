pragma solidity ^0.4.18;

library Utils {

    function stringsEqual(string memory _a, string memory _b ) returns (bool) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        
        if (a.length != b.length) {
            return false;
        }

        for (var i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }

    event LogUint(string, uint);
    function log(string s , uint x) {
        LogUint(s, x);
    }
    
    event LogInt(string, int);
    function log(string s , int x) {
        LogInt(s, x);
    }
    
    event LogBytes(string, bytes);
    function log(string s , bytes x) {
        LogBytes(s, x);
    }
    
    event LogBytes32(string, bytes32);
    function log(string s , bytes32 x) {
        LogBytes32(s, x);
    }

    event LogAddress(string, address);
    function log(string s , address x) {
        LogAddress(s, x);
    }

    event LogBool(string, bool);
    function log(string s , bool x) {
        LogBool(s, x);
    }

}
