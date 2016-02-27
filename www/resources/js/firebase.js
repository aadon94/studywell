var swFireBase = new Firebase("https://vivid-heat-9475.firebaseIO.com/");

// var	sessions = swFireBase.child('sessions');
// var session =	sessions.child('session');

// function pushData() {
// 	sessions.push({
// 	  userID: getUserID(),
// 	  serverTimeStamp: Firebase.ServerValue.TIMESTAMP,
// 	  userAgent: navigator.userAgent,
// 	  sessionID: generateSessionID(),
// 	  time: datetime,
// 	  duration: timeConvert(sessionDuration),
// 	  score: createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount),
// 	  usernotes: "this is a user note"
//   }
// );
// }

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



// var sessionID1 = "testSessionID1";
// var sessionID2 = "testSessionID2";



// var usersRef = swFireBase.child("users");
// usersRef.set({
// 	testUser1: {
// 		session: sessionID1
// 	},
// 	testUser2: {
// 		session: sessionID2
// 	}
// });

// var sessionRef = usersRef.child("sessions");
// sessionRef.set({
// 	sessionID1: {
// 		time_and_date: "12 Feb 2016 - 16:40:23",
// 		duration: "35 minutes",
// 		study_score: "25",
// 		face: "smile",
// 		user_notes: "I had great concentration."
// 	},
// 	sessionID2: {
// 		time_and_date: "13 Feb 2016 - 12:13:13",
// 		duration: "25 minutes",
// 		study_score: "50",
// 		face: "neutral",
// 		user_notes: "Kept having interuptions."
// 	}
// });