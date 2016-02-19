//Class to handle sessions and scores

//session data layout
var session = function(id, user, studyScore, duration) {
    this.id = id;
    this.user = user;
    this.studyScore = studyScore;
    this.duration = duration;
}

//var currentSession = new session("0001", "Test User", getSessionStudyScore(), getSessionDuration());


function generateSessionID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var sessionID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return sessionID;
}



function getSessionDuration() {

}









function getNewID() {
    //return 0001X;
}