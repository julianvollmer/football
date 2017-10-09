var League = require('./lib/league.js');
var Team = require('./lib/team.js');
var Fixtures = require('./lib/fixtures.js');
var Players = require('./lib/players.js');
var LeagueTable = require('./lib/leagueTable.js');
var Helper = require('./lib/helper.js');

function Football(options, callback, isMyTeam) {

	this.options = options;
	this.league = null;
	this.leagueTable = null;
	this.team = null;
	this.fixtures = null;
	this.players = null;
	this.helper = new Helper();
	this.baseUrl = options.url;
	this.opponent = null;

	var self = this;
	
	this.initLeague = function () {
		options.url = self.baseUrl;
		self.league = new League(options, self.initTeam);
	}

	this.initTeam = function () {
		self.team = new Team(options, self.initFixtures);
	}

	this.initFixtures = function () {
		self.fixtures = new Fixtures(options, self.initPlayers);
	}

	this.initPlayers = function () {
		options.url = self.team.team._links.players.href;
		self.players = new Players(options, self.initLeagueTable);
	}

	this.initLeagueTable = function () {
		options.url = self.league.league._links.leagueTable.href
		if(isMyTeam){
			self.leagueTable = new LeagueTable(options, self.initOpponent);
		}
		else{
			self.leagueTable = new LeagueTable(options, self.isInitialized);	
		}
		options.url = self.baseUrl;
	}

	this.initOpponent = function () {
		options.url = self.baseUrl
		
		if(self.options.shortNameTeam == self.team.getShortNameFromLongName(self.fixtures.getNextGame().homeTeamName)){
			self.options.shortNameTeam = self.team.getShortNameFromLongName(self.fixtures.getNextGame().awayTeamName);
		}
		else{
			self.options.shortNameTeam = self.team.getShortNameFromLongName(self.fixtures.getNextGame().homeTeamName);	
		}
		
		self.opponent = new Football(options, callback);
	}

	this.isInitialized = function () {
		if(callback){
			if(callback.callbackFromFootballApi){
				callback.callbackFromFootballApi();
			}
			else{
				callback();
			}
			
		}
	}
	this.initLeague();
}

module.exports = Football;