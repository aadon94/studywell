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

        showSelectedSettings();

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

//change the default shown settings to the ones the user has selected previously.
function showSelectedSettings() {
    document.getElementById("userIDname").innerHTML = getUserID();

    if (localStorage.getItem("distractedRemindBool") != null) {

        if (localStorage.getItem("distractedRemindBool") == "true") {
            document.getElementById("distractOn").checked = true;
            document.getElementById("distractOff").checked = false;
        }
        if (localStorage.getItem("distractedRemindBool") == "false") {
            document.getElementById("distractOn").checked = false;
            document.getElementById("distractOff").checked = true;

        }
    }

    if (localStorage.getItem("breakNotifBool") != null) {

        if (localStorage.getItem("breakNotifBool") == "true") {
            document.getElementById("breakOn").checked = true;
            document.getElementById("breakOff").checked = false;
        }
        if (localStorage.getItem("breakNotifBool") == "false") {
            document.getElementById("breakOn").checked = false;
            document.getElementById("breakOff").checked = true;

        }
    }

    if (localStorage.getItem("optimalStudyDuration") != null) {

        if (localStorage.getItem("optimalStudyDuration") == ((20 * 60) * 1000)) {
            document.getElementById("20").selected = true;
        } else if (localStorage.getItem("optimalStudyDuration") == ((30 * 60) * 1000)) {
            document.getElementById("30").selected = true;
        } else if (localStorage.getItem("optimalStudyDuration") == ((40 * 60) * 1000)) {
            document.getElementById("40").selected = true;
        } else if (localStorage.getItem("optimalStudyDuration") == ((50 * 60) * 1000)) {
            document.getElementById("50").selected = true;
        } else if (localStorage.getItem("optimalStudyDuration") == ((60 * 60) * 1000)) {
            document.getElementById("60").selected = true;
        }

    }
}