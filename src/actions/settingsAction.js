import {
	SET_EMERGENCY_RADIUS,
	SET_NOTIFICATION_RADIUS,
	SET_NOTIFICATION_TIMEOUT,
	ENABLE_NOTIFICATIONS
} from './types';
import { handleError } from './errorAction';

/**
 * This function is called to update the location co-ordinates of
 * custom location by communicating changes to redux via set_location.
 * @param {float} latitude  The latitude of the location entered by the user in the search bar.
 * @param {float} longitude The longitude of the location entered by the user in the search bar.
 * @param {string} name     Name of the location entered by the user in the search bar.
 */
export const set_emergency_radius = radius => {
	return dispatch => {
		dispatch(set_emergency_radiusHelper(radius));
	};
};

/**
 * This function is called to update the location co-ordinates of
 * custom location by communicating changes to redux via set_location.
 * @param {float} latitude  The latitude of the location entered by the user in the search bar.
 * @param {float} longitude The longitude of the location entered by the user in the search bar.
 * @param {string} name     Name of the location entered by the user in the search bar.
 */
export const set_notifications_radius = radius => {
	return dispatch => {
		dispatch(set_notifications_radiusHelper(radius));
	};
};

/**
 * This function is called to update the location co-ordinates of
 * custom location by communicating changes to redux via set_location.
 * @param {float} latitude  The latitude of the location entered by the user in the search bar.
 * @param {float} longitude The longitude of the location entered by the user in the search bar.
 * @param {string} name     Name of the location entered by the user in the search bar.
 */
export const set_notifications_timeout = timeout => {
	return dispatch => {
		dispatch(set_notifications_timeoutHelper(timeout));
	};
};

/**
 * This function is called to update the location co-ordinates of
 * custom location by communicating changes to redux via set_location.
 * @param {float} latitude  The latitude of the location entered by the user in the search bar.
 * @param {float} longitude The longitude of the location entered by the user in the search bar.
 * @param {string} name     Name of the location entered by the user in the search bar.
 */
export const set_notifications = bool => {
	return dispatch => {
		dispatch(set_notificationsHelper(bool));
	};
};

/**
 * Updates the custom location co-ordinates .
 * @param {JSON} location The json object containing latitude and longitude of a location.
 * @param {string} name
 */
function set_notificationsHelper(bool) {
	return {
		type: ENABLE_NOTIFICATIONS,
		enable_notifications: bool
	};
}

/**
 * Updates the custom location co-ordinates .
 * @param {JSON} location The json object containing latitude and longitude of a location.
 * @param {string} name
 */
function set_emergency_radiusHelper(radius) {
	return {
		type: SET_EMERGENCY_RADIUS,
		emergency_radius: radius
	};
}

/**
 * Updates the custom location co-ordinates .
 * @param {JSON} location The json object containing latitude and longitude of a location.
 * @param {string} name
 */
function set_notifications_radiusHelper(radius) {
	return {
		type: SET_NOTIFICATION_RADIUS,
		notification_min_radius: radius
	};
}

/**
 * Updates the custom location co-ordinates .
 * @param {JSON} location The json object containing latitude and longitude of a location.
 * @param {string} name
 */
function set_notifications_timeoutHelper(timeout) {
	return {
		type: SET_NOTIFICATION_TIMEOUT,
		notification_timeout: timeout
	};
}
