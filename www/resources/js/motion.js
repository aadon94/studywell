function accelValues (x, y, z, time) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.time = time;
}

function onSuccessAcc(acceleration) {
    console.log('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
   // var currentAccelValues = new accelValues(acceleration.x, acceleration.y, acceleration.z, acceleration.timestamp);
    
	var moving = false;
	if (acceleration.x > 0.3 || acceleration.x < -0.3) {
		moving = true;
	}
	if (acceleration.y > 0.2 || acceleration.y < -0.2) {
		moving = true;
	}
	if (acceleration.z > 9.8 || acceleration.z < 9.3) {
		moving = true;
	}

    console.log(moving);
}

function onErrorAcc() {
    alert('Error: ' + error);
}

function readAccel() {
	navigator.accelerometer.getCurrentAcceleration(onSuccessAcc, onErrorAcc);

}

function accelInterval() {
	accelSensor = setInterval(readAccel, 1000); //measure values every x seconds
	setTimeout(stopAccelInterval, 10000); //stop reading after x seconds
}

function stopAccelInterval() {
	clearInterval(accelSensor);
}

function isDeviceMoving() {
	var moving = false;
	if (currentAccelValues.x > 0.3 || currentAccelValues.x < -0.3) {
		moving = true;
	}
	if (currentAccelValues.y > 0.2 || currentAccelValues.y < -0.2) {
		moving = true;
	}
	if (currentAccelValues.z > 9.8 || currentAccelValues.z < 9.3) {
		moving = true;
	}

	return moving;
}