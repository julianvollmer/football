var request = require('request');

function Players(options, callback) {
  this.players = null;
  var self = this;
  request(options, function (error, response, body) {
    self.players = JSON.parse(body);
    console.log("init Players");
    callback();
  }); 
}

Players.prototype.getNames = function () {
  var players = [];
  for (var i = this.players.players.length - 1; i >= 0; i--) {
    var item = this.players.players[i];
    players.push(item.name);
  }

  return players;
};

Players.prototype.getPlayers = function () {
  return this.players.players;
};

module.exports = Players;