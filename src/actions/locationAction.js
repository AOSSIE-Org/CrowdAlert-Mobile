import { LOCATION, CURR_LOCATION } from './types';
import { handleError } from './loginAction';
/**
 * This function is called to update the location co-ordinates to user's current location
 * by communicating changes to redux via set_geoLocation.
 * @return dispatches location updates to set_geoLocation.
 */
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
				dispatch(handleError(error));
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
/**
 * This function is called to update the location co-ordinates of
 * custom location by communicating changes to redux via set_location.
 * @param {float} latitude  The latitude of the location entered by the user in the search bar.
 * @param {float} longitude The longitude of the location entered by the user in the search bar.
 * @param {string} name      Name of the location entered by the user in the search bar.
 */
export const SetLocationOnCustomSearch = (latitude, longitude, name) => {
	return dispatch => {
		let data = {};
		data.latitude = latitude;
		data.longitude = longitude;
		dispatch(set_location(data, name));
	};
};
/**
 * Updtes the custom location co-ordinates .
 * @param {json} location The json object containing latitude and longitude of a location.
 * @param {string} name     [description]
 */
function set_location(location, name) {
	return {
		type: LOCATION,
		coordinates: location,
		location_name: name
	};
}
/**
 * Updates the current location co-ordinates.
 * @param {json} location json object containing latitude and longitude
 */
function set_geoLocation(location) {
	return {
		type: CURR_LOCATION,
		coordinates: location
	};
}
