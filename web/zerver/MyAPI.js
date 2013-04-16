exports.ping = function (str, callback) {
	console.log(str);
	callback('ping from server');
};

function init () {
  var fp       = require('../../node_modules/feedparser'),
      Promise  = require('../../node_modules/rsvp').Promise,
      promise  = new Promise(),
      articles = [];

  function add (article) {
    // make an article object, add it to an array
    var obj     = {};
    obj.title   = article['title'];
    obj.content = article['description'];
    obj.link    = article['link'];
    articles.push(obj);
    if( articles.length === 10 ){
      promise.resolve(this.articles);
    }
  }

  fp.parseUrl('http://perezhilton.com/perezitos/?feed=atom').on('article', add);

  return promise;
}


exports.getArticles = function(callback) {
  init().then(function(articles) {
    callback(articles);
  });
};
