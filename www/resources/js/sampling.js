//class to control sampling rates of sensors

function increaseSampleRate(currentRate) {
    if (currentRate > 30000) {
        var newRate = currentRate - 30000;
        return newRate;
    } else {
        return currentRate;
    }

}

function decreaseSampleRate(currentRate) {
    if (currentRate < 1200000) {
        var newRate = currentRate + 30000;
        return newRate;
    } else {
        return currentRate;
    }
}

function initialiseMonitoring() {
    totalDurationPaused = 0;
    accelSampleRate = 30000;
    micSampleRate = 30000;
    micSteadyScoreCount = 0;
    micFluctuatingScoreCount = 0;
    accelSteadyScoreCount = 0;
    accelFluctuatingScoreCount = 0;
    sensorSteadyCount = 0;
    sensorFluctuatingCount = 0;

}


// function updateSamplingRate() {

//     createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);

//     if (localStorage.getItem("oldStudyScore") !== null) {
//         if (Math.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) < 10) {
//             micSteadyScoreCount++;
//             micFluctuatingScoreCount = 0;
//             console.log("mic steady score up");
//         }
//         if (Math.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) > 10) {
//             micSteadyScoreCount = 0;
//             console.log("mic steady score reset");
//         }
//         if (Math.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) > 30) {
//             micFluctuatingScoreCount++;
//             micSteadyScoreCount = 0;
//             console.log("mic fluct score up");
//         }
//         if (Math.abs(localStorage.getItem("oldAccelStudyScore") - accelStudyScore) < 10) {
//             accelSteadyScoreCount++;
//             accelFluctuatingScoreCount = 0;
//             console.log("accel study score up");

//         }
//         if (Math.abs(localStorage.getItem("oldAccelStudyScore") - accelStudyScore) > 30) {
//             accelFluctuatingScoreCount++;
//             accelSteadyScoreCount = 0;
//             console.log("accel fluct score up");

//         }
//     }

//     if (micSteadyScoreCount > 5) {
//         micSampleRate = decreaseSampleRate(micSampleRate);
//         micSteadyScoreCount = 0;
//     }
//     if (micFluctuatingScoreCount > 5) {
//         micSampleRate = increaseSampleRate(micSampleRate);
//         micFluctuatingScoreCount = 0;
//     }
//     if (accelSteadyScoreCount > 5) {
//         accelSampleRate = decreaseSampleRate(accelSampleRate);
//         accelSteadyScoreCount = 0;
//     }
//     if (accelFluctuatingScoreCount > 5) {
//         accelSampleRate = increaseSampleRate(accelSampleRate);
//         accelFluctuatingScoreCount = 0;
//     }



//     if (typeof(Storage) !== "undefined") {
//         localStorage.setItem("oldStudyScore", sessionStudyScore);
//         localStorage.setItem("oldMicStudyScore", micStudyScore);
//         localStorage.setItem("oldAccelStudyScore", accelStudyScore);

//     } else {
//         // Sorry! No Web Storage support..
//         console.log("No web storage support - oh dear.");
//     }

// }

function updateSampleRate(notStudyingBool, sensorSampleRate, storageVar, sensorName) {

    if (sensorName == "accelerometer") {
        if ((storageVar == "true" && notStudyingBool == "true") || (storageVar == "false" && notStudyingBool == "false")) {
            accelSteadyScoreCount++;
            accelFluctuatingScoreCount = 0;
            console.log(sensorName + " Steady Count Up, storageVar: " + storageVar + " ,notStudyingBool: " + notStudyingBool);
        }
        if ((storageVar == "true" && notStudyingBool == "false") || (storageVar == "false" && notStudyingBool == "true")) {
            accelFluctuatingScoreCount++;
            accelSteadyScoreCount = 0;
            console.log(sensorName + " Fluct Count Up, storageVar: " + storageVar + " ,notStudyingBool: " + notStudyingBool);

        }

        if (accelSteadyScoreCount > 5) { //make around 5 for actual use
            accelSteadyScoreCount = 0;
            accelSampleRate = decreaseSampleRate(sensorSampleRate);
            console.log("SampleRate Decreased");
            //restart that sensor
            restartAccelSensor(accelSampleRate);
        }
        if (accelFluctuatingScoreCount > 2) {
            accelFluctuatingScoreCount = 0;
            accelSampleRate = increaseSampleRate(sensorSampleRate);
            console.log("SampleRate Increased");
            //restart that sensor
            restartAccelSensor(accelSampleRate);
        }
    }

    if (sensorName == "microphone") {

        if ((storageVar == "true" && notStudyingBool == "true") || (storageVar == "false" && notStudyingBool == "false")) {
            micSteadyScoreCount++;
            micFluctuatingScoreCount = 0;
            console.log(sensorName + " Steady Count Up, storageVar: " + storageVar + " ,notStudyingBool: " + notStudyingBool);
        }
        if ((storageVar == "true" && notStudyingBool == "false") || (storageVar == "false" && notStudyingBool == "true")) {
            micFluctuatingScoreCount++;
            micSteadyScoreCount = 0;
            console.log(sensorName + " Fluct Count Up, storageVar: " + storageVar + " ,notStudyingBool: " + notStudyingBool);

        }
        if (micSteadyScoreCount > 5) {
            micSteadyScoreCount = 0;
            micSampleRate = decreaseSampleRate(sensorSampleRate);
            console.log("SampleRate Decreased for mic");
            //restart that sensor
            restartMicSensor(micSampleRate);

        }
        if (micFluctuatingScoreCount > 2) {
            micFluctuatingScoreCount = 0;
            micSampleRate = increaseSampleRate(sensorSampleRate);
            console.log("SampleRate Increased for mic");
            //restart that sensor
            restartMicSensor(micSampleRate);

        }
    }
}

// // function updateMicSampleRate(notStudyingBool, sensorSampleRate, storageVar, sensorName) {

//     if ((storageVar == "true" && notStudyingBool == "true") || (storageVar == "false" && notStudyingBool == "false")) {
//         sensorSteadyCount++;
//         sensorFluctuatingCount = 0;
//         console.log(sensorName + " Steady Count Up, storageVar: " + storageVar + " ,notStudyingBool: " + notStudyingBool);
//     }
//     if ((storageVar == "true" && notStudyingBool == "false") || (storageVar == "false" && notStudyingBool == "true")) {
//         sensorFluctuatingCount++;
//         sensorSteadyCount = 0;
//         console.log(sensorName + " Fluct Count Up, storageVar: " + storageVar + " ,notStudyingBool: " + notStudyingBool);

//     }

//     if (sensorName == "accelerometer") {
//         if (sensorSteadyCount > 2) { //make around 5 for actual use
//             sensorSteadyCount = 0;
//             accelSampleRate = decreaseSampleRate(sensorSampleRate);
//             console.log("SampleRate Decreased");
//             //restart that sensor
//             restartAccelSensor(accelSampleRate);
//         }
//         if (sensorFluctuatingCount > 2) {
//             sensorFluctuatingCount = 0;
//             accelSampleRate = increaseSampleRate(sensorSampleRate);
//             console.log("SampleRate Increased");
//             //restart that sensor
//             restartAccelSensor(accelSampleRate);

//         }
//     }

//     if (sensorName == "microphone") {
//         if (sensorSteadyCount > 15) {
//             sensorSteadyCount = 0;
//             micSampleRate = decreaseSampleRate(sensorSampleRate);
//             console.log("SampleRate Decreased for mic");
//             //restart that sensor
//             restartMicSensor(micSampleRate);

//         }
//         if (sensorFluctuatingCount > 10) {
//             sensorFluctuatingCount = 0;
//             micSampleRate = increaseSampleRate(sensorSampleRate);
//             console.log("SampleRate Increased for mic");
//             //restart that sensor
//             restartMicSensor(micSampleRate);

//         }
//     }
// }