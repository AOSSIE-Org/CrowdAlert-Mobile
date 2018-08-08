## Rishabh Maheshwary | Crowd Alert Mobile
Crowd Alert is a cross platform app which displays and reports worldwide incidents across the globe. It helps a user to report an incident conveniently without any hassle. The calamities across the globe can be marked and viewed on google maps.
#### Vision
 Inevitably, incidents happen everywhere at any time. But “Right information delivered at right time” will help in rescuing lives and preventing disasters.  We  developed such a system which will work in emergency, and will record & report emergency in real time.

#### [Link to repository ](https://gitlab.com/aossie/CrowdAlert-Mobile)

#### [Link to mobile app ](https://drive.google.com/file/d/1O-XrKFTVrbMOdUXrR8DRF7lrmH2JVh6p/view?usp=sharing)

#### Features of the app

**Architecture**  
The app is built in react-native, which enables it to run both on android and ios.

**Firebase in the backend**  
Firebase is a real-time database that you can communicate with directly from the client. The moment you save your JSON data to Firebase, these changes are immediately sent to all clients, of web and mobile, who requested them. 
Our app uses firebase authentication services to login/signup users and its real-time database services for storing all the incident and user details.  

**Different login options**   
Apart from simple email signup we have also added facebook and google login support to make logging in easy for users.  

**User profile**   
It includes all the personal information related to user like name, phone,email, profile photo, etc . Users can edit this information.

**Global feed**  
It shows all the incidents in our app in the form of a list. The most recent incident is on the top of the list.  

**Google maps**  
It shows incident markers and emergency places(police stations and hospitals)  on the map. User can tap on the incident marker to view the details of that incident. By tapping on the emergency places marker one can navigate to that place. The map screen looks crowded because of all the above markers, to avoid that we have added clustering of markers on map screen.  

**Adding Incidents**  
We have implemented a form to submit images and description of the incidents.  
The incident than gets marked on the map based on the current location of the user. User can edit the details of incident later also.  

**Emergency places**  
Our app shows a list of hospitals and police stations near the user . By tapping on it google maps app will pop up by which they can navigate to those places.  

**Push notification**  
The user will get notified  if a new incident happens near the user. By tapping on the notification the crowd alert app will pop up and  that particular incident screen will be displayed.  

**Setting options**  
The user can adjust the notification settings like within what radius in kms. a user wants to get notified, what should be the time interval between successive notifications, user can turn the notifications off completely, etc.  

**Sharing**  
A user can share the incident online to other social networking platforms. Our app supports deep linking like we find on facebook and instagram. Basically by clicking on the shared url the crowd alert app will pop up and that particular incident screen will be displayed.  

**Navigating to nearby incidents**  
By tapping on the navigate option on incident screen a user can navigate to a nearby incident to help the people involved in emergency.  


###  My Contribution

[Integrated Firebase to app](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/1) |  [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/1/diffs?commit_id=51e40b68f17aa83c6c63e342f236fedbf6901417)	
[Added all login options](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/3) |  [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/1/diffs?commit_id=46b90e3b70d1635220f1c673b6c940d36bf65bb0)  
[Integrated google maps](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/9) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/9/diffs?commit_id=b2879011da43bda78fc01f4ed70dc2678dac8e5b)  
[Added prop-types to all props*](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/9) |  [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/9/diffs?commit_id=0e1d1e5ccb99b155eb3e0095f80ca84acd81653e)  
[Form for adding incidents](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/13) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/13/diffs?commit_id=360d75f802769cae31280a641be340fe0b22f3d4)  
[Filtering incidents on map screen](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/13) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/13/diffs?commit_id=360d75f802769cae31280a641be340fe0b22f3d4)  
[Added search bar on the map screen](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/9) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/9/diffs?commit_id=cd48911d79f60d8231c906fcbae2a59120e0cbe2)  
[Incident screen](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/13) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/13/diffs?commit_id=8c45b6f3e9fc85333519e2f2cdf9fd5484a452c4)  
[Emergency places near a user location](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/14) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/14/diffs?commit_id=03b537dd3f0067d3b688adbdf59e415853f03dae)  
[Added share functionality](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/15) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/15/diffs?commit_id=7caa4035f2c82013215acfdc02ab35de0fedc9ec)  
[Clustering of incidents on map*](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/16) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/16/diffs?commit_id=4510a9fd383373a1df09ff6707bc2fcc30caf9d6)  
[Improved UI/UX of the mobile app](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/17) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/17/diffs?commit_id=00faf60c14deba111130973719977004828bd977)  
[Testing](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/20) | [Commits](https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/20/diffs?commit_id=38a759996b5d6246a651755cb3e3a2fc07bd4a8d)  
[Documentation*]( https://gitlab.com/aossie/CrowdAlert-Mobile/merge_requests/22) | [Commits](https://gitlab.com/oo7rm/CrowdAlert-Mobile/commit/71a0f25cacea84788b7faf971a74f096737e3fca)  


*(tasks done by me and vibhav)
### Todos
- Testing of the app.
- Adding more media like videos of incidents and compress them to avoid memory leaks.
- Comments on incidents.


