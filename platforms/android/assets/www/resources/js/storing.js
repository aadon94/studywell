// JavaScript Document to handle storing files to local filesystem

function create () {
	$cordovaFile.createDir(cordova.file.externalRootDirectory, 'studywell/stored', false);
}

function check () {
	$cordovaFile.checkDir(cordova.file.externalRootDirectory, 'studywell/stored');
}