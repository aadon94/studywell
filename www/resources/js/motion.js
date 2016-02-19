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
    //console.log('old storage var: '+localStorage.getItem("oldAccelIntervalNSBool"));

    if (acceleration.x > 0.4 || acceleration.x < -0.4) {
        moving = true;
    }
    if (acceleration.y > 0.3 || acceleration.y < -0.3) {
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
        accelIntervalNSBool = "true";
        //console.log("accelIntervalNSBool: " +accelIntervalNSBool);


        stopAccelInterval();

    } else if (accelPulseCount > 9) {
        accelIntervalNSBool = "false";
        //console.log("accelIntervalNSBool: " +accelIntervalNSBool    );

    }

    if (localStorage.getItem("oldAccelIntervalNSBool") != null) {
        //console.log('running updateSampleR');
        updateSampleRate(accelIntervalNSBool, accelSampleRate, localStorage.getItem("oldAccelIntervalNSBool"), "accelerometer");
    }

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("oldAccelIntervalNSBool", accelIntervalNSBool);

    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage support - oh dear.");
    }
    console.log('Device moving: ' + moving);
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
    accelIntervalNSBool =  false; //used to be real false boolean 

    accelIntervalCount++;
    motionCount = 0;
    accelSensor = setInterval(readAccel, 1000); //measure values every x seconds
    setTimeout(stopAccelInterval, 10000); //stop reading after x seconds
}

function stopAccelInterval() {
    clearInterval(accelSensor);
    clearTimeout(accelSensor);
}