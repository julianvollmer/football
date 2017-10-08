#How to use
first version

```js
var Football = require('football-data-api');
var token = '510c84ef31ca4bb6b7b989b3b1e7d381'
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

    console.log(JSON.stringify(fball.fixtures.getNextGames(), null, 4));
}
```