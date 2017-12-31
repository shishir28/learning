
var ChainList = artifacts.require("./ChainList.sol");

contract('ChainList',function(accounts) {
    var chainListInstance ; 
    var seller = accounts[1];
    var buyer = accounts[0];
    var articleName1 = "article 1";
    var articleDescription1 = "Description for article 1"; 
    var articlePrice1 = 10; 

    var articleName2 = "article 2";
    var articleDescription2 = "Description for article 2"; 
    var articlePrice2 = 20; 

    var watcher;
    var  sellerBalanceBeforeBuy, sellerBalanceAfterBuy ;
    var  buyerBalanceBeforeBuy, buyerBalanceAfterBuy ;
    
    it("should be initialized with empty values", function() {
         return ChainList.deployed().then(function(instance) {
            chainListInstance = instance;
             return chainListInstance.getNumberOfArticles();
         }).then(function(data) {
            assert.equal(data, 0x0, "number of articles is 0");
            return chainListInstance.getArticlesForSale();
         }).then(function(data) {
            assert.equal(data.length, 0, "article for sale shouldbe empty");
         });
     });

     it("Sell first article", function() {
        return ChainList.deployed().then(function(instance) {
            chainListInstance = instance;
            return chainListInstance.sellArticle(articleName1, 
                articleDescription1,
                web3.toWei(articlePrice1,"ether"), 
                {from: seller});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length , 1, "Should have received one event ");
            assert.equal(receipt.logs[0].event , "sellArticleEvent", "Event name is SellArticleEvent ");
            assert.equal(receipt.logs[0].args._id.toNumber() , 1, "Id is 1");
            assert.equal(receipt.logs[0].args._seller, seller, "seller must be " + seller);
            assert.equal(receipt.logs[0].args._name ,articleName1, "article name must be " + articleName1);
            assert.equal(receipt.logs[0].args._description, articleDescription1, "description must be " + articleDescription1);
            assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice1,"ether"), "article price  must be " + web3.toWei(articlePrice1,"ether")) ;
            return chainListInstance.getNumberOfArticles()
        }).then(function(data) {;
            assert.equal(data, 1, "number of articles is 1");
            return chainListInstance.getArticlesForSale()
        }).then(function(data) {
            assert.equal(data.length, 1, "There is only one item for sale ");
            articleId = data[0].toNumber();
            assert.equal(articleId, 1, "Article Id must be 1 ");
            return chainListInstance.articles(articleId);
        }).then(function(data) {
            assert.equal(data[0].toNumber() , 1, "Id is 1");
            assert.equal(data[1], seller, "seller must be " + seller);
            assert.equal(data[2], 0x0, "buyer must be empty ");
            assert.equal(data[3] ,articleName1, "article name must be " + articleName1);
            assert.equal(data[4], articleDescription1, "description must be " + articleDescription1);
            assert.equal(data[5].toNumber(), web3.toWei(articlePrice1,"ether"), "article price  must be " + web3.toWei(articlePrice1,"ether")) ;

        });
    });

    it("Sell second article", function() {
        return ChainList.deployed().then(function(instance) {
            chainListInstance = instance;
            return chainListInstance.sellArticle(articleName2, 
                articleDescription2,
                web3.toWei(articlePrice2,"ether"), 
                {from: seller});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length , 1, "Should have received one event ");
            assert.equal(receipt.logs[0].event , "sellArticleEvent", "Event name is SellArticleEvent ");
            assert.equal(receipt.logs[0].args._id.toNumber() , 2, "Id is 2");
            assert.equal(receipt.logs[0].args._seller, seller, "seller must be " + seller);
            assert.equal(receipt.logs[0].args._name ,articleName2, "article name must be " + articleName2);
            assert.equal(receipt.logs[0].args._description, articleDescription2, "description must be " + articleDescription2);
            assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice2,"ether"), "article price  must be " + web3.toWei(articlePrice2,"ether")) ;
            return chainListInstance.getNumberOfArticles()
        }).then(function(data) {;
            assert.equal(data, 2, "number of articles are two");
            return chainListInstance.getArticlesForSale()
        }).then(function(data) {
            assert.equal(data.length, 2, "There are two items for sale ");
            articleId = data[1].toNumber();
            assert.equal(articleId, 2, "Article Id must be 2");
            return chainListInstance.articles(articleId);
        }).then(function(data) {
            assert.equal(data[0].toNumber() , 2, "Id is 2");
            assert.equal(data[1], seller, "seller must be " + seller);
            assert.equal(data[2], 0x0, "buyer must be empty ");
            assert.equal(data[3] ,articleName2, "article name must be " + articleName2);
            assert.equal(data[4], articleDescription2, "description must be " + articleDescription1);
            assert.equal(data[5].toNumber(), web3.toWei(articlePrice2,"ether"), "article price  must be " + web3.toWei(articlePrice2,"ether")) ;

        });
    });
   

     it("Buy first article", function() {
        return ChainList.deployed().then(function(instance) {
            chainListInstance = instance;
            articleId = 1;
            sellerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(seller),"ether").toNumber();
            buyerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(buyer),"ether").toNumber();
            return chainListInstance.buyArticle(articleId,{from:buyer,value:web3.toWei(articlePrice1,"ether")});
    }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "one events hould have been triggered");
            assert.equal(receipt.logs[0].event, "buyArticleEvent", "Should be be buyAtricleEvet");
            assert.equal(receipt.logs[0].args._id.toNumber(), articleId, "article id must be "+articleId);
            
            assert.equal(receipt.logs[0].args._seller, seller, "event seller must be " + seller);
            assert.equal(receipt.logs[0].args._buyer, buyer, "event buyer must be " + buyer);
            assert.equal(receipt.logs[0].args._name, articleName1, "article name must be " + articleName1);
            assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice1,"ether"), "article price  must be " + web3.toWei(articlePrice1,"ether")) ;
            sellerBalanceAfterBuy = web3.fromWei(web3.eth.getBalance(seller),"ether").toNumber();
            buyerBalanceAfterBuy = web3.fromWei(web3.eth.getBalance(buyer),"ether").toNumber();
            
            assert(sellerBalanceAfterBuy = sellerBalanceBeforeBuy + articlePrice1, "Seller should have earned" + articlePrice1 + " ETH");
            assert(buyerBalanceAfterBuy <= buyerBalanceBeforeBuy - articlePrice1 , "buyer should have spent" + articlePrice1 + " ETH");
           
            return chainListInstance.articles(articleId);
        }).then(function(data) { 
            assert.equal(data[0].toNumber(), 1, "article id must be 1" );
            assert.equal(data[1], seller, "seller must be " + seller);
            assert.equal(data[2], buyer, "buyer must be buyer" + buyer );
            assert.equal(data[3], articleName1, "article name must be " + articleName1);
            assert.equal(data[4], articleDescription1, "description must be " + articleDescription1);
            assert.equal(data[5].toNumber(), web3.toWei(articlePrice1,"ether"), "article price  must be " + web3.toWei(articlePrice1,"ether")) ;
            return chainListInstance.getArticlesForSale();
        }).then(function(data) {
            assert.equal(data.length, 1, "there should be only one item available for sale now");
            
        });
     });

});
