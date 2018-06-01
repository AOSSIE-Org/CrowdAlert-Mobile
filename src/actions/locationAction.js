import { LOCATION, CURR_LOCATION } from './types';
import RNGooglePlaces from 'react-native-google-places';
import { handleError } from './loginAction';

export const getLocation = () => {
	return dispatch => {
		navigator.geolocation.getCurrentPosition(
			position => {
				console.log(position);
				let data = {};
				data.latitude = parseFloat(position.coords.latitude);
				data.longitude = parseFloat(position.coords.longitude);
				console.log(data);
				dispatch(set_geoLocation(data));
			},
			error => {
				handleError(error);
				console.log(error.message);
			}
			// {
			// 	enableHighAccuracy: true,
			// 	timeout: 20000,
			// 	maximumAge: 1000,
			// 	distanceFilter: 10
			// }
		);
	};
};

export const openSearch = () => {
	return dispatch => {
		RNGooglePlaces.openAutocompleteModal()
			.then(place => {
				console.log(place);
				let data = {};
				data.latitude = place.latitude;
				data.longitude = place.longitude;
				dispatch(set_location(data, place.name));
			})
			.catch(error => {
				handleError(error);
				console.log(error.message);
			}); // error is a Javascript Error object
	};
};

function set_location(location, name) {
	return {
		type: LOCATION,
		coordinates: location,
		location_name: name
	};
}

function set_geoLocation(location) {
	return {
		type: CURR_LOCATION,
		coordinates: location
	};
}
