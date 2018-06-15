# CrowdAlert

A crowdsourced hybrid mobile application using React Native for reporting and viewing incidents around the globe.

## Install basic Dependencies

This project is built using React Native. You will need the following dependencies.

### Node and Watchman

Install Node and Watchman using Homebrew.

```
brew install node
brew install watchman
```

### React Native CLI

Install React Native CLI globally.

```
npm install -g react-native-cli
```

### NPM Dependencies

Install package-dependencies using NPM

```
npm install
```

## Setting up the keys

### On your local machine

Create a `.env` file add your keys like following:

```
FB_KEY=
GOOGLE_MAPS_KEY=

GOOGLE_WEB_CLIENT_ID=
GOOGLE_SERVICES_OAUTH_CLIENT_TYPE1=
GOOGLE_SERVICES_OAUTH_CLIENT_TYPE1_CERTIFICATE_HASH=
API_KEY_GOOGLE_SERVICE=
GOOGLE_SERVICES_SERVICES_CLIENT_TYPE2=
```

After adding this `.env` file run:

```
npm install -g envsub
bash createKeys.sh
```

This will sync your keys with the project.

You will find these keys in the following files,

*   `android/app/src/main/res/values/strings.xml`
*   `src/components/homeLogin.js`
*   `android/app/google-services.json.template` >> `android/app/google-services.json`

### **_Note:_**

*   Make sure that when you download your `google-services.json` file, you rename it to `google-services.json.template` with the proper env tags. Check the current `android/app/google-services.json.template` for more help.

*   Whenever you are starting on this for the first time ensure that when u download your `google-services.json` file, its in the same format with the `google-services.json.template` file. Otherwise change the `.template` file according to the lastest file.

*   Ensure that before you run `react-native run-android` or `react-native run-ios` or `any other build command`, you should setup your environment keys using the above method, otherwise your build won't work.

### On your Forked repository for CI pipeline

Add the above keys with the same name in the secret variables section in the **Settings -> CI/CD -> Variables** section of your forked repository. <br>
Example:
![alt text](CI CD variables settings.png)

## Install Other Dependencies

### Android (Android Studio)

#### Update your Android SDK location

Add android/local.properties file

```
sdk.dir = <your android sdk location>
```

#### Running the App

```
react-native run-android
```

### iOS (Xcode)

#### Xcode

Make sure you have Xcode 8 or higher and the correct command line tool is specified

#### Pods Dependencies

Install pods using cocoa-pods

```
cd ios
pod install
```

#### Running the App

```
cd <project-dir>
react-native run-ios
```

You can also run it directly from within Xcode or Nuclide.
