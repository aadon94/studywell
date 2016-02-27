/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        statusOn = false;

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

    },
};

app.initialize();

function startMonitoringSensors() {
    if (statusOn === false) {
        document.getElementById("studyPage").innerHTML = "Hit the switch again to pause or finish your study session.";
        initialiseTimer();
        startTimer();
        if (getDistractedBool) {
            setTimeout(checkDistractedReminder, 600000); //first check begins at 10 mins in (score would be 100 if we did it immediately and cause the next check to immeditately flag)
            studyCheck = setInterval(checkDistractedReminder, 1200000); //timer to check if the users score has dropped significantly in the last 20 mins
        }
        firstRun = true; //var to check if the phone has to indentify the speed at which accel can be checked
        //monitoringEnabled();  //alert to tell user monitoring has started
        timeBegin = new Date();
        timeResumed = new Date;
        initialiseMonitoring();
        micIntervalCount = 0; //no. of intervals within a session
        micNotStudying = 0; //no. of intervals within a session that user was not studying
        accelIntervalCount = 0; //no. of intervals within a session
        accelNotStudying = 0; //no. of intervals within a session that user was not studying
        totalDurationPaused = 0;
        statusOn = true;
        accelInterval(); //for testing, remove for actual usage
        micInterval(); //for testing, remove for actual usage
        accelMonSensor = setInterval(accelInterval, accelSampleRate); //starts monitoring the sensor every X milliseconds
        micMonSensor = setInterval(micInterval, micSampleRate); //starts monitoring the sensor every X milliseconds
    }
}

function tryStopMonitoringSensors() {
    if (statusOn === true) {
        stopMonitoringPrompt();
                document.getElementById("studyPage").innerHTML = "";

    }
}

function stopMonitoringSensors() {
        stopTimer();
        timeStop = new Date();
        console.log("timeStop: " +timeStop);
        console.log("timeBegin: " +timeBegin);
        console.log("totalDurationPaused: " +totalDurationPaused);

        sessionDuration = (timeStop - timeBegin) - totalDurationPaused;
        clearInterval(studyCheck);
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

function askUserNotes() {
    userNotes = prompt("This is an opportunity to enter any notes you wish to remember about this session. If you have nothing to add then just click OK.");
}

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