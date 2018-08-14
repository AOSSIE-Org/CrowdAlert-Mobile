## iOS installation (Xcode)

###### Need to compulsory have the MacOS environment for iOS development.

### Xcode

Make sure you have Xcode 9 or higher and the correct command line tool is specified.

### Pods Dependencies

If you don't have cocoa-pods installed,

```
$ sudo gem install cocoapods
```

Using Cocoa-pods install the pods.

```
$ cd ios && pod install && cd ..
```

### Running the iOS app

You can run it directly from within Xcode also.

OR

```
$ react-native run-ios
```

This will either open the emulator or the would install the app on your iPhone.

### Note: (Possible errors)

*   Incase you find an error related to **Fix Search Paths / Argument List Too Long** in iOS build process, you can fix it using [this PR change](https://github.com/react-native-community/react-native-google-signin/pull/333/files).
