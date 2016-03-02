var breakAlertUp = false;

//Alert the user they have successfully set a custom ambient noise level
function customVolumeLevelSet() {
    navigator.notification.alert(
        'Custom noise threshold has been set.', // message
        alertDismissed, // callback
        'Done!', // title
        'OK' // buttonName
    );
}

function alertDismissed() {
    // do nothing
}

//alert the user that the default volume theshold has been set
function defaultVolumeLevelSet() {
    localStorage.setItem('ambientNoiseLevel', 6);
    navigator.notification.alert(
        'Default noise threshold has been set.', // message
        alertDismissed, // callback
        'Done!', // title
        'OK' // buttonName
    );
}

//alert the user the app is recording a custom volume level
function customVolumeLevelRecording() {
    navigator.notification.alert(
        'App is now analysing the surrounding noise level. This will take 10 seconds.', // message
        alertDismissed, // callback
        'Analysing Surrounding Noise Level', // title
        'OK' // buttonName
    );
}

//alert the user that the ambient noise level is still being recorded, they can't leave the page until it has.
function stillRecordingNoiseLevelWarning() {
    navigator.notification.alert(
        'Still detecting the surrounding noise level. Please wait a few more seconds.', // message
        alertDismissed, // callback
        'Hang on a Moment!', // title
        'OK' // buttonName
    );
}

//Ask the user for notes on their session. ----------------------------------------------------------------
function askUserNotes() {
    navigator.notification.prompt(
        'This is an opportunity to enter any notes you wish to remember about this session', // message
        onPrompt, // callback to invoke
        'User Notes', // title
        ['Ok'], // buttonLabels
        ' ' // defaultText
    );
}

function onPrompt(results) {
    userNotes = results.input1;
    //localStorage.setItem("userNotes", results.input1);
    pushData();
}

//End of Ask the user for notes on their session. ----------------------------------------------------------




//Confirmation for stopping monitoring, also gives option to pause monitoring---------------- 
function stopMonitoringPrompt() {
    document.getElementById('myonoffswitch').checked = true;
    navigator.notification.confirm(
        'Do you want to end this study session?', // message
        onConfirmStopMon, // callback
        'Confirmation', // title
        ['Take a Short Break', 'Yes', 'No'] // button labels
    );
}

function onConfirmStopMon(buttonIndex) {

    if (buttonIndex == 1) {
        //pause monitoring
        pausedPrompt();
    }
    if (buttonIndex == 2) {
        //stop monitoring
        stopMonitoringSensors();
    }
    if (buttonIndex == 3) {
        //continue monitoring
        document.getElementById('myonoffswitch').checked = true;
        document.getElementById("studyPage").innerHTML = "Hit the switch again to pause or finish your study session.";
    }

}

//End of confirmation for stopping monitoring, also gives option to pause monitoring---------------- 




//Once the monitoring has been paused, show this dialog and resume once user clicks OK
function pausedPrompt() {
    pauseMonitoring();
    navigator.notification.alert(
        'Monitoring has been paused, click OK when you wish to resume!', // message
        resumeMonitoring, // callback
        'Monitoring Paused', // title
        'OK' // buttonName
    );
}



//Alert the user that they've been distracted for a while------------------------------------

function checkDistractedReminder() {
    var score = createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);
    if (localStorage.getItem("score") != null) {
        if (localStorage.getItem("score") > score) {
            if ((localStorage.getItem("score") - score) > 15) {
                returnToStudyAlert();
                if (cordova.plugins.backgroundMode.isActive()) {
                    returnToStudyNotif();
                }
                
            }
        }
    }
    localStorage.setItem("score", score);

}

function returnToStudyAlert() {

    navigator.notification.beep(1);

    navigator.notification.confirm(
        'Seems like you may have become a little distracted. Have you finished your study session?', // message
        onConfirmReturn, // callback
        'Sorry to interrupt, but...', // title
        ['Take a Break', 'Yes', 'No'] // button labels
    );

}

function onConfirmReturn(buttonIndex) {
    if (buttonIndex == 1) {
        //pause monitoring
        pausedPrompt();
    }
    if (buttonIndex == 2) {
        //stop monitoring
        stopMonitoringSensors();
    }
    if (buttonIndex == 3) {
        //continue monitoring (do nothing)
    }
}

function returnToStudyNotif() {
    cordova.plugins.notification.local.schedule({
        id: 20,
        title: "Sorry to interrupt, but...",
        text: "Seems like you may have become a little distracted. Have you finished your study session?"
    });
}
//End of Alert the user that they've been distracted for a while-------------------------------------------------



//Alert the user that they've been studying well for so much time and they might consider having a break----------
function takeABreakAlert() {

    navigator.notification.beep(1);
    if (breakAlertUp != true) {
        breakAlertUp = true;
        navigator.notification.confirm(
            'Seems like you\'ve been studying well for quite some time now. We recommend a 10 minute break for optimum brain functionality!', // message
            onConfirmBreak, // callback
            'Sorry to interrupt, but...', // title
            ['Continue Studying', 'Take a Break'] // button labels
        );
    }
}

function onConfirmBreak(buttonIndex) {
    breakAlertUp = false;
    if (buttonIndex == 1) {
        //continue monitoring (do nothing)
    }
    if (buttonIndex == 2) {
        //pause monitoring
        pausedPrompt();
    }
}

function checkBreakReminder() {
    var currentT = new Date();
    var timeSinceBreak = currentT - timeResumed;


    //check if user should consider having a break from studying
    if (timeSinceBreak > 30000) { //if time since break is greater than 50 mins (3000000), 60000 1 min
        var score = createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);
        if (localStorage.getItem("oldScore") != null) {
            if ((localStorage.getItem("oldScore") - 5) <= score) {
                if (score > 60) {
                    //prompt break
                    if (cordova.plugins.backgroundMode.isActive()) {
                        takeABreakNotif();
                    }
                    takeABreakAlert();
                    timeResumed = new Date();
                }
            }
        }
    }
}

function takeABreakNotif() {
    cordova.plugins.notification.local.schedule({
        id: 10,
        title: "Sorry to interrupt, but...",
        text: "Seems like you've been studying well for quite some time now. We recommend a 10 minute break for optimum brain functionality!"
    });
}

function checkScore() {
    var score = createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);;
    localStorage.setItem("oldScore", score);

}

//End of alert the user that they've been studying well for so much time and they might consider having a break----------



//Ask the user if they would like to fill in the post-session questionnaire now
function askQuestionnaire() {
    navigator.notification.confirm(
        'Do you want to fill in the post-session questionnaire while it\'s fresh in memory?', // message
        askConfirm, // callback
        'Confirmation', // title
        ['Yes', 'No, I\'ll do it later'] // button labels
    );

}

function askConfirm(buttonIndex) {
    if (buttonIndex == 1) {
        //open up questionnaire form in browser
        window.open('https://docs.google.com/forms/d/1uZ3MqweHP81HR19M8IqSFBJcJMG_Ht78fJMcGzmvHiY/viewform', '_system')
    }
    if (buttonIndex == 2) {
        //do nothing
    }
}