//
function onSuccessAcc(acceleration) {
    console.log('Acceleration X: ' + acceleration.x + '\n' +
        'Acceleration Y: ' + acceleration.y + '\n' +
        'Acceleration Z: ' + acceleration.z + '\n' +
        'Timestamp: ' + acceleration.timestamp + '\n');
    // var currentAccelValues = new accelValues(acceleration.x, acceleration.y, acceleration.z, acceleration.timestamp);

    //boolean for if the device is moving or not
    var moving = false;

    accelPulseCount++; //this is a count of how many pulses the accelerometer sensor has read (how many pulses within this interval) 

    //check how fast the phone can pulse accelerometer (some phones limited)
    if (localStorage.getItem("accelPulseCount") == null) {
        localStorage.setItem("accelPulseCount", accelPulseCount);
    } else if (accelPulseCount > localStorage.getItem("accelPulseCount")) {
        localStorage.setItem("accelPulseCount", accelPulseCount);
    }
    //safety precausion to make sure accelPulseCount does not go above 9
    if (localStorage.getItem("accelPulseCount") > 9) {
        localStorage.setItem("accelPulseCount", 9);
}
    //if this is the first interval run then skip (we want to count the number of pulses per interval first)
    if (firstRun != true) {

        //check if phone is in motion
        if (acceleration.x > 1 || acceleration.x < -1) {
            moving = true;
        }
        if (acceleration.y > 1 || acceleration.y < -1) {
            moving = true;
        }
        if (acceleration.z > 10.2 || acceleration.z < 8.2) {
            moving = true;
        }
        if (moving) {
            motionCount++;
        }
        //if total count of moving is greater than the total number of pulses per interval divided by 3 then device is said to be moving in this interval
        if (motionCount > (localStorage.getItem("accelPulseCount") / 3)) {
            accelNotStudying++;
            accelIntervalNSBool = "true";
            //console.log("Hit the interval move loop");


            stopAccelInterval();

        } else if (accelPulseCount > (localStorage.getItem("accelPulseCount") - 1)) { //once the interval is nearly finished, device is not moving this interval
            accelIntervalNSBool = "false";
            //console.log("accelIntervalNSBool: " +accelIntervalNSBool    );
            accelPulseCount = 0;
            //console.log("Hit the interval not moving loop");

        }
        //As long as this isn't the first time this method is running, check if the sample rate needs updated.
        if (localStorage.getItem("oldAccelIntervalNSBool") != null) {
            //console.log('running updateSampleR');
            //updateSampleRate(accelIntervalNSBool, accelSampleRate, localStorage.getItem("oldAccelIntervalNSBool"), "accelerometer");
        }
        //This is so we can compare the values from this interval and the previous interval
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("oldAccelIntervalNSBool", accelIntervalNSBool);

        } else {
            // Sorry! No Web Storage support..
            console.log("No web storage support - oh dear.");
        }
        console.log('Device moving: ' + moving);
    }
}


function onErrorAcc() {
    alert('Error: ' + error);
}


function readAccel() {
    navigator.accelerometer.getCurrentAcceleration(onSuccessAcc, onErrorAcc);
}


//Loop the accelerometer sensor reading to pulse every one second for 10 seconds.
function accelInterval() {
    //localStorage.setItem("oldAccelIntervalNotStudyingBool", "initial");
    accelPulseCount = 0; //this is a count of how many pulses the accelerometer sensor has read (how many pulses within this interval) 

    //console.log("Accelerometer sampling rate: " + accelSampleRate);
    accelIntervalNSBool = false; //boolean to determine if the user is not studying during the current interval

    accelIntervalCount++; //how many intervals the accelerometer has been monitored for during this session
    motionCount = 0; //how many times the accelerometer has pulsed during this session
    accelSensor = setInterval(readAccel, 1000); //measure values every x milliseconds
    setTimeout(stopAccelInterval, 10000); //stop reading after x milliseconds
}

//finish the interval
function stopAccelInterval() {
    firstRun = false;
    clearInterval(accelSensor);
    clearTimeout(accelSensor);
    clearTimeout(stopAccelInterval);
}