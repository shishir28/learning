App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {
      return App.initWeb3();
  },

  initWeb3: function() {
      if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
      } else {
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
          web3 = new Web3(App.web3Provider);
      }
      App.displayAccountInfo();
      return App.initContract();
  },

  displayAccountInfo: function() {
      web3.eth.getCoinbase(function(err, account) {
          if (err === null) {
              App.account = account;
              $("#account").text(account);
              web3.eth.getBalance(account, function(err, balance) {
                  if (err === null) {
                      $("#accountBalance").text(web3.fromWei(balance, "ether") + "ETH");
                  }
              });
          }
      });
  },

  initContract: function() {
      $.getJSON('ChainList.json', function(chainListArtifact) {
          App.contracts.ChainList = TruffleContract(chainListArtifact);
          App.contracts.ChainList.setProvider(App.web3Provider);
          App.ListenToEvents();
          return App.reloadArticles();
      });
  },

  reloadArticles: function() {
      App.displayAccountInfo();
      App.contracts.ChainList.deployed().then(function(instance) {
          return instance.getArticle.call();
      }).then(function(article) {

          if (article[0] == 0x0) {
              return;
          }

          var articlesRow = $('#articlesRow');
          articlesRow.empty();

          var price = web3.fromWei(article[4], "ether");

          var articleTemplate = $('#articleTemplate');
          articleTemplate.find('.panel-title').text(article[2]);
          articleTemplate.find('.article-description').text(article[3]);
          articleTemplate.find('.article-price').text(web3.fromWei(article[4], "ether"));
          articleTemplate.find('.btn-buy').attr('data-value', price);

          //selller
          var seller = article[0];
          if (seller == App.account) {
              seller = "You";
          }
          articleTemplate.find('.article-seller').text(seller);

          //buyer
          var buyer = article[1];
          if (buyer == App.account) {
              buyer = "You";
          } else if (buyer == 0x0) {
              buyer = "No one";
          }
          articleTemplate.find('.article-buyer').text(buyer);

          if (article[0] == App.account || article[1] != 0x0) {
              articleTemplate.find('.btn-buy').hide();
          }

          articlesRow.append(articleTemplate.html());
      }).catch(function(err) {
          console.log(err.message);
      })
  },

  sellArticle: function() {
      var _article_name = $("#article_name").val();
      var _description = $("#article_description").val();
      var _price = web3.toWei(parseInt($("#article_price").val() || 0), "ether");

      if ((_article_name.trim() == '') || (_price == 0)) {
          return false;
      }

      App.contracts.ChainList.deployed().then(function(instance) {
          return instance.sellArticle(_article_name, _description, _price, {
              from: App.account
          });
      }).then(function(result) {}).catch(function(err) {
          console.error(err);
      })
  },

  ListenToEvents: function() {
      App.contracts.ChainList.deployed().then(function(instance) {
          instance.sellArticleEvent({}, {
              fromBlock: 0,
              toBlock: 'latest'
          }).watch(function(error, event) {
              $("#events").append('<li class="list-group-item"> '+ event.args._name + ' is for sale' +'</li>');
              App.reloadArticles();
          });

          instance.buyArticleEvent({}, {
            fromBlock: 0,
            toBlock: 'latest'
        }).watch(function(error, event) {
            $("#events").append('<li class="list-group-item"> '+ event.args._buyer + 'bought ' + event.args._name +'</li>');
            App.reloadArticles();
        });
      });
  },

  buyArticle: function() {
    event.preventDefault();

    var _price = parseInt($(event.target).data('value'));

    App.contracts.ChainList.deployed().then(function(instance) {
      return instance.buyArticle({
          from: ApplicationCache.account,
          value: web3.toWei(_price , "ether")
      });
    }).then(function(result)  {

    }).catch(function(err) {
      console.error(err);
    });
},

};

$(function() {
  $(window).load(function() {
      App.init();
  });
});