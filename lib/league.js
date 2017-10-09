var request = require('request');

function League(options,callback) {	
	this.league = null;
	var self = this;
	request(options, function (error, response, body) {
		var allLeagues = JSON.parse(body);
		for (var i = allLeagues.length - 1; i >= 0; i--) {
			var item = allLeagues[i];
			if(item.league == options.shortNameLeague){
				self.league = item;
				options.url = item._links.teams.href;
			}
		}
		// console.log("init League");
		callback();
	});
}

module.exports = League;
