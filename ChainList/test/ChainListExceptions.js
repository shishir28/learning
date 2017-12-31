 var ChainList = artifacts.require("./ChainList.sol");

  // check for eception 

contract('ChainList',function(accounts) {
    var chainListInstance ; 
    var seller = accounts[1];
    var buyer = accounts[0];
    var articleName = "article 1";
    var articleDescription = "Description for article 1"; 
    var articlePrice = 10; 

    it("Should throw exception if you try to buy an article when there is no article for sale", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.buyArticle({
                    from: buyer,
                    value: web3.toWei(articlePrice, "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.getArticle.call();
            })
        then(function(data) {
            assert.equal(data[0], 0x0, "seller must be empty");
            assert.equal(data[1], 0x0, "buyer must be empty");
            assert.equal(data[2], '', "article name must be empty");
            assert.equal(data[3], '', "description must be empty");
            assert.equal(data[4].toNumber(), 0, "article price  must be zero");
        });
    })

    it("should throw error if you try to buy your own article", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), {
                    from: seller
                });
            }).then(function(receipt) {
                return chainListInstance.buyArticle({
                    from: seller,
                    value: web3.toWei(articlePrice, "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.getArticle.call();
            }).then(function(data) {
                assert.equal(data[0], seller, "seller must be " + seller);
                assert.equal(data[1], 0x0, "buyer must be empty");
                assert.equal(data[2], articleName, "article name must be " + articleName);
                assert.equal(data[3], articleDescription, "description must be "+ articleDescription);
                assert.equal(data[4].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            });
    });

    it("should throw error if you try to buy an article for a value different from its price", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.buyArticle({
                    from: buyer,
                    value: web3.toWei(articlePrice + 1, "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.getArticle.call();
            }).then(function(data) {
                assert.equal(data[0], seller, "seller must be " + seller);
                assert.equal(data[1], 0x0, "buyer must be empty");
                assert.equal(data[2], articleName, "article name must be " + articleName);
                assert.equal(data[3], articleDescription, "description must be "+ articleDescription);
                assert.equal(data[4].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            });
    });
    
    it("should throw error if you try to buy an article which is already sold", function() {
        return ChainList.deployed().then(function(instance) {
                chainListInstance = instance;
                return chainListInstance.buyArticle({
                    from: buyer,
                    value: web3.toWei(articlePrice , "ether")
                });
            }).then(function() {
                return chainListInstance.buyArticle({
                    from: web3.eth.accounts[0],
                    value: web3.toWei(articlePrice , "ether")
                });
            }).then(assert.fail)
            .catch(function(error) {
                assert(error.message.indexOf('invalid opcode') >= 0, "error should be invalid opcode");
            }).then(function() {
                return chainListInstance.getArticle.call();
            }).then(function(data) {
                assert.equal(data[0], seller, "seller must be " + seller);
                assert.equal(data[1], buyer, "buyer must be empty");
                assert.equal(data[2], articleName, "article name must be " + articleName);
                assert.equal(data[3], articleDescription, "description must be "+ articleDescription);
                assert.equal(data[4].toNumber(), web3.toWei(articlePrice,"ether"), "article price  must be " + web3.toWei(articlePrice,"ether")) ;
            });
    });
});
