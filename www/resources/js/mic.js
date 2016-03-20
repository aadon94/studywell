// JavaScript Document to handle microphone sensor
var micStatusOn = false; //boolean to check if mic is on or off
var vol;


//-------------------Microphone Plugin Methods----------------------------------------------------

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


//Turn the microphone on
function micOn() {
    if (micStatusOn != true) {
        micVolume.start(successCallback, errorCallback);
        micStatusOn = true;
    } else {
        console.log('Microphone is already on.');
    }
}

//Turn the microphone off
function micOff() {
    if (micStatusOn != false) {
        micVolume.stop(successCallbackOff, errorCallback);
    } else {
        console.log('Microphone is already off.');
    }
}

//Read the microphone volume once. As this is repeated it builds up an average volume level over the interval period
//NOTE: noiseLevel is currently not used, it is simply a placeholder for more work to be done at a later date
//Currently this method is just used to identify if the noise is above the threshold value and if so, increase the 
// microphone not studying count by one.
function readMic(reading) {
    if (micStatusOn == false) {
        console.log('Microphone was not on - turning on now.');
        micOn();
    }

    micPulseCount++;

    //check how fast the phone can pulse mic (some phones may be limited)
    if (localStorage.getItem("micPulseCount") == null) {
        localStorage.setItem("micPulseCount", micPulseCount);
    } else if (micPulseCount > localStorage.getItem("micPulseCount")) {
        localStorage.setItem("micPulseCount", micPulseCount);
    }
    //safety precausion to make sure micPulseCount does not go above 30
    if (localStorage.getItem("accelPulseCount") > 30) {
        localStorage.setItem("accelPulseCount", 30);
    }
    if (firstRunMic != true) {

        micVolume.read(function(reading) {
            // console.log("micPulseCount: " + micPulseCount + "  vol: " + reading.volume);
            vol = reading.volume;
            totalVol = totalVol + vol;
        }, errorCallback);

        averageVol = totalVol / micPulseCount;
        if (averageVol > (getAmbientNoiseLevel() + 10) && micPulseCount > (localStorage.getItem("micPulseCount")-1)) {
            noisyBackground();
            noiseLevel = "vhigh";
        } else if (averageVol > (getAmbientNoiseLevel() + 5) && micPulseCount > (localStorage.getItem("micPulseCount")-1)) {
            noisyBackground();
            noiseLevel = "high";
        } else if (averageVol > getAmbientNoiseLevel() && micPulseCount > (localStorage.getItem("micPulseCount")-1)) {
            noisyBackground();
            noiseLevel = "medium";
        } else if (micPulseCount > (localStorage.getItem("micPulseCount")-1)) {
            noiseLevel = "low";
            micIntervalNSBool = "false"; //look to sampling method for more information on what this is for
        }

        //As long as this isn't the first time this method is running, check if the sample rate needs updated.
        if (localStorage.getItem("oldMicIntervalNSBool") != null) {
            //console.log('running updateSampleR');
            //updateSampleRate(micIntervalNSBool, micSampleRate, localStorage.getItem("oldMicIntervalNSBool"), "microphone");
        }

        //This is so we can compare the values from this interval and the previous interval
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("oldMicIntervalNSBool", micIntervalNSBool);

        } else {
            // Sorry! No Web Storage support..
            console.log("No web storage support - oh dear.");
        }

    }
}

//Loop the microphone sensor for 10 seconds (perform an interval)
function micInterval() {
    console.log("Microphone sampling rate: " + micSampleRate);
    micIntervalNSBool = false; //boolean to determine if the user is not studying during the current interval

    micIntervalCount++;
    micPulseCount = 0; //this is a count of how many pulses the microphones sensors has read (how many times readMic was called in this interval) 
    totalVol = 0; //for working out the average within readMic
    micSensor = setInterval(readMic, 333); //measure values every x milliseconds
    setTimeout(stopMicInterval, 10000); //stop reading after x milliseconds
}

//stop the mic sensing
function stopMicInterval() {
    firstRunMic = false;
    clearInterval(micSensor);
    clearTimeout(micSensor);
    clearTimeout(stopMicInterval);
    micOff();
}

//If the surrounding noise level is above the threshold value, do these things.
function noisyBackground() {
    console.log('mic not studying count went up');
    micIntervalNSBool = "true";
    micNotStudying++;
}

//useful for testing
function getAverageVolume() {
    console.log('Average Volume: ' + averageVol);
}

//-------------------Recording ambient noise level within settings to set a custom threshold value-----------

function recordAmbientNoiseLevel(reading) {
    micPulseCount++;
    micVolume.read(function(reading) {
        console.log(reading.volume);
        vol = reading.volume;
        totalVol = totalVol + vol;
    }, errorCallback);

    averageVol = totalVol / micPulseCount;

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("ambientNoiseLevel", (averageVol + 1));

    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage support - oh dear.");
    }

    console.log("ambientNoiseLevel: " + localStorage.getItem("ambientNoiseLevel"));
}

//Loop the microphone sensor
function startRecordingAmbientNoiseLevel(button) {
    customVolumeLevelRecording();
    recordingNoiseLevel = true;
    micOff();
    micOn();
    button.disabled = true; //disable the button
    micPulseCount = 0;
    totalVol = 0;
    recordLevel = setInterval(recordAmbientNoiseLevel, 200);
    setTimeout(killNoiseLevelRecording, 10000);
    setTimeout(function() {
            button.disabled = false;
        } //enable the button again
        , 10000)
}

function killNoiseLevelRecording() {
    customVolumeLevelSet();
    recordingNoiseLevel = false;
    clearInterval(recordLevel);
    clearTimeout(recordLevel);
    clearTimeout(killNoiseLevelRecording);
    micOff();
}

//Get the threshold value to compare current noise level to
function getAmbientNoiseLevel() {
    if (localStorage.getItem("ambientNoiseLevel") != null) {
        var ambientNoiseLevel = localStorage.getItem("ambientNoiseLevel");
    } else {
        var ambientNoiseLevel = 6;
    }

    return ambientNoiseLevel;
}

//-------------------End of recording ambient noise level within settings to set a custom threshold value-----------