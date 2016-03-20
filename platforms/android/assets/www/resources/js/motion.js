//
function onSuccessAcc(acceleration) {
    // console.log('Acceleration X: ' + acceleration.x + '\n' +
    //     'Acceleration Y: ' + acceleration.y + '\n' +
    //     'Acceleration Z: ' + acceleration.z + '\n' +
    //     'Timestamp: ' + acceleration.timestamp + '\n');
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
    if (firstRunAccel != true) {

        if (localStorage.getItem("accelX") != null) {
            //check if phone was in motion
            if (Math.abs(localStorage.getItem("accelX")) - Math.abs(acceleration.x) > 0.5 || Math.abs(localStorage.getItem("accelX")) - Math.abs(acceleration.x) < -0.5) {
                hasMoved = true;
            }
            if (Math.abs(localStorage.getItem("accelY")) - Math.abs(acceleration.y) > 0.5 || Math.abs(localStorage.getItem("accelY")) - Math.abs(acceleration.y) < -0.5) {
                hasMoved = true;
            }
            if (Math.abs(localStorage.getItem("accelZ")) - Math.abs(acceleration.z) > 0.5 || Math.abs(localStorage.getItem("accelZ")) - Math.abs(acceleration.z) < -0.5) {
                hasMoved = true;
            } else
                hasMoved = false;
            console.log("X difference: " + (Math.abs(localStorage.getItem("accelX")) - Math.abs(acceleration.x)));
            console.log("Y difference: " + (Math.abs(localStorage.getItem("accelY")) - Math.abs(acceleration.y)));
            console.log("Z difference: " + (Math.abs(localStorage.getItem("accelZ")) - Math.abs(acceleration.z)));
        }



        if (hasMoved) {
            console.log("accel not studying count went up");
            accelNotStudying++;
            accelIntervalNSBool = "true";
            stopAccelInterval();

        } else if (accelPulseCount > (localStorage.getItem("accelPulseCount") - 1)) { //once the interval is nearly finished, device is not moving this interval
            accelIntervalNSBool = "false";
            //console.log("accelIntervalNSBool: " +accelIntervalNSBool    );
            accelPulseCount = 0;
            //console.log("Hit the interval not moving loop");
            console.log("accel not studying REMAINS the same");


        }
        //As long as this isn't the first time this method is running, check if the sample rate needs updated.
        if (localStorage.getItem("oldAccelIntervalNSBool") != null) {
            //console.log('running updateSampleR');
            updateSampleRate(accelIntervalNSBool, accelSampleRate, localStorage.getItem("oldAccelIntervalNSBool"), "accelerometer");
        }
        //This is so we can compare the values from this interval and the previous interval
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("oldAccelIntervalNSBool", accelIntervalNSBool);

        } else {
            // Sorry! No Web Storage support..
            console.log("No web storage support - oh dear.");
        }
        // console.log('Device moving: ' + moving);
        console.log('Device moving: ' + hasMoved);

    }

    //Store the values to compare next interval
    localStorage.setItem("accelX", acceleration.x);
    localStorage.setItem("accelY", acceleration.y);
    localStorage.setItem("accelZ", acceleration.z);
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
    hasMoved = false;
    //console.log("Accelerometer sampling rate: " + accelSampleRate);
    accelIntervalNSBool = false; //boolean to determine if the user is not studying during the current interval

    accelIntervalCount++; //how many intervals the accelerometer has been monitored for during this session
    motionCount = 0; //how many times the accelerometer has pulsed during this session
    accelSensor = setInterval(readAccel, 1000); //measure values every x milliseconds
    setTimeout(stopAccelInterval, 10000); //stop reading after x milliseconds
}

//finish the interval
function stopAccelInterval() {
    firstRunAccel = false;
    clearInterval(accelSensor);
    clearTimeout(accelSensor);
    clearTimeout(stopAccelInterval);
}