function createStudyScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount) {
    var numberArguments = arguments.length;

    micStudyScore = micNotStudying / micIntervalCount * 100;
    accelStudyScore = accelNotStudying / accelIntervalCount * 100;
    sessionStudyScore = (micStudyScore + accelStudyScore) / numberArguments;

    return sessionStudyScore;
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
