//set a new user ID
function setUserID() {
    var userID = document.getElementById('userIDinput').value;
    localStorage.setItem("userID", userID);
    document.getElementById("userIDname").innerHTML = getUserID();
}

//return the users ID
function getUserID() {
    if (localStorage.getItem("userID") == null) {
        return "User ID is not set";
    } else
        return localStorage.getItem("userID");
}


//---------------------Study breaks-------------------------------------------
function handleBreakReminder(breakRemind) {
    localStorage.setItem("breakNotifBool", breakRemind.value);

    if (breakRemind.value == "true") {
        document.getElementById("handleSP").disabled = false;
    }
    if (breakRemind.value == "false") {
        document.getElementById("handleSP").disabled = true;
    }
}

//Check if the user wants to be reminded to take a break
function getBreakNotifBool() {
    if (localStorage.getItem("breakNotifBool") != null) {
        return localStorage.getItem("breakNotifBool");
    } else
        return true;
}

function handleStudyPeriod(duration) {
    localStorage.setItem("optimalStudyDuration", ((duration.value * 60) * 1000));
}

//How long the user wants to study well for before being reminded to take a break
function getOptimalStudyPeriod() {
    if (localStorage.getItem("optimalStudyDuration") != null) {
        return localStorage.getItem("optimalStudyDuration");
    } else
        return 3000000; //return 50 mins as default value
}
//---------------------End of study breaks-------------------------------------------


//Check if the user wants to be reminded when they've been too distracted
function handleDistractedReminder(distractedRemind) {
    localStorage.setItem("distractedRemindBool", distractedRemind.value);
}

function getDistractedBool() {
    if (localStorage.getItem("distractedRemindBool") != null) {
        return localStorage.getItem("distractedRemindBool");
    } else
        return true;
}