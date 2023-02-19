Run npx react-native run-android

# TROUBLESHOOTING:

If error with bluetooth, likely need to enable app permissions on Android / iOS while it's running, then retry.

Also ensure HC05 device paired first on device (manually enter pin), then use app.

If error with build, ensure ANDROID_HOME path is added, and `adb devices` lists a valid device.



NOTE: likely don't need template under src.
