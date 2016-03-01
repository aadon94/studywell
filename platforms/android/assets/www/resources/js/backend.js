var swFireBase = new Firebase("https://vivid-heat-9475.firebaseIO.com/");

var	users = swFireBase.child('users');
var userName = users.child(getUserID());

function pushData() {
	userName.push({
	  userID: getUserID(),
	  serverTimeStamp: Firebase.ServerValue.TIMESTAMP,
	  userAgent: navigator.userAgent,
	  sessionID: generateSessionID(),
	  time: getTime(),
	  date: getDate(),
	  duration: getDurationTimer(), //new duration taken from timer
	  //duration: timeConvert(sessionDuration),
	  score: createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount),
	  micIntervalCount: micIntervalCount,
	  micNotStudyingCount: micNotStudying,
	  accelIntervalCount: accelIntervalCount,
	  accelNotStudingCount: accelNotStudying,
	  appMessage: appMessage,
	  userNotes: getUserNotes()
  }
);
}



//Functions for returning the time and date
var currentdatetime = new Date();

function getDate() {
	var day = ('0' + currentdatetime.getDate()).slice(-2);
	var month = ('0' + (currentdatetime.getMonth()+1)).slice(-2);

    var currentDate = day + "/" + month + "/" + currentdatetime.getFullYear();
    return currentDate;
}

function getTime() {
	var hours = ('0' + currentdatetime.getHours()).slice(-2);
	var minutes = ('0' + currentdatetime.getMinutes()).slice(-2);
	var seconds = ('0' + currentdatetime.getSeconds()).slice(-2);

    var currentTime = hours + ":" + minutes + ":" + seconds;
    return currentTime;
}

//simple session ID - a simple ID for the benefit of the evaluation participants - a real unique id would be a pain to type.
function generateSessionID() {
	var sessionID = currentdatetime.getDate() +""+ currentdatetime.getHours() +""+ currentdatetime.getMinutes();
	return sessionID;
}

//This generates a truely random session ID - for user evaluation, the above method is more appropriate
// function generateSessionID(){
//     var d = new Date().getTime();
//     if(window.performance && typeof window.performance.now === "function"){
//         d += performance.now(); //use high-precision timer if available
//     }
//     var sessionID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = (d + Math.random()*16)%16 | 0;
//         d = Math.floor(d/16);
//         return (c=='x' ? r : (r&0x3|0x8)).toString(16);
//     });
//     return sessionID;
// }


//This was used to get the duration, no longer needed.
// function timeConvert(duration) {
//     var minutes = (duration / 1000) / 60;
//     var seconds = (duration / 1000) % 60;

//     var totalTime = Math.round(minutes) + " minutes and " + Math.round(seconds) + " seconds";
//     return totalTime;
// }