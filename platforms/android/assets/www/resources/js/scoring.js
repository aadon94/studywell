function createSessionScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount) {
    var numberArguments = arguments.length;

    micStudyScore = micNotStudying / micIntervalCount * 100;
    accelStudyScore = accelNotStudying / accelIntervalCount * 100;
    sessionStudyScore = (micStudyScore + accelStudyScore) / numberArguments;

    return sessionStudyScore;
}

function intervalStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount) {
    var numberArguments = arguments.length;

    micStudyScore = micNotStudying / micIntervalCount * 100;
    accelStudyScore = accelNotStudying / accelIntervalCount * 100;
    currentStudyScore = (micStudyScore + accelStudyScore) / numberArguments;

    if (localStorage.getItem("oldStudyScore") !== null) {
        if (Maths.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) < 10) {
            micSteadyScoreCount++;
            micFluctuatingScoreCount = 0;
        }
        if (Maths.abs(localStorage.getItem("oldMicStudyScore") - micStudyScore) > 30) {
            micFluctuaßßtingScoreCount++;
            micSteadyScoreCount = 0;
        }
        if (Maths.abs(localStorage.getItem("oldAccelStudyScore") - accelStudyScore) < 10) {
            accelSteadyScoreCount++;
            accelFluctuatingScoreCount = 0;
        }
        if (Maths.abs(localStorage.getItem("oldAccelStudyScore") - accelStudyScore) > 30) {
           	accelFluctuatingScoreCount++;
            accelSteadyScoreCount = 0;
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
        localStorage.setItem("oldStudyScore", currentStudyScore);
        localStorage.setItem("oldMicStudyScore", micStudyScore);
        localStorage.setItem("oldAccelStudyScore", accelStudyScore);

    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage support - oh dear.");
    }

    return currentStudyScore;
}




function getSessionStudyScore() {
    console.log("Score for this session is: " + sessionStudyScore);
}