var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.getElementById("userIDname").innerHTML = getUserID();

        recordingNoiseLevel = false;

        $('.leave-settings').click(function(e) {
            if (recordingNoiseLevel) {
                e.preventDefault();
                stillRecordingNoiseLevelWarning();
            }
        });
        $('.same-page').click(function(e) {
            if (recordingNoiseLevel) {
                e.preventDefault();
            }
        });


    },
};

app.initialize();