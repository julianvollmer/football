# How to use
first version

```js
var Football = require('football-data-api');
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

    console.log(JSON.stringify(fball.fixtures.getNextGames(), null, 4));
}
```

| Option                    | Description
|-------------------------- |-----------
| `X-Auth-Token`            | *Required* You can get it from [here](http://football-data.org/index).
| `shortNameLeague`         | *Required* Short name of your League
| `shortNameTeam`           | *Required* Short name of your team. Team must be in the League.

Names for the different leagues:

|Short Name | Long Name
|-----|----
| AAL | Australian A-League
| CL  | Champions League 2017/18
| SB  | Serie B 2017/18
| DFB | DFB-Pokal 2017/18
| PPL | Primeira Liga 2017/18
| SA  | Serie A 2017/18
| PD  | Primera Division 2017
| BL2 | 2. Bundesliga 2017/18
| BL1 | 1. Bundesliga 2017/18
| FL2 | Ligue 2 2017/18
| FL1 | Ligue 1 2017/18
| DED | Eredivisie 2017/18
| EL2 | League Two 2017/18
| EL1 | League One 2017/18
| ELC | Championship 2017/18
| PL  | Premier League 2017/18
| BSA | Campeonato Brasileiro da Série A


