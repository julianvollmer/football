var request = require('request');

function LeagueTable(options,callback) {	
	this.leagueTable = null;
	var self = this;
	// console.log(self)
	request(options, function (error, response, body) {
		self.leagueTable = JSON.parse(body);
		// console.log(self.leagueTable.standing);
		// console.log("init LeagueTable");
		callback();
	});
}


LeagueTable.prototype.getTableOnlyNames = function () {
	var arr = [];	
	for (var i = this.leagueTable.standing.length - 1; i >= 0; i--) {
		var item = this.leagueTable.standing[i];
		arr.push(item.teamName);
	}
	return arr;
};

LeagueTable.prototype.getTable = function () {
	var arr = [];
	for (var i = this.leagueTable.standing.length - 1; i >= 0; i--) {
		var item = this.leagueTable.standing[i];
		console.log(item)
		var obj = {};
		obj.position = item.position;
		obj.teamName = item.teamName;
		obj.points = item.points;
		obj.imgUrl = item.crestURI;
		arr.push(obj);
	}
	return arr;
};

module.exports = LeagueTable;
