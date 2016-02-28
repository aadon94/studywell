var statusOn;
var timeBegin;
var timeStop;
var sessionDuration;
var userNotes;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        statusOn = false; //Switch is off
        document.getElementById('myonoffswitch').checked = false; //set switch to be off at start

        //control what switch does
        document.getElementById('myonoffswitch').onchange = function() {
            if (document.getElementById('myonoffswitch').checked === false) {
                tryStopMonitoringSensors();
            }
            if (document.getElementById('myonoffswitch').checked === true) {
                startMonitoringSensors();
            }
        }

        //if the user tries to leave the study page before ending the session
        $('.leave-studying').click(function(e) {
            if (statusOn) {
                e.preventDefault();
                stopMonitoringPrompt();
            }
        });
        //if the user tries to reload the study page before ending the session
        $('.same-page').click(function(e) {
            if (statusOn) {
                e.preventDefault();
            }
        });
    },
};

app.initialize();

function startMonitoringSensors() {
    if (statusOn === false) {
        document.getElementById("studyPage").innerHTML = "Hit the switch again to pause or finish your study session.";

        //Begin timer
        initialiseTimer();
        startTimer();

        //Check if the user wants to be reminded if they are too distracted.
        if (getDistractedBool) {
            setTimeout(checkDistractedReminder, 600000); //first check begins at 10 mins in (score would be 100 if we did it immediately and cause the next check to immeditately flag)
            studyCheck = setInterval(checkDistractedReminder, 1200000); //timer to check if the users score has dropped significantly in the last 20 mins
        }

        //reset variables before beginning
        initialiseMonitoring();

        accelInterval(); //for testing, remove for actual usage
        micInterval(); //for testing, remove for actual usage
        accelMonSensor = setInterval(accelInterval, accelSampleRate); //starts monitoring the sensor every X milliseconds
        micMonSensor = setInterval(micInterval, micSampleRate); //starts monitoring the sensor every X milliseconds
    }
}

//if user presses switch, ask them if they want to end the session or pause
function tryStopMonitoringSensors() {
    if (statusOn === true) {
        stopMonitoringPrompt();
        document.getElementById("studyPage").innerHTML = "";
    }
}

//Stop monitoring the sensors and send data to backend
function stopMonitoringSensors() {
    stopTimer(); //stop counting the timer
    document.getElementById('myonoffswitch').checked = false;


    //no longer used, was for getting session duration
    //timeStop = new Date(); 
    //sessionDuration = (timeStop - timeBegin) - totalDurationPaused;

    if (getDistractedBool) {
        clearInterval(studyCheck);
    }
    clearInterval(accelMonSensor);
    clearInterval(micMonSensor);
    clearTimeout(accelMonSensor);
    clearTimeout(micMonSensor);

    //clearInterval(updateSampling);
    statusOn = false;
    //pushData();

    killSensors();

    //ask the user if they want to add any notes and push data after it.
    askUserNotes();
    document.getElementById("studyPage").innerHTML = "Hit the switch above to start a study session!";

}

function restartAccelSensor(sampleRate) {
    clearInterval(accelMonSensor);
    clearTimeout(accelMonSensor);
    accelMonSensor = setInterval(accelInterval, sampleRate);
    console.log('Accelerometer restarted with a samplerate of: ' + sampleRate);
}

function restartMicSensor(sampleRate) {
    clearInterval(micMonSensor);
    clearTimeout(micMonSensor);
    micMonSensor = setInterval(micInterval, sampleRate);
    console.log('Microphone restarted with a samplerate of: ' + sampleRate);
}

function pauseMonitoring() {
    stopTimer();
    timePaused = new Date();
    document.getElementById('myonoffswitch').checked = false;

    clearInterval(accelMonSensor);
    clearInterval(micMonSensor);
    clearTimeout(accelMonSensor);
    clearTimeout(micMonSensor);

}

function resumeMonitoring() {
    startTimer();
    timeResumed = new Date();

    accelMonSensor = setInterval(accelInterval, accelSampleRate); //starts monitoring the sensor every X milliseconds
    micMonSensor = setInterval(micInterval, micSampleRate); //starts monitoring the sensor every X milliseconds
    durationPaused = timeResumed - timePaused;
    totalDurationPaused += durationPaused;

    document.getElementById('myonoffswitch').checked = true;
    document.getElementById("studyPage").innerHTML = "Hit the switch again to pause or finish your study session.";


}

// function askUserNotes() {
//     userNotes = prompt("This is an opportunity to enter any notes you wish to remember about this session. If you have nothing to add then just click OK.");
// }

function getUserNotes() {
    if (userNotes != null) {
        return userNotes;
    } else
        return " ";
}

function getDuration() {
    var timeNow = new Date();
    var duration = (timeNow - timeBegin)
}

function initialiseMonitoring() {
    firstRun = true; //var to check if the phone has to indentify the speed at which accel can be checked
    timeResumed = new Date(); //for checking if user should have break (used to get duration since last break)

    localStorage.setItem("accelPulseCount", 0);

    micOff();


    totalDurationPaused = 0;
    accelSampleRate = 30000;
    micSampleRate = 30000;
    micSteadyScoreCount = 0;
    micFluctuatingScoreCount = 0;
    accelSteadyScoreCount = 0;
    accelFluctuatingScoreCount = 0;
    sensorSteadyCount = 0;
    sensorFluctuatingCount = 0;

    //
    micIntervalCount = 0; //no. of intervals within a session
    micNotStudying = 0; //no. of intervals within a session that user was not studying
    accelIntervalCount = 0; //no. of intervals within a session
    accelNotStudying = 0; //no. of intervals within a session that user was not studying
    statusOn = true;
    //old way of getting duration
    // timeBegin = new Date();
    //    totalDurationPaused = 0;

}

function killSensors() {
    stopAccelInterval();
    stopMicInterval();
    return true;
}

function leaveStudyPage() {
    if (statusOn) {
        return false;
    } else
        return true;
}

// function askUserNotes() {
//     userNotes = prompt("This is an opportunity to enter any notes you wish to remember about this session. If you have nothing to add then just click OK.");
//     localStorage.setItem("userNotes", userNotes);
// }

// function getUserNotes() {
//     if (localStorage.getItem("userNotes") != null) {
//         return localStorage.getItem("userNotes");
//     } else
//         return " ";
// }