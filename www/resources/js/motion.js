function onSuccessAcc(acceleration) {
    console.log('Acceleration X: ' + acceleration.x + '\n' +
        'Acceleration Y: ' + acceleration.y + '\n' +
        'Acceleration Z: ' + acceleration.z + '\n' +
        'Timestamp: ' + acceleration.timestamp + '\n');
    // var currentAccelValues = new accelValues(acceleration.x, acceleration.y, acceleration.z, acceleration.timestamp);

    //check if the device is moving
    var moving = false;
    intervalMoving = false;
    accelPulseCount++;
    if (acceleration.x > 0.3 || acceleration.x < -0.3) {
        moving = true;
    }
    if (acceleration.y > 0.2 || acceleration.y < -0.2) {
        moving = true;
    }
    if (acceleration.z > 9.8 || acceleration.z < 9.0) {
        moving = true;
    }
    if (moving) {
        motionCount++;
    }
    if (motionCount > 3) {
        accelNotStudying++;
        accelIntervalNotStudyingBool = "true";

        stopAccelInterval();

    } else if (accelPulseCount > 8) {
        accelIntervalNotStudyingBool = "false";
    }

    if (localStorage.getItem("oldAccelIntervalNotStudyingBool") != null) {
    	updateSampleR(accelIntervalNotStudyingBool, accelSampleRate, localStorage.getItem("oldAccelIntervalNotStudyingBool"));
    }

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("oldAccelIntervalNotStudyingBool", accelIntervalNotStudyingBool);

    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage support - oh dear.");
    }
    console.log(moving);
}

function onErrorAcc() {
    alert('Error: ' + error);
}

function readAccel() {
    navigator.accelerometer.getCurrentAcceleration(onSuccessAcc, onErrorAcc);
}

//do things on an interval////////////////////////////
function accelInterval() {
    //localStorage.setItem("oldAccelIntervalNotStudyingBool", "initial");
    accelPulseCount = 0;
    console.log("Accelerometer sampling rate: " + accelSampleRate);
    accelIntervalNotStudyingBool = false;

    accelIntervalCount++;
    motionCount = 0;
    accelSensor = setInterval(readAccel, 1000); //measure values every x seconds
    setTimeout(stopAccelInterval, 10000); //stop reading after x seconds
}

function stopAccelInterval() {
    clearInterval(accelSensor);
    clearTimeout(accelSensor);
    clearTimeout(stopAccelInterval); //probably useless
}