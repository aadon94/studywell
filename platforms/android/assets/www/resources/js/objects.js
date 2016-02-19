
//Object for handling sensors
function sensor(name, sampleRate, session) {
	this.name = name;
	this.sampleRate = sampleRate;
	this.session = session;
}

//Object for handling sessions
function session(intervalCount, intervalNSCount, duration, score) {
	this.intervalCount = intervalCount;
	this.intervalNSCount = intervalNSCount;
	this.duration = duration;
	this.score = score;
}