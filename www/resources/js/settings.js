// JavaScript Document to handle settings
var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


function setUserID() {
	var userID = document.getElementById('userIDinput').value;
    localStorage.setItem("userID", userID);
	alert("UserID was set to: " +userID);
}

function getUserID() {

	if (localStorage.getItem("userID") == null) {
		return "User ID is not set.";
	}
	else
		return localStorage.getItem("userID");
}

function timeConvert(duration) {
	var minutes = (duration / 1000) / 60;
	var seconds = (duration / 1000) % 60;

	var totalTime = Math.round(minutes) + " minutes and " +Math.round(seconds) + " seconds";
	return totalTime;
}