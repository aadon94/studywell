function takeABreakNotif() {
    cordova.plugins.notification.local.schedule({
        id: 10,
        title: "Sorry to interrupt, but...",
        text: "Seems like you've been studying well for quite some time now. We recommend a 10 minute break for optimum brain functionality!"
    });
}


cordova.plugins.notification.local.on("click", function(notification) {
    if (notification.id == 10) {
        takeABreakAlert();
    }
});