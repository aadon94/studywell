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
}