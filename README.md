# CrowdAlert

A crowdsourced hybrid mobile application using React Native for reporting and viewing incidents around the globe.

## Install basic Dependencies

This project is built using React Native. You will need the following dependencies.

### Node and Watchman

Install Node and Watchman using Homebrew.

```
$ brew install node
$ brew install watchman
```

### React Native CLI

Install React Native CLI globally.

```
$ npm install -g react-native-cli
```

### NPM Dependencies

Install package-dependencies using NPM

```
$ npm install
```

## Install Other Dependencies

### Android (Android Studio)

#### Update your Android SDK location

Add android/local.properties file

```
sdk.dir = <your android sdk location>
```

#### Running the App

```
$ react-native run-android
```

### iOS (Xcode)

###### Need to compulsory have the MacOS environment for iOS development.

#### Xcode

Make sure you have Xcode 9 or higher and the correct command line tool is specified.

#### Pods Dependencies

If you don't have cocoa-pods installed,

```
$ sudo gem install cocoapods
```

Using Cocoa-pods install the pods.

```
$ cd ios && pod install && cd ..
```

#### Running the iOS app

You can run it directly from within Xcode also.

OR

```
$ react-native run-ios
```

This will either open the emulator or the would install the app on your iPhone.

## Keys Setup

Follow the link for setting up the keys for the project: [Keys installation](docs/Contributions.md)
