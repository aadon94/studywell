// JavaScript Document to handle settings
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

function setUserID() {
    var userID = document.getElementById('userIDinput').value;
    localStorage.setItem("userID", userID);
    alert("UserID was set to: " + userID);
}

function getUserID() {

    if (localStorage.getItem("userID") == null) {
        return "User ID is not set.";
    } else
        return localStorage.getItem("userID");
}

function timeConvert(duration) {
    var minutes = (duration / 1000) / 60;
    var seconds = (duration / 1000) % 60;

    var totalTime = Math.round(minutes) + " minutes and " + Math.round(seconds) + " seconds";
    return totalTime;
}