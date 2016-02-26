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
    //check how fast the phone can check accelerometer (some phones limited)
    if (localStorage.getItem("accelPulseCount") == null) {
        localStorage.setItem("accelPulseCount", accelPulseCount);
    } else if (accelPulseCount > localStorage.getItem("accelPulseCount")) {
        localStorage.setItem("accelPulseCount", accelPulseCount);
    }
    if (firstRun != true) {
        //console.log('old storage var: '+localStorage.getItem("oldAccelIntervalNSBool"));

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
        if (motionCount > (localStorage.getItem("accelPulseCount") / 3)) {
            accelNotStudying++;
            accelIntervalNSBool = "true";
            //console.log("accelIntervalNSBool: " +accelIntervalNSBool);


            stopAccelInterval();

        } else if (accelPulseCount > (localStorage.getItem("accelPulseCount") - 1)) {
                accelIntervalNSBool = "false";
                //console.log("accelIntervalNSBool: " +accelIntervalNSBool    );
                accelPulseCount = 0;
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
    }


    function onErrorAcc() {
        alert('Error: ' + error);
    }


    function readAccel() {
        navigator.accelerometer.getCurrentAcceleration(onSuccessAcc, onErrorAcc);
    }


    //do things on an interval////////////////////////////
    function accelInterval() {
        checkReminder();
        //localStorage.setItem("oldAccelIntervalNotStudyingBool", "initial");
        accelPulseCount = 0;
        console.log("Accelerometer sampling rate: " + accelSampleRate);
        accelIntervalNSBool = false; //used to be real false boolean 

        accelIntervalCount++;
        motionCount = 0;
        accelSensor = setInterval(readAccel, 1000); //measure values every x seconds
        setTimeout(stopAccelInterval, 10000); //stop reading after x seconds
    }

    function stopAccelInterval() {
        firstRun = false;
        clearInterval(accelSensor);
        clearTimeout(accelSensor);
    }