cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/at.gofg.sportscomputer.powermanagement/www/powermanagement.js",
        "id": "at.gofg.sportscomputer.powermanagement.device",
        "clobbers": [
            "window.powerManagement"
        ]
    },
    {
        "file": "plugins/com.lampa.startapp/www/startApp.js",
        "id": "com.lampa.startapp.startapp",
        "merges": [
            "navigator.startApp"
        ]
    },
    {
        "file": "plugins/com.shukriadams.micVolume/www/micVolume.js",
        "id": "com.shukriadams.micVolume.MicVolume",
        "clobbers": [
            "window.micVolume"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
        "id": "cordova-plugin-device-motion.Acceleration",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
        "id": "cordova-plugin-device-motion.accelerometer",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-core.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Core",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-util.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Util",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-tests/tests.js",
        "id": "cordova-plugin-device-tests.tests"
    },
    {
        "file": "plugins/cordova-plugin-device-motion-tests/tests.js",
        "id": "cordova-plugin-device-motion-tests.tests"
    },
    {
        "file": "plugins/cordova-plugin-test-framework/www/tests.js",
        "id": "cordova-plugin-test-framework.cdvtests"
    },
    {
        "file": "plugins/cordova-plugin-test-framework/www/jasmine_helpers.js",
        "id": "cordova-plugin-test-framework.jasmine_helpers"
    },
    {
        "file": "plugins/cordova-plugin-test-framework/www/medic.js",
        "id": "cordova-plugin-test-framework.medic"
    },
    {
        "file": "plugins/cordova-plugin-test-framework/www/main.js",
        "id": "cordova-plugin-test-framework.main"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "at.gofg.sportscomputer.powermanagement": "1.1.0",
    "com.lampa.startapp": "0.0.5",
    "com.shukriadams.micVolume": "0.1.0",
    "cordova-plugin-app-event": "1.2.0",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-background-mode": "0.6.5",
    "cordova-plugin-device-motion": "1.2.0",
    "cordova-plugin-dialogs": "1.2.0",
    "cordova-plugin-whitelist": "1.2.1",
    "de.appplant.cordova.plugin.local-notification": "0.8.4",
    "cordova-plugin-device-tests": "1.1.2-dev",
    "cordova-plugin-device-motion-tests": "1.2.1-dev",
    "cordova-plugin-test-framework": "1.1.2-dev"
};
// BOTTOM OF METADATA
});