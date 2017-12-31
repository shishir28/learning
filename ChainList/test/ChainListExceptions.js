 var ChainList = artifacts.require("./ChainList.sol");

  // check for eception 

contract('ChainList',function(accounts) {
    var chainListInstance ; 
    var seller = accounts[1];
    var buyer = accounts[0];
    var articleId = 1;
    var articleName = "article 1";
    var articleDescription = "Description for article 1"; 
    var articlePrice = 10; 

    it("Should throw exception if you try to buy an article when there is no article for sale", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.buyArticle( articleId,{
                    from: buyer,
                    value: web3.toWei(articlePrice, "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.getNumberOfArticles();
            })
        then(function(data) {
            assert.equal(data.toNumber(), 0 ,"Number of article must be zero");
          
        });
    })

    it("should throw errorif you try to buy an article that does not exist", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), {
                    from: seller
                });
            }).then(function(receipt) {
                return chainListInstance.buyArticle(2,{
                    from: seller,
                    value: web3.toWei(articlePrice, "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.articles(articleId);
            }).then(function(data) {
                assert.equal(data[0].toNumber(), articleId, "artcileId must be " + articleId);
                assert.equal(data[1], seller, "seller must be " + seller);
                assert.equal(data[2], 0x0, "buyer must be empty");
                assert.equal(data[3], articleName, "article name must be " + articleName);
                assert.equal(data[4], articleDescription, "description must be "+ articleDescription);
                assert.equal(data[5].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            });
    });

    it("should throw error if you try to buy your own article", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.buyArticle( articleId,{
                    from: seller,
                    value: web3.toWei(articlePrice, "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.articles(articleId);
            }).then(function(data) {
                assert.equal(data[0].toNumber(), articleId, "articleId must be " + articleId);
                assert.equal(data[1], seller, "seller must be " + seller);
                assert.equal(data[2], 0x0, "buyer must be empty");
                assert.equal(data[3], articleName, "article name must be " + articleName);
                assert.equal(data[4], articleDescription, "description must be "+ articleDescription);
                assert.equal(data[5].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            });
    });

    it("should throw error if you try to buy an article for a value different from its price", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.buyArticle(articleId,{
                    from: buyer,
                    value: web3.toWei(articlePrice + 1, "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.articles(articleId);
            }).then(function(data) {
                assert.equal(data[0].toNumber(), articleId, "articleId must be " + articleId);
                assert.equal(data[1], seller, "seller must be " + seller);
                assert.equal(data[2], 0x0, "buyer must be empty");
                assert.equal(data[3], articleName, "article name must be " + articleName);
                assert.equal(data[4], articleDescription, "description must be "+ articleDescription);
                assert.equal(data[5].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            });
    });
    
    it("should throw error if you try to buy an article which is already sold", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.buyArticle(articleId,{
                    from: buyer,
                    value: web3.toWei(articlePrice , "ether")
                });
            }).then(function() {
                return chainListInstance.buyArticle(articleId,{
                    from: web3.eth.accounts[0],
                    value: web3.toWei(articlePrice , "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.articles(articleId);
            }).then(function(data) {
                assert.equal(data[0].toNumber(), articleId, "articleId must be " + articleId);
                assert.equal(data[1], seller, "seller must be " + seller);
                assert.equal(data[2], buyer ,"buyer must be "+ buyer);
                assert.equal(data[3], articleName, "article name must be " + articleName);
                assert.equal(data[4], articleDescription, "description must be "+ articleDescription);
                assert.equal(data[5].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            });
    });
});
