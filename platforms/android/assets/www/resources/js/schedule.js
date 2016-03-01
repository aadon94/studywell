var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {


    },
};

app.initialize();



function openCalendar() {
    navigator.startApp.start("com.google.android.calendar", function(message) { /* success */
            console.log(message); // => OK 
        },
        function(error) { /* error */
            console.log(error);
        });
}