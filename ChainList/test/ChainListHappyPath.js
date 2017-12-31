 var ChainList = artifacts.require("./ChainList.sol");

contract('ChainList',function(accounts) {
    var chainListInstance ; 
    var seller = accounts[1];
    var buyer = accounts[0];
    var articleName = "article 1";
    var articleDescription = "Description for article 1"; 
    var articlePrice = 10; 
    var watcher;
    var  sellerBlanceBeforeBuy, sellerBlanceAfterBuy ;
    var  buyerBlanceBeforeBuy, buyerBlanceAfterBuy ;
    

    it("should be initialized with empty values", function() {
         return ChainList.deployed().then(function(instance) {
             return instance.getArticle.call();
         }).then(function(data) {
            assert.equal(data[0], 0x0, "seller must be empty");
            assert.equal(data[1], 0x0, "buyer must be empty");
            assert.equal(data[2], '', "article name must be empty");
            assert.equal(data[3], '', "description must be empty");
            assert.equal(data[4].toNumber(), 0, "article price  must be zero");
         });
     });

     it("should sell an article", function() {
        return ChainList.deployed().then(function(instance) {
            chainListInstance = instance;
            return chainListInstance.sellArticle(articleName, articleDescription,web3.toWei(articlePrice,"ether"), {from:
                seller});
        }).then(function(data) {
            return chainListInstance.getArticle.call();               
        }).then(function(data) {
            assert.equal(data[0], seller, "seller must be " + seller);
            assert.equal(data[1], 0x0, "buyer must be  empty" );
            assert.equal(data[2], articleName, "article name must be " + articleName);
            assert.equal(data[3], articleDescription, "description must be " + articleDescription);
            assert.equal(data[4].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
        });
     });

     it("it should trigger an event when a new article is sold", function() {
        return ChainList.deployed().then(function(instance) {
            chainListInstance = instance;
            watcher = chainListInstance.sellArticleEvent();
            return chainListInstance.sellArticle(articleName, articleDescription,web3.toWei(articlePrice,"ether"), {from:
                seller});
    }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Should receive one event");
            assert.equal(receipt.logs[0].args._seller, seller, "seller must be " + seller);
            assert.equal(receipt.logs[0].args._name, articleName, "article name must be " + articleName);
            assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
        });
     });

     it("should buy an article", function() {
        return ChainList.deployed().then(function(instance) {
            chainListInstance = instance;
            sellerBlanceBeforeBuy = web3.fromWei(web3.eth.getBalance(seller),"ether").toNumber();
            buyerBlanceBeforeBuy = web3.fromWei(web3.eth.getBalance(buyer),"ether").toNumber();
            return chainListInstance.buyArticle({from:buyer,value:web3.toWei(articlePrice,"ether")});
    }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "one events hould have been triggered");
            assert.equal(receipt.logs[0].event, "buyArticleEvent", "Should be be buyAtricleEvet");
            assert.equal(receipt.logs[0].args._seller, seller, "event seller must be " + seller);
            assert.equal(receipt.logs[0].args._buyer, buyer, "event buyer must be " + buyer);
            assert.equal(receipt.logs[0].args._name, articleName, "article name must be " + articleName);
            assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            sellerBlanceAfterBuy = web3.fromWei(web3.eth.getBalance(seller),"ether").toNumber();
            buyerBlanceAfterBuy = web3.fromWei(web3.eth.getBalance(buyer),"ether").toNumber();
            assert(sellerBlanceAfterBuy = sellerBlanceBeforeBuy + articlePrice , "Seller should have earned" + articlePrice + " ETH");
            assert(buyerBlanceAfterBuy <= buyerBlanceBeforeBuy - articlePrice , "buyer should have spent" + articlePrice + " ETH");
           
            return chainListInstance.getArticle.call()
        }).then(function(data) { 
            assert.equal(data[0], seller, "seller must be " + seller);
            assert.equal(data[1], buyer, "buyer must be buyer" + buyer );
            assert.equal(data[2], articleName, "article name must be " + articleName);
            assert.equal(data[3], articleDescription, "description must be " + articleDescription);
            assert.equal(data[4].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
        });
     });

   


});
