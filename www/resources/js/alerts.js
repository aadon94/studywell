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
    navigator.notification.beep(1);

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
    if (buttonIndex == 1) {
        //stop monitoring
        stopMonitorSensors();
    }
    if (buttonIndex == 2) {
        //continue monitoring (do nothing)
    }
    if (buttonIndex == 3) {
        //pause monitoring
    }
}

function returnToStudyAlert(bool) {

    if (bool) {
        navigator.notification.beep(1);

        navigator.notification.confirm(
            'Seems like you may have become a little distracted. Have you finished your study session?', // message
            onConfirmReturn, // callback
            'Sorry to interrupt, but...', // title
            ['Yes', 'No', 'Take a Break'] // button labels
        );
    }

}

function onConfirmBreak(buttonIndex) {
    if (buttonIndex == 1) {
        //continue monitoring (do nothing)
    }
    if (buttonIndex == 2) {
        //pause monitoring
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
    if (buttonIndex == 1) {
        //stop monitoring
        timeStop = new Date();
        sessionDuration = (timeStop - timeBegin) - totalDurationPaused;
        clearInterval(accelMonSensor);
        clearInterval(micMonSensor);
        clearTimeout(accelMonSensor);
        clearTimeout(micMonSensor);
        askUserNotes();
        //clearInterval(updateSampling);
        stopMicInterval();
        stopAccelInterval();
        statusOn = false;
        pushData();
    }
    if (buttonIndex == 2) {
        //continue monitoring
        document.getElementById('myonoffswitch').checked = true;
    }
    if (buttonIndex == 3) {
        //pause monitoring
        pauseMonitoring();
        pausedPrompt();
    }
}

function stopMonitoringPrompt() {
    navigator.notification.confirm(
        'Do you want to end this study session?', // message
        onConfirmStopMon, // callback
        'Confirmation', // title
        ['Yes', 'No', 'Take a Short Break'] // button labels
    );
}


function pausedPrompt() {
    navigator.notification.alert(
        'Monitoring has been paused, click OK when you wish to resume!', // message
        resumeMonitoring, // callback
        'Monitoring Paused', // title
        'OK' // buttonName
    );
}
