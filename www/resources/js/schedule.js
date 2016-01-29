// JavaScript Document

function init() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	//window.alert("tits");
;}

function openCalendar(){
			navigator.startApp.start("com.google.android.calendar", function(message) {  /* success */
		console.log(message); // => OK 
			}, 
		function(error) { /* error */
			console.log(error);
	});
}



//window.OpenApplication("com.google.android.calendar"); //opens google calendar

//var openFn = function() {
  // window.OpenApplication(app_package);
//};
//document.addEventListener('deviceready', openFn, false);