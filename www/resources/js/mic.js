
// JavaScript Document to handle microphone sensor

function successCallback() {
  console.log('Microphone is now on.')
}

function errorCallback(error) {
  console.log("Microphone error: " + error);
}

function successCallbackOff() {
  console.log('Microphone is now off.');
}


function micOn() {
	micVolume.start(successCallback, errorCallback);
}

function micOff() {
	micVolume.stop(successCallbackOff, errorCallback);
}

function readMic() {
	micVolume.read(function(reading){
    console.log(reading.volume);
}, errorCallback);
}
