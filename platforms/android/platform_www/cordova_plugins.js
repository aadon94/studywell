cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.lampa.startapp/www/startApp.js",
        "id": "com.lampa.startapp.startapp",
        "pluginId": "com.lampa.startapp",
        "merges": [
            "navigator.startApp"
        ]
    },
    {
        "file": "plugins/com.shukriadams.micVolume/www/micVolume.js",
        "id": "com.shukriadams.micVolume.MicVolume",
        "pluginId": "com.shukriadams.micVolume",
        "clobbers": [
            "window.micVolume"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
        "id": "cordova-plugin-device-motion.Acceleration",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
        "id": "cordova-plugin-device-motion.accelerometer",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "pluginId": "cordova-plugin-background-mode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "file": "plugins/at.gofg.sportscomputer.powermanagement/www/powermanagement.js",
        "id": "at.gofg.sportscomputer.powermanagement.device",
        "pluginId": "at.gofg.sportscomputer.powermanagement",
        "clobbers": [
            "window.powerManagement"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-core.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Core",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-util.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Util",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.lampa.startapp": "0.0.5",
    "com.shukriadams.micVolume": "0.1.0",
    "cordova-plugin-device-motion": "1.2.0",
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-plugin-dialogs": "1.2.0",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-background-mode": "0.6.5",
    "at.gofg.sportscomputer.powermanagement": "1.1.0",
    "cordova-plugin-app-event": "1.2.0",
    "de.appplant.cordova.plugin.local-notification": "0.8.4"
}
// BOTTOM OF METADATA
});