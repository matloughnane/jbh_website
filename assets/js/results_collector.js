// FIREBASE REFERENCES
var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/arranmore_challenge/");


var resultsObj = {};

firebaseRef.on("value", function(snapshot) {
    resultsObj = snapshot.val();
    // GROUPS TABLE
    displayGroups(resultsObj);
    // GROUPS GAMES
    displayGroupGames(resultsObj);
    displayQuarterGames(resultsObj);
    displaySemiGames(resultsObj);
    displayFinalGame(resultsObj);
});

function displayGroups(object){
	var groupObj = object.games.groups;
	// console.log(groupObj);
	var groupNames = [];
	var team1Array = [];
	var team2Array = [];
	var team3Array = [];
	var team4Array = [];
	// GROUP ARRAY
	for (key in groupObj){
		groupNames.push(key);
	}
	// TEAM 1 ARRAY
	for (key in groupObj){
		team1Array.push(groupObj[key].Team1);
	}
	// 	console.log(team1Array);
	// TEAM 2 ARRAY
	for (key in groupObj){
		team2Array.push(groupObj[key].Team2);
	}
	// console.log(team2Array);
	// TEAM 3 ARRAY
	for (key in groupObj){
		team3Array.push(groupObj[key].Team3);
	}
	// console.log(team3Array);
	// TEAM 4 ARRAY
	for (key in groupObj){
		team4Array.push(groupObj[key].Team4);
	}
	// console.log(team4Array);
	var teamArrays = [team1Array,team2Array,team3Array,team4Array];
	// console.log(teamArrays);
	createGroupTable(groupNames, teamArrays);
};
function createGroupTable(groupName, teamArrays){
	var result = "<table  class='group'> <thead>";
	for (var i = 0; i < groupName.length; i++) {
		result += "<th>" + groupName[i] + "</th>";
	};
	result += "</thead>";
	// console.log(result);
	for (var i = 0; i < teamArrays.length; i++) {
		result += "<tr>";
		var teamArraySingle = teamArrays[i];
		for (var j = 0; j < teamArraySingle.length; j++) {
			// console.log(teamArraySingle[j]);
			result += "<td>"+teamArraySingle[j]+"</td>";
		};
		result += "<tr>";
	};
	result += "</table>";
	document.getElementById("group_table").innerHTML = result;
};

function displayGroupGames(object){
	var gamesObj = object.games.group_games;
	// console.log(gamesObj);
	buildTable(gamesObj, "Group Games", "group_games_table")
};
function displayQuarterGames(object){
	var gamesObj = object.games.quarter_games;
	// console.log(gamesObj);
	buildTable(gamesObj, "Quarter Finals", "quarters_table")
};
function displaySemiGames(object){
	var gamesObj = object.games.semi_games;
	// console.log(gamesObj);
	buildTable(gamesObj, "Semi Finals", "semis_table")
};
function displayFinalGame(object){
	var gamesObj = object.games.final_game;
	// console.log(gamesObj);
	buildTable(gamesObj, "THE FINAL", "final_table")
};

function buildTable(object, title, id){
	var result = "<table class='game'><thead><th colspan='5'>"+title+"</th></thead>";
	for (key in object){
		result += "<tr>";
		// console.log(object[key]);
		result += "<td>"+object[key].time+"</td>";
		result += "<td>"+object[key].team1+"</td>";
		result += "<td>"+object[key].team1_score+"</td>";
		result += "<td>"+object[key].team2_score+"</td>";
		result += "<td>"+object[key].team2+"</td>";
		result += "</tr>";
	}
	result += "</table>";
	document.getElementById(""+id+"").innerHTML = result;
};

