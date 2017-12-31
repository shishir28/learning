pragma solidity ^0.4.11;

contract ChainList {
   
    address seller;
    address buyer;
    string name; 
    string description;
    uint256 price; 
    
    event sellArticleEvent (
        address indexed _seller, 
        string _name ,
        uint256 _price
        ) ;
        
        
    event buyArticleEvent (
        address indexed _seller, 
        address indexed _buyer, 
        string _name ,
        uint256 _price) ;
    
    function sellArticle(string _name, string _description, uint256  _price) public {
        seller = msg.sender;
        name = _name; 
        description = _description; 
        price = _price;
        sellArticleEvent(seller,name,price);
    }


// throw , assert , require and revert consequnces are 
// refund message sender 
// state chnages reverted 
// execution interrupted 
// gas spent 
// throw = legacy , assert = internal errors , require for pre conditions , revert = other business errors 
// function must be marked as payable to receive any value
    function buyArticle() payable public {
        require(seller != 0x0);
        require(buyer == 0x0);
        require(msg.sender != seller);
        require(msg.value == price);
        buyer = msg.sender;
        seller.transfer(msg.value);
        buyArticleEvent(seller,buyer,name,price);
    }

    function getArticle() public constant returns (
        address _seller, 
        address _buyer,
        string _name, 
        string _description,
        uint256 _price) {
        return (seller,buyer, name, description,price);
    }
}
