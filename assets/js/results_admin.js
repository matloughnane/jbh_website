// FIREBASE REFERENCES
var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/arranmore_challenge/");

var resultsObj = {};
var teams =[];

firebaseRef.on("value", function(snapshot) {
    resultsObj = snapshot.val();
    // SHOW TEAMS
    getTeams(resultsObj);
    // GROUPS TABLE
    displayGroups(resultsObj);
    // GROUPS GAMES
	displayAllTables(resultsObj);
	displayAllLists(resultsObj);
});


function getTeams(object){
	var teams = [];
	// teams = ["Finn Harps Youths", "Tory Celtic", "Stonecutters", "Barhale", "The Rebels", "F.C. Palatico", "Riverside F.C.", "Arranmore Utd", "Midland Warriors", "FC Internazionale", "Real Lypis", "Gallagher Tunnelling", "St. Annes", "Damo's Dream", "Northern Tunnelling", "Clannad Celtic"];

	for (key in object.games.groups){

		if (object.games.groups[key].Team1 == "-"){
			// NOTHING
		} else {
			teams.push(object.games.groups[key].Team1);
		}
		if (object.games.groups[key].Team2 == "-"){
			// NOTHING
		} else {
			teams.push(object.games.groups[key].Team2);
		}
		if (object.games.groups[key].Team3 == "-"){
			// NOTHING
		} else {
			teams.push(object.games.groups[key].Team3);
		}
		if (object.games.groups[key].Team4 == "-"){
			// NOTHING
		} else {
			teams.push(object.games.groups[key].Team4);
		}
	}


	var html = "<option>Select A Team</option>";
	for (var i = teams.length - 1; i >= 0; i--) {
		html += "<option>"+teams[i]+"</option>"
	}
	// console.log(html);
	document.getElementById("team1").innerHTML = html;
	document.getElementById("team2").innerHTML = html;

}

var group = ["Day 1, 11:30", "Day 1, 11:55", "Day 1, 12:20", "Day 1, 12:45", "Day 1, 13:10", "Day 1, 13:35", "Day 1, 14:00", "Day 1, 14:25", "Day 1, 14:50", "Day 1, 15:15", "Day 1, 15:40", "Day 1, 16:05", "Day 1, 16:30", "Day 1, 16:55", "Day 1, 17:20", "Day 1, 17:45", "Day 2, 11:30", "Day 2, 11:55", "Day 2, 12:20", "Day 2, 12:45", "Day 2, 13:10", "Day 2, 13:35", "Day 2, 14:00", "Day 2, 14:25"];

var quarter = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];

var semi = ["Semi 1", "Semi 2"];

var final = ["FINAL"];

$("#game_selection").change(function() {
    var parent = $(this).val(); 
    switch(parent){ 
        case 'group':
             list(group);
            break;
        case 'quarter':
             list(quarter);
            break;              
        case 'semi':
             list(semi);
            break;                
        case 'final':
             list(final);
            break;  
        default: //default child option is blank
            $("#game_times").append("<option>Select a game group</option>");
            break;
	}
});

//function to populate child select box
function list(array_list)
{
    $("#game_times").html(""); //reset child options
    $(array_list).each(function (i) { //populate child options 
        $("#game_times").append("<option value='"+array_list[i]+"' id='"+array_list[i]+"'>"+array_list[i]+"</option>");
    });
}


// ADD TEAM TO DB
$(function() { 
    jQuery('body').on('click', 'a', function () {
    if ( $(this).hasClass("btn_add_team") ) {
    		var group = $('#groups').val()
    		var teamNo = $('#teamNo').val();
    		var teamName = $('#teamNameGroups').val();
    		// console.log("clicked " + teamName + " " + group + " " + teamNo);
    		validateTeam(teamName, group, teamNo);
        }
    });
});


function validateTeam(team, group, number) {
	if (group == "Select Group") {
		console.log("Needs Group");
	} else if (number == "Select Team No.") {
		console.log("Needs Number")
	} else if (team == "") {
		console.log("Needs Team Name");
		team = "-";
	} else {
		// console.log("Push to Firebase");
		pushToFirebaseTeam(team, group, number);
	}
}

function pushToFirebaseTeam(team, group, number){
	// console.log("Pushing " + team + " " + group + " " + number);
	if (team == ""){
		team = "-";
	}
	var databaseRef = firebaseRef.child("/games/groups/"+group+"/"+number+"/");
	databaseRef.set( team );
}

// BUILD THE EDITABLE LISTS
function displayAllLists(resultsObj){
	displayGroupGamesList(resultsObj);
	displayQuarterGamesList(resultsObj);
	displaySemisGamesList(resultsObj);
	displayFinalGameList(resultsObj);
};
function displayGroupGamesList(resultsObj){
	var gamesObj = resultsObj.games.group_games;
	// buildList FUNCTION
	buildList(gamesObj, "group_games", "group_games_list");
}
function displayQuarterGamesList(resultsObj){
	var gamesObj = resultsObj.games.quarter_games;
	// buildList FUNCTION
	buildList(gamesObj, "quarter_games", "quarter_games_list");
}
function displaySemisGamesList(resultsObj){
	var gamesObj = resultsObj.games.semi_games;
	// buildList FUNCTION
	buildList(gamesObj, "semi_games", "semi_games_list");
}
function displayFinalGameList(resultsObj){
	var gamesObj = resultsObj.games.final_game;
	// buildList FUNCTION
	buildList(gamesObj, "final_game", "final_games_list");
}
// GENERAL LIST
function buildList(object, btn_ID, html_ID){
	var result = "<div>";
	for (key in object) {
		// console.log(key);
		result += "<div class='grid list'>";
		result += "<div class='unit w-1-6'>"+object[key].time+"</div>";
		result += "<div class='unit w-1-6'>"+object[key].team1+"</div>";
		result += "<div class='unit w-1-6'>"+object[key].team1_score+"</div>";
		result += "<div class='unit w-1-6'>"+object[key].team2_score+"</div>";
		result += "<div class='unit w-1-6'>"+object[key].team2+"</div>";
		result += "<div class='unit w-1-6' id='"+btn_ID+"'><a class='btn btn_remove' id="+key+">CLEAR</a></div>";
		result += "</div>";
	};

	result += "</div>";
	document.getElementById(""+html_ID+"").innerHTML = result;
};


// BUILD THE TABLES
function displayAllTables(resultsObj){
    displayGroupGames(resultsObj);
    displayQuarterGames(resultsObj);
    displaySemiGames(resultsObj);
    displayFinalGame(resultsObj);
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

// GROUP TABLES
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


// REMOVE GAMES
$(function() { 
    jQuery('body').on('click', 'a', function () {
    if ( $(this).hasClass("btn_add") ) {
    		var gameSelection = $('#game_selection').val();
    		var time = $('#game_times').val();
    		var team1 = $('#team1').val();
    		var score_1 = $('#team1_score').val();
    		var team2 = $('#team2').val();
    		var score_2 = $('#team2_score').val();
    		// console.log(team1 + " " + score_1  + " " + team2  + " " + score_2 + " " + time);
    		validateForm(time, team1, score_1, team2, score_2);
        }
    });
});

function validateForm(time, team1, score_1, team2, score_2){
	if (time == null ) {
		console.log("Time is not valid");
	} else {
		console.log("Time is valid");
		if (team1 != "Choose A Team" && team2 != "Choose A Team"){
			var gameGroup = checkGameGroup(time);
			var gameNumber = checkGameNumber(time);
			// console.log(gameGroup + " " + gameNumber);
			pushToFirebase(gameGroup, gameNumber, time, team1, score_1, team2, score_2);
		} else {
			// TEAMS NOT SELECTED
			console.log("Teams are not valid");
		}
	}
};

function checkGameGroup(time){
	switch (time) {
		case "Day 1, 11:30":
			return "group_games";
			break;
		case "Day 1, 11:55":
			return "group_games";
			break;
		case "Day 1, 12:20":
			return "group_games";
			break;
		case "Day 1, 12:45":
			return "group_games";
			break;
		case "Day 1, 13:10":
			return "group_games";
			break;
		case "Day 1, 13:35":
			return "group_games";
			break;
		case "Day 1, 14:00":
			return "group_games";
			break;
		case "Day 1, 14:25":
			return "group_games";
			break;
		case "Day 1, 14:50":
			return "group_games";
			break;
		case "Day 1, 15:15":
			return "group_games";
			break;
		case "Day 1, 15:40":
			return "group_games";
			break;
		case "Day 1, 16:05":
			return "group_games";
			break;
		case "Day 1, 16:30":
			return "group_games";
			break;
		case "Day 1, 16:55":
			return "group_games";
			break;
		case "Day 1, 17:20":
			return "group_games";
			break;
		case "Day 1, 17:45":
			return "group_games";
			break;
		case "Day 2, 11:30":
			return "group_games";
			break;
		case "Day 2, 11:55":
			return "group_games";
			break;
		case "Day 2, 12:20":
			return "group_games";
			break;
		case "Day 2, 12:45":
			return "group_games";
			break;
		case "Day 2, 13:10":
			return "group_games";
			break;
		case "Day 2, 13:35":
			return "group_games";
			break;
		case "Day 2, 14:00":
			return "group_games";
			break;
		case "Day 2, 14:25":
			return "group_games";
			break;
		case "Quarter 1":
			return "quarter_games";
			break;
		case "Quarter 2":
			return "quarter_games";
			break;
		case "Quarter 3":
			return "quarter_games";
			break;
		case "Quarter 4":
			return "quarter_games";
			break;
		case "Semi 1":
			return "semi_games";
			break;
		case "Semi 2":
			return "semi_games";
			break;
		case "FINAL":
			return "final_game";
			break;
		default:
			return game0;
			break;
	}
};

function checkGameNumber(time){
	switch (time) {
		case "Day 1, 11:30":
			return "game01";
			break;
		case "Day 1, 11:55":
			return "game02";
			break;
		case "Day 1, 12:20":
			return "game03";
			break;
		case "Day 1, 12:45":
			return "game04";
			break;
		case "Day 1, 13:10":
			return "game05";
			break;
		case "Day 1, 13:35":
			return "game06";
			break;
		case "Day 1, 14:00":
			return "game07";
			break;
		case "Day 1, 14:25":
			return "game08";
			break;
		case "Day 1, 14:50":
			return "game09";
			break;
		case "Day 1, 15:15":
			return "game10";
			break;
		case "Day 1, 15:40":
			return "game11";
			break;
		case "Day 1, 16:05":
			return "game12";
			break;
		case "Day 1, 16:30":
			return "game13";
			break;
		case "Day 1, 16:55":
			return "game14";
			break;
		case "Day 1, 17:20":
			return "game15";
			break;
		case "Day 1, 17:45":
			return "game16";
			break;
		case "Day 2, 11:30":
			return "game17";
			break;
		case "Day 2, 11:55":
			return "game18";
			break;
		case "Day 2, 12:20":
			return "game19";
			break;
		case "Day 2, 12:45":
			return "game20";
			break;
		case "Day 2, 13:10":
			return "game21";
			break;
		case "Day 2, 13:35":
			return "game22";
			break;
		case "Day 2, 14:00":
			return "game23";
			break;
		case "Day 2, 14:25":
			return "game24";
			break;
		case "Quarter 1":
			return "game25";
			break;
		case "Quarter 2":
			return "game26";
			break;
		case "Quarter 3":
			return "game27";
			break;
		case "Quarter 4":
			return "game28";
			break;
		case "Semi 1":
			return "game29";
			break;
		case "Semi 2":
			return "game30";
			break;
		case "FINAL":
			return "game31";
			break;
		default:
			return "game0";
			break;
	}
};

function pushToFirebase(gameGroup, gameNumber, gameTime, team1, score_1, team2, score_2){
	var databaseRef = firebaseRef.child("/games/"+gameGroup+"/"+gameNumber+"/");
	// console.log(databaseRef);
	if (team1 == "Select A Team"){
		team1 = "-";
	}
	if (team2 == "Select A Team"){
		team2 = "-";
	}
	if (score_1 == "") {
		score_1 = "-";
	}
	if (score_2 == "") {
		score_2 = "-";
	}
	databaseRef.set( 
		{
            "team1": team1,
            "team1_score": score_1,
            "team2": team2,
            "team2_score": score_2,
            "time": gameTime
    	}
    );
};

// REMOVE GAMES
$(function() { 
    jQuery('body').on('click', 'a', function () {
    if ( $(this).hasClass("btn_remove") ) {
    		var game = $(this).attr('id');
    		var game_groups_id = $(this).parent().attr('id');
    		// console.log("clicked remove " + game + " " + game_groups_id);
    		removeFromFirebase(game, game_groups_id);
        }
    });
});
function removeFromFirebase(gameID, game_groups_id){
	var databaseRef = firebaseRef.child("/games/"+game_groups_id+"/"+gameID+"/");
	// console.log(game_groups_id + " " + gameID);
	// databaseRef.child(gameID).remove();
	// console.log(databaseRef);
	databaseRef.child("team1").set("-");
	databaseRef.child("team2").set("-");
	databaseRef.child("team1_score").set("-");
	databaseRef.child("team2_score").set("-");
};

