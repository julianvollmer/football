var request = require('request');

function Fixtures(options, callback) {
  this.fixtures = null;
  this.options = options;
  var self = this;
  request(options, function (error, response, body) {
    self.fixtures = JSON.parse(body);
    console.log("init Fixtures");
    callback();
  });   
}

Fixtures.prototype.getAllNextGames = function () {
	var fixtures = [];
	for (var i = this.fixtures.fixtures.length - 1; i >= 0; i--) {
		var item = this.fixtures.fixtures[i];
		if(item.status != 'FINISHED'){
			fixtures.push(item)
		}
	}
	return fixtures;
};

Fixtures.prototype.getNextGames = function () {
	var arr = this.getAllNextGames()
	return arr.slice(Math.max(arr.length - this.options.nextGamesView, 1));
};

Fixtures.prototype.getAllLastGames = function () {
	var fixtures = [];
	for (var i = this.fixtures.fixtures.length - 1; i >= 0; i--) {
		var item = this.fixtures.fixtures[i];
		if(item.status == 'FINISHED'){
			fixtures.push(item)
		}
	}
	return fixtures;
};

Fixtures.prototype.getLastGames = function () {
	var arr = this.getAllLastGames();
	return arr.slice(0, this.options.lastGamesView);
};

module.exports = Fixtures;