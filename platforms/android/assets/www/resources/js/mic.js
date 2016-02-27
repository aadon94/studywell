// JavaScript Document to handle microphone sensor
var micStatusOn = false; //boolean to check if mic is on or off
var vol;


function getAmbientNoiseLevel() {
    if (localStorage.getItem("ambientNoiseLevel") != null) {
        var ambientNoiseLevel = localStorage.getItem("ambientNoiseLevel");
    } else {
        var ambientNoiseLevel = 6;
    }

    return ambientNoiseLevel;
}



function successCallback() {
    console.log('Microphone is now on.')
    micStatusOn = true;
}

function errorCallback(error) {
    console.log("Microphone error: " + error);
}

function successCallbackOff() {
    console.log('Microphone is now off.');
    micStatusOn = false;
}



function micOn() {
    if (micStatusOn != true) {
        micVolume.start(successCallback, errorCallback);
        micStatusOn = true;
    } else {
        console.log('Microphone is already on.');
    }
}

function micOff() {
    if (micStatusOn == true) {
        micVolume.stop(successCallbackOff, errorCallback);
    } else {
        console.log('Microphone is already off.');
    }
}

function readMic(reading) {
    if (micStatusOn == false) {
        console.log('Microphone was not on - turning on now.');
        micOn();
    }

    micCount++;
    micVolume.read(function(reading) {
        console.log(reading.volume);
        vol = reading.volume;
        totalVol = totalVol + vol;
    }, errorCallback);

    averageVol = totalVol / micCount;
    if (averageVol > (getAmbientNoiseLevel() + 10) && micCount > 29) {
        noisyBackground();
        noiseLevel = "vhigh";
    } else if (averageVol > (getAmbientNoiseLevel() + 5) && micCount > 29) {
        noisyBackground();
        noiseLevel = "high";
    } else if (averageVol > getAmbientNoiseLevel() && micCount > 29) {
        noisyBackground();
        noiseLevel = "medium";
    } else if (micCount > 29) {
        noiseLevel = "low";
        micIntervalNSBool = "false";
    }

    if (localStorage.getItem("oldMicIntervalNSBool") != null) {
        //console.log('running updateSampleR');
        updateSampleRate(micIntervalNSBool, micSampleRate, localStorage.getItem("oldMicIntervalNSBool"), "microphone");
    }

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("oldMicIntervalNSBool", micIntervalNSBool);

    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage support - oh dear.");
    }


}

function recordAmbientNoiseLevel(reading) {
    if (micStatusOn == false) {
        console.log('Microphone was not on - turning on now.');
        micOn();
    }

    micCount++;
    micVolume.read(function(reading) {
        console.log(reading.volume);
        vol = reading.volume;
        totalVol = totalVol + vol;
    }, errorCallback);

    averageVol = totalVol / micCount;

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("ambientNoiseLevel", (averageVol + 1));

        } else {
            // Sorry! No Web Storage support..
            console.log("No web storage support - oh dear.");
        }

    console.log("ambientNoiseLevel: "+localStorage.getItem("ambientNoiseLevel"));
    }

    function startRecordingAmbientNoiseLevel(button) {
        button.disabled = true;
        micCount = 0;
        totalVol = 0;
        recordLevel = setInterval(recordAmbientNoiseLevel, 200);
        setTimeout(function() {
            clearInterval(recordLevel);
            micOff();
            customVolumeLevelSet();
            button.disabled = false;
        }, 10000);
    }


    //Do things on an interval***********
    function micInterval() {
        console.log("Microphone sampling rate: " + micSampleRate);
        micIntervalNSBool = false; //used to be real false boolean 

        micIntervalCount++;
        micCount = 0;
        totalVol = 0;
        micSensor = setInterval(readMic, 333); //measure values every x seconds
        setTimeout(stopMicInterval, 10000); //stop reading after x seconds
    }

    function stopMicInterval() {
        clearInterval(micSensor);
        clearTimeout(micSensor);
        clearTimeout(stopMicInterval);
        micOff();
    }

    function noisyBackground() {
        console.log('It is noisy!');
        micIntervalNSBool = "true";
        micNotStudying++;
    }

    //functions for testing
    function getAverageVolume() {
        console.log('Average Volume: ' + averageVol);
    }