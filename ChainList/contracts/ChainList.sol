pragma solidity ^0.4.11;

contract ChainList {
   
struct Article {
        uint id;
        address seller;
        address buyer;
        string name;
        string description;
        uint256 price;
    }
    
    mapping(uint => Article) public articles; 
    uint articleCounter;
    
    event sellArticleEvent (
        uint indexed _id, 
        address  _seller, 
        string _name ,
        string _description,
        uint256 _price
        ) ;

    event buyArticleEvent (
       uint indexed _id, 
        address indexed _seller, 
        address indexed _buyer, 
        string _name ,
        uint256 _price) ;
    
    function sellArticle(string _name, string _description, uint256  _price) public {
        articleCounter++;

        articles[articleCounter] = Article(
           articleCounter,  
           msg.sender,
           0x0,
           _name,
           _description, 
           _price
        );
        sellArticleEvent(articleCounter, msg.sender,_name,_description, _price);
    }

// throw , assert , require and revert consequnces are 
// refund message sender 
// state chnages reverted 
// execution interrupted 
// gas spent 
// throw = legacy , assert = internal errors , require for pre conditions , revert = other business errors 
// function must be marked as payable to receive any value
    function buyArticle(uint _id) payable public {
        require(articleCounter > 0);
        require(_id > 0 && _id <= articleCounter);
        Article storage article = articles[_id];
        require(article.buyer == 0x0);
        require(msg.sender != article.seller);
        require(msg.value == article.price);
        article.buyer = msg.sender;
        article.seller.transfer(msg.value);
        buyArticleEvent(_id,article.seller,article.buyer,article.name,article.price);
    }

   function getNumberOfArticles() public constant returns (uint) {
       return articleCounter;
   }

   function getArticlesForSale() public constant returns (uint[]) {
       require(articleCounter > 0);
       uint[] memory articleIds = new uint[](articleCounter);
       uint numberOfArticlesForSale = 0;

       for (uint index = 1; index <= articleCounter; index++) {

           if (articles[index].buyer == 0x0) {
               articleIds[numberOfArticlesForSale] = articles[index].id;
               numberOfArticlesForSale++;
           }
       }
       uint[] memory forSales = new uint[](numberOfArticlesForSale);
       for (uint i = 0; i < numberOfArticlesForSale; i++) {
           forSales[i] = articleIds[i];
       }

       return (forSales);
   }
}

