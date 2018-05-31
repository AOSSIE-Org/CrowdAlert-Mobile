import { LOCATION } from './types';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import {ToastAndroid,ActivityIndicator} from 'react-native';
import RNGooglePlaces from 'react-native-google-places'
export const getlocation = () => {
  console.log('here');
	return dispatch => {
    this.watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let data = {}
          latitude : parseFloat(position.coords.latitude);
          longitude : parseFloat(position.coords.longitude);
          data.latitude = latitude;
          data.longitude = longitude;
          error: null;
          dispatch(set_location(data, place.name));
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }
}
export const openSearch = () => {
	return dispatch => {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
    console.log(place);
    let data = {};
    data.latitude = place.latitude;
    data.longitude = place.longitude;
    dispatch(set_location(data, place.name));
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
	};
};
function set_location(json, name) {
    return {
        type: LOCATION,
        location: json,
        location_name: name
    };
}
