
// JavaScript Document to handle microphone sensor
var micStatusOn = false;
var noisy = false;
var noisyCount = 0;
var vol;

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

	micVolume.read(function(reading){
    	console.log(reading.volume);
    	vol = reading.volume;
		}, errorCallback);

	if (vol > 6) {
		noisyCount++;
	}
	if (noisyCount > 10) {
		noisy = true;
		stopMicInterval();
		noisyBackground();
	}	
}


//Do things on an interval***********
function micInterval() {
	if (micStatusOn == false) {
		micOn();
	}
	micIntervalCount++;
	noisyCount = 0;
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