function createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount) {
    var numberArguments = arguments.length / 2;
    appMessage = "";

    micStudyScore = micNotStudying / micIntervalCount * 100;
    accelStudyScore = accelNotStudying / accelIntervalCount * 100;
    sessionStudyScore = (micStudyScore + accelStudyScore) / numberArguments;

    if (micStudyScore > 75) {
        appMessage = "There seemed to be a lot of surrounding noise during this session.";
    } else if (micStudyScore > 50) {
        appMessage = "There seemed to be quite a bit of surrounding noise during this session.";
    } else if (micStudyScore > 25) {
        appMessage = "There was a moderate amount of surrounding noise during this session.";
    } else if (micStudyScore < 25) {
        appMessage = "There was very little surrounding noise during this session.";
    }

    if (accelStudyScore > 75) {
        appMessage += " There was also a lot of phone movement during this session.";
    } else if (accelStudyScore > 50) {
        appMessage += " There also seemed to be quite a bit of phone movement - were you fiddling with your phone a lot?";
    } else if (accelStudyScore > 25) {
        appMessage += " There seemed to be a moderate amount of phone movement, maybe you were fiddling with your phone every now and then?";
    } else if (accelStudyScore < 25) {
        appMessage += " There was very little phone fiddling, good job on that account!";
    }

    if (sessionStudyScore < 20) {
        appMessage = "An all round great session, well done!";
    }

    return (100 - Math.round(sessionStudyScore));

}

function sensorScore(sensorNSCount, sensorIntervalCount) {
    sensorScore = sensorNSCount / sensorIntervalCount * 100;
    return sensorScore;
}

function objectSensorScore(sensor) {
    sensorScore = (sensor.session.intervalNSCount / sensor.session.intervalNSCount) * 100;
    return sensorScore;
}



function getSessionStudyScore() {
    console.log("Score for this session is: " + sessionStudyScore);
}

function createIntervalStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount) {
    var numberArguments = arguments.length;

    micIntervalStudyScore = micNotStudying / micIntervalCount * 100;
    accelIntervalStudyScore = accelNotStudying / accelIntervalCount * 100;
    intervalStudyScore = (micIntervalStudyScore + accelIntervalStudyScore) / numberArguments;

    return intervalStudyScore;
}