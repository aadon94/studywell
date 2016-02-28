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


    },
};

app.initialize();

function initialiseTimer() {
    h1 = document.getElementsByTagName('h1')[0];
    seconds = 0;
    minutes = 0;
    hours = 0;
    //t;
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}


/* Clear button */
function clearTimer() {
    h1.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
}

function startTimer() {
    t = setTimeout(add, 1000);
}

function stopTimer() {
    clearTimeout(t);
}


function getDurationTimer() {
    var duration;
    if (hours == 1) {
        duration = hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
    } else if (hours > 1) {
        duration = hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
    } else if (minutes == 1) {
        duration = minutes + " minute and " + seconds + " seconds";
    } else if (minutes > 1) {
        duration = minutes + " minutes and " + seconds + " seconds";
    } else {
        duration = seconds + " seconds";
    }
    return duration;

}