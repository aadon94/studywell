function alertDismissed() {
    // do something
}

function monitoringEnabled() {
    navigator.notification.alert(
        'Monitoring has been enabled, get studying!', // message
        alertDismissed, // callback
        'Studying Started', // title
        'OK' // buttonName
    );
}



// function askUserNotes() {
// navigator.notification.prompt(
//     'This is an opportunity to enter any notes you wish to remember about this session',  // message
//     onPrompt,                  // callback to invoke
//     'User Notes',            // title
//     ['Ok'],             // buttonLabels
//     ' '                 // defaultText
// );
// }

function onPrompt(results) {
    //userNotes = results.input1;
    localStorage.setItem("userNotes", results.input1);
}

function onConfirmReturn(buttonIndex) {
    if (buttonIndex == 2) {
        //stop monitoring
        stopMonitoringSensors();
    }
    if (buttonIndex == 3) {
        //continue monitoring (do nothing)
    }
    if (buttonIndex == 1) {
        //pause monitoring
        pausedPrompt();
    }
}

function returnToStudyAlert(bool) {

    if (bool) {
        navigator.notification.beep(1);

        navigator.notification.confirm(
            'Seems like you may have become a little distracted. Have you finished your study session?', // message
            onConfirmReturn, // callback
            'Sorry to interrupt, but...', // title
            ['Take a Break', 'Yes', 'No'] // button labels
        );
    }

}

function onConfirmBreak(buttonIndex) {
    if (buttonIndex == 1) {
        //continue monitoring (do nothing)
    }
    if (buttonIndex == 2) {
        //pause monitoring
        pausedPrompt();
    }
}

function takeABreakAlert(bool) {

    if (bool) {
        navigator.notification.beep(1);

        navigator.notification.confirm(
            'Seems like you\'ve been studying well for quite some time now. We recommend a 10 minute break for optimum brain functionality!', // message
            onConfirmBreak, // callback
            'Sorry to interrupt, but...', // title
            ['Continue Studying', 'Take a Break'] // button labels
        );
    }

}

function onConfirmStopMon(buttonIndex) {
    if (buttonIndex == 2) {
        //stop monitoring
        stopMonitoringSensors();
    }
    if (buttonIndex == 3) {
        //continue monitoring
        document.getElementById('myonoffswitch').checked = true;
    }
    if (buttonIndex == 1) {
        //pause monitoring
        pausedPrompt();
    }
}

function stopMonitoringPrompt() {
    navigator.notification.confirm(
        'Do you want to end this study session?', // message
        onConfirmStopMon, // callback
        'Confirmation', // title
        ['Take a Short Break', 'Yes', 'No'] // button labels
    );
}


function pausedPrompt() {
    pauseMonitoring();
    navigator.notification.alert(
        'Monitoring has been paused, click OK when you wish to resume!', // message
        resumeMonitoring, // callback
        'Monitoring Paused', // title
        'OK' // buttonName
    );
}

function checkStudyReminder() {
    var score = createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);
    if (localStorage.getItem("score") != null) {
        if (localStorage.getItem("score") > score) {
            if ((localStorage.getItem("score") - score) > 20) {
                var bool = true;
                returnToStudyAlert(bool);
            }
        }
    }
    localStorage.setItem("score", score);

}


function checkReminder() {
    var currentT = new Date();
    var timeSinceBreak = currentT - timeResumed;

    //check if user should consider having a break from studying
    if (timeSinceBreak > 3000000) { //if time since break is greater than 50 mins (3000000), 60000 1 min
        var currentScore = createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);
        if (currentScore > 60) {
            //prompt break
            var breakNotifBool = true; //boolean for notifications on or off
            takeABreakAlert(breakNotifBool);
            timeResumed = new Date();
        }
    }

    //check if user isn't studying well
    var score = createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);
    localStorage.setItem("currentScore", score);

    var lastTime = new Date();




}