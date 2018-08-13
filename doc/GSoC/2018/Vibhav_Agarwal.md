# CrowdAlert-Mobile app

Crowd Alert is a crowdsourced hybrid mobile application built using React Native for reporting and viewing incidents around the globe. The app helps the user to report an incident conveniently without any hassle and all the incidents reported across the globe can be viewed on Google maps.

### Link to project’s repository

https://gitlab.com/aossie/CrowdAlert-Mobile

### Link to mobile app

https://drive.google.com/open?id=1USlsw5NkQ-5Ud3c0nkOLunT2NXO74b9O

## Goals

#### Achieved

*   Shifted the old Expo based [CrowdAlert](https://gitlab.com/aossie/CrowdAlert) to native code React Native app.
*   Added Redux architecture for state management.
*   Added more signup options like Google login and email based login.
*   Added Push Notifications for the user when near an incident.
*   Added incident sharing option.
*   Clustering of incidents upon zooming.
*   Added nearby emergency places like hospitals and police stations.
*   Added CI pipeline for automating the APK build process for Android while development.
*   Edit feature for the profile and user submitted incidents.
*   Settings option for modifying the emergency radius, notifications timeout etc.
*   Modal for filtering incidents on the map.
*   Global feed to show all the visible incidents from around the globe.
*   Improved the UI/UX of the app in terms of styling and other things.
*   Added an app tour consisting of introductory slides to guide the first time user.

#### Pending

*   Unit tests for the app using Jest.
*   Bug fixes in iOS app related to getting location and various styling issues.

## Contributions

*   Added Redux architecture and integrated it with all the screens. Used Redux-Promise to add offline support, login storage and quick retrieval of things.
*   Contributed in shifting the Map screens and Login screens from the old Expo based CrowdAlert.
*   Added custom relocation button with animations for the map marker while navigating to different locations.
*   Setup CI pipeline for automating the testing and APK building for android. Made my own [custom docker image](https://hub.docker.com/r/vibhavagarwal5/react-native-ci/) over [motorica-org/gitlab-ci-android](https://gitlab.com/motorica-org/gitlab-ci-android).
*   Added Profile screen which shows the user information along with his submitted incidents.
*   Added Delete and Edit feature for user submitted incidents.
*   Added logout feature.
*   Added Edit feature for the user profile where he/she can change the photo or change other details and add emergency contacts etc.
*   Used [react-native-google-places-autocomplete](https://github.com/FaridSafi/react-native-google-places-autocomplete) as the search bar in the maps screen for navigating to a custom location. <br> Due to lack of a clear button in the search bar, I had to copy the implementation locally in `src/components/googleSearchBar.js` and make the necessary changes for adding the clear button.
*   Designed the new app flow with Drawer navigation, showing the Profile screen(Dashboard) first and navigating accordingly using the side drawer.
*   Added global feed using [react-native-timeline-listview](https://github.com/thegamenicorus/react-native-timeline-listview) for all the incidents from around the globe.
*   Added local Push Notifications using [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) on the map screen to alert the user when he/she is near some incident.
*   Refactored the code for getting nearby emergency places and integrated redux with it.
*   Contributed in clustering of the markers on the map and fixed the related bugs.
*   Designed the screens and styled them using a common [color scheme](https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=63a4ff&secondary.color=00897B) and taking inspirations from [Behance](www.behance.net). Used [native-base](https://docs.nativebase.io/Components.html#Components) for styling the components.
*   Fixed the iOS dependencies and made the iOS app working. Due to lack of time, could not fix all the bugs and the styling issues.
*   Fixed all major bugs reported in the android apk and made the app production ready.
*   Added the app icon and changed various incident marker icons.
*   Added introductory slides as app tour for the first time users showing the main features of the app and a bit of how to use those.

## Other Contributions

*   Contributed to [FaridSafi/react-native-google-places-autocomplete](https://github.com/FaridSafi/react-native-google-places-autocomplete) and sent a Pull Request to it for adding a clear button in their textInput. <Br> URL: [https://github.com/FaridSafi/react-native-google-places-autocomplete/pull/330](https://github.com/FaridSafi/react-native-google-places-autocomplete/pull/330)

## Future Scope of the project

*   The CI pipeline can be made more efficient and automated in terms of building and deploying the app on Play Store.
*   Unit Testing via Jest and Integration Testing (cavy).
*   More features can be added in the future say adding comments on the incidents, spam detection on them etc.
*   The CrowdAlert-Web and Mobile should be more closely integrated in the future.

## Merge Requests

Most of the Merge Requests are a combined effort of Rishabh and mine.

*   [Added login functionality + redux](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/1)
*   [Google login & Styling improved](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/3)
*   [Documentation for the first 2 weeks](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/5)
*   [Added Map screen](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/9)
*   [CI added with env keys](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/10)
*   [Profile Screen with individual Incidents Screen](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/13)
*   [Added Delete/Edit functionality for Incidents, Nearby Hospitals/Police Stations](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/14)
*   [Push Notifications with settings option and Share functionality](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/15)
*   [Clustering and Global Feed](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/16)
*   [Styling the screens and improving UI/UX](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/17)
*   [iOS Dependencies added](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/18)
*   [Various bug fixes and cleanup](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/21)
*   [Documentation, Readme update and Introductory slides added](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/22)
