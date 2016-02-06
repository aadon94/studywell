//Class to handle sessions and scores

//session data layout
var session = function(id, user, studyScore, duration) {
	this.id = id;
	this.user = user;
	this.studyScore = studyScore;
	this.duration = duration;
}

//var currentSession = new session("0001", "Test User", getSessionStudyScore(), getSessionDuration());







function getSessionDuration() {

}



function getSessionStudyScore() {
	console.log("Score for this session is: " + sessionStudyScore);
}

function createSessionScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount) {
	micStudyScore = micNotStudying/micIntervalCount * 100;
	accelStudyScore = accelNotStudying/accelIntervalCount * 100;
	sessionStudyScore = (micStudyScore + accelStudyScore)/2;

}



function getNewID() {
	//return 0001X;
}