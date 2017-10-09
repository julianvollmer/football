var request = require('request');

function Team(options, callback) {
  this.team = null;
  this.logo = null;
  this.allTeams = null;
  var self = this;
  
  request(options, function (error, response, body) {
    body = JSON.parse(body);
    self.allTeams = body.teams;
    for (var i = self.allTeams.length - 1; i >= 0; i--) {
      var item = self.allTeams[i];
      if(item.code == options.shortNameTeam){
        self.team = item;
        self.logo = item.crestUrl;
        options.url = item._links.fixtures.href;
      }
    }
    // console.log("init Team");
    callback();
  });
}

Team.prototype.getShortNameFromLongName = function (name) {
  var shortName = [];
  for (var i = this.allTeams.length - 1; i >= 0; i--) {
    var item = this.allTeams[i];
    if(item.name == name){
      shortName = item.code;
    }
  }
  return shortName;
}

Team.prototype.getShortNamesFromFixtures = function (fixtures) {
  var shortFixtures = [];
  for (var i = fixtures.length - 1; i >= 0; i--) {
    var item = fixtures[i];
    shortFixtures.push(this.getShortNameFromLongName(item.homeTeamName) + ":" + this.getShortNameFromLongName(item.awayTeamName));
  }
  return shortFixtures;
};


Team.prototype.getShortNamesFromFixturesFinishedWithResult = function (fixtures) {
  var shortFixturesWithResults = [];
  for (var i = fixtures.length - 1; i >= 0; i--) {
    var item = fixtures[i];
    shortFixturesWithResults.push(this.getShortNameFromLongName(item.homeTeamName) + " " + item.result.goalsHomeTeam + " - " + item.result.goalsAwayTeam + " " + this.getShortNameFromLongName(item.awayTeamName));
  }
  return shortFixturesWithResults;
};

Team.prototype.getUrlToLogo = function () {
  return this.logo;
};


module.exports = Team;
