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
    accelSampleRate = 30000;
    micSampleRate = 30000;
    micSteadyScoreCount = 0;
    micFluctuatingScoreCount = 0;
    accelSteadyScoreCount = 0;
    accelFluctuatingScoreCount = 0;
    sensorSteadyCount = 0;
    sensorFluctuatingCount = 0;

}


function updateSamplingRate() {

    createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);

    if (localStorage.getItem("oldStudyScore") !== null) {
        if (Math.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) < 10) {
            micSteadyScoreCount++;
            micFluctuatingScoreCount = 0;
            console.log("mic steady score up");
        }
        if (Math.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) > 10) {
            micSteadyScoreCount = 0;
            console.log("mic steady score reset");
        }
        if (Math.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) > 30) {
            micFluctuatingScoreCount++;
            micSteadyScoreCount = 0;
            console.log("mic fluct score up");
        }
        if (Math.abs(localStorage.getItem("oldAccelStudyScore") - accelStudyScore) < 10) {
            accelSteadyScoreCount++;
            accelFluctuatingScoreCount = 0;
            console.log("accel study score up");

        }
        if (Math.abs(localStorage.getItem("oldAccelStudyScore") - accelStudyScore) > 30) {
            accelFluctuatingScoreCount++;
            accelSteadyScoreCount = 0;
            console.log("accel fluct score up");

        }
    }

    if (micSteadyScoreCount > 5) {
        micSampleRate = decreaseSampleRate(micSampleRate);
        micSteadyScoreCount = 0;
    }
    if (micFluctuatingScoreCount > 5) {
        micSampleRate = increaseSampleRate(micSampleRate);
        micFluctuatingScoreCount = 0;
    }
    if (accelSteadyScoreCount > 5) {
        accelSampleRate = decreaseSampleRate(accelSampleRate);
        accelSteadyScoreCount = 0;
    }
    if (accelFluctuatingScoreCount > 5) {
        accelSampleRate = increaseSampleRate(accelSampleRate);
        accelFluctuatingScoreCount = 0;
    }



    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("oldStudyScore", sessionStudyScore);
        localStorage.setItem("oldMicStudyScore", micStudyScore);
        localStorage.setItem("oldAccelStudyScore", accelStudyScore);

    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage support - oh dear.");
    }

}

function updateSampleR(notStudyingBool, sensorSampleRate, storageVar) {
    if (storageVar != null) {
        if (storageVar == notStudyingBool) {
            sensorSteadyCount++;
            sensorFluctuatingCount = 0;
            console.log("Steady Count Up");
			console.log("Steady Count Up, storageVar: "+storageVar +" ,notStudyingBool: "+ notStudyingBool);
        }
        if (storageVar != notStudyingBool) {
            sensorFluctuatingCount++;
            sensorSteadyCount = 0;
            console.log("Fluct Count Up, storageVar: "+storageVar +" ,notStudyingBool: "+ notStudyingBool);

        }
    }
    if (sensorSteadyCount > 5) {
    	sensorSteadyCount = 0;
        sensorSampleRate = decreaseSampleRate(sensorSampleRate);
        console.log("SampleRate Decreased");

    }
    if (sensorFluctuatingCount > 2) {
    	sensorFluctuatingCount = 0;
        sensorSampleRate = increaseSampleRate(sensorSampleRate);
        console.log("SampleRate Increased");

    }
}

function updateSample(notStudying, sensorSampleRate) {
    if (notStudying === true) {
        sensorSampleRate = increaseSampleRate(sensorSampleRate);
    }
    if (notStudying === false) {
        sensorSampleRate = increaseSampleRate(sensorSampleRate);
    }
}