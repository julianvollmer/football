var Football = require('./lib/football.js');
var token = 'YOUR_TOKEN'
var options = { 
	url: 'http://api.football-data.org/v1/soccerseasons/', 
	headers: {'X-Auth-Token': token},
	shortNameLeague: "BL1",
	shortNameTeam: "HSV",
	nextGamesView: 4,
	lastGamesView: 4,
};

var fball = new Football(options, init);

function init() {
	console.log(fball.players.getNames())
}
