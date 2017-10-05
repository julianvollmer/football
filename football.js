var League = require('./lib/league.js');
var Team = require('./lib/Team.js');
var Fixtures = require('./lib/fixtures.js');
var Players = require('./lib/players.js');
var LeagueTable = require('./lib/leagueTable.js');
var Helper = require('./lib/helper.js');

function Football(options, callback) {

	this.options = options;
	this.league = null;
	this.leagueTable = null;
	this.team = null;
	this.fixtures = null;
	this.players = null;
	this.helper = new Helper();

	var self = this;
	
	this.initLeague = function () {
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
		self.leagueTable = new LeagueTable(options, self.isInitialized);
	}

	this.isInitialized = function () {
		callback();
	}

	this.initLeague();
}

module.exports = Football;