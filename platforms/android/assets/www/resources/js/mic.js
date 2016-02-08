
// JavaScript Document to handle microphone sensor
var micStatusOn = false;
var noisy = false;
var noisyCount = 0;
var vol;
var ambientNoiseLevel = 6;

function successCallback() {
  console.log('Microphone is now on.')
  micStatusOn = true;
}

function errorCallback(error) {
  console.log("Microphone error: " + error);
}

function successCallbackOff() {
  console.log('Microphone is now off.');
  micStatusOn = false;
}



function micOn() {
	if (micStatusOn != true) {
		micVolume.start(successCallback, errorCallback);
		micStatusOn = true;
	}
	else {
		console.log('Microphone is already on.');
	}
}

function micOff() {
	if (micStatusOn == true) {
		micVolume.stop(successCallbackOff, errorCallback);
	}
	else {
		console.log('Microphone is already off.');
	}
}

function readMic(reading) {
	if (micStatusOn == false) {
		console.log('Microphone was not on - turning on now.');
		micOn();
	}

	micCount++;
	micVolume.read(function(reading){
    	console.log(reading.volume);
    	vol = reading.volume;
    	totalVol = totalVol + vol;
		}, errorCallback);

	averageVol = totalVol/micCount;
	if (averageVol > (ambientNoiseLevel + 10) && micCount > 10) {
		noisyBackground();
		noiseLevel = "vhigh";
	}
	else if (averageVol > (ambientNoiseLevel + 5) && micCount > 10) {
		noisyBackground();
		noiseLevel = "high";
	}
	else if (averageVol > ambientNoiseLevel && micCount > 10) {
		noisyBackground();
		noiseLevel = "medium";
	}

	else
	{
		noiseLevel = "low";
	}


}


//Do things on an interval***********
function micInterval() {
	if (micStatusOn == false) {
		micOn();
	}
	micIntervalCount++;
	noisyCount = 0;
	micCount = 0;
	totalVol = 0;
	micSensor = setInterval(readMic, 333); //measure values every x seconds
	setTimeout(stopMicInterval, 10000); //stop reading after x seconds
}

function stopMicInterval() {
	clearInterval(micSensor);
	clearTimeout(micSensor);
	clearTimeout(stopMicInterval);
	micOff();
}

function noisyBackground() {
	console.log('It is noisy!');
	micNotStudying++;
}

//functions for testing
function getAverageVolume() {
	console.log('Average Volume: ' +averageVol);
}