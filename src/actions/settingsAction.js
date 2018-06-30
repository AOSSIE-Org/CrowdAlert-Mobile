import {
	SET_EMERGENCY_RADIUS,
	SET_NOTIFICATION_RADIUS,
	SET_NOTIFICATION_TIMEOUT,
	TOGGLE_NOTIFICATIONS
} from './types';
import { handleError } from './errorAction';

/**
 * Updates the emergency places radius(m) for the search
 * @param {Number} radius Radius to be updated to.
 */
export const set_emergency_radius = radius => {
	return dispatch => {
		dispatch(set_emergency_radiusHelper(radius));
	};
};

/**
 * Updates the notification's min trigger radius(m)
 * @param {Number} radius Radius to be updated to.
 */
export const set_notifications_radius = radius => {
	return dispatch => {
		dispatch(set_notifications_radiusHelper(radius));
	};
};

/**
 * Updates the notification's timeout time(min).
 * @param {Number} timeout Time to be updated in the timeout
 */
export const set_notifications_timeout = timeout => {
	return dispatch => {
		dispatch(set_notifications_timeoutHelper(timeout));
	};
};

/**
 * Toggles the notification's status ie to be displayed or not.
 * @param {Boolean} bool
 */
export const set_notifications = bool => {
	return dispatch => {
		dispatch(set_notificationsHelper(bool));
	};
};

/**
 * Updates the notification status to true/false in the store
 * @param {Boolean} bool
 */
function set_notificationsHelper(bool) {
	return {
		type: TOGGLE_NOTIFICATIONS,
		enable_notifications: bool
	};
}

/**
 * Updates the emergency places search radius in the store
 * @param {Number} radius
 */
function set_emergency_radiusHelper(radius) {
	return {
		type: SET_EMERGENCY_RADIUS,
		emergency_radius: radius
	};
}

/**
 * Updates the notifications trigger radius in the store
 * @param {Number} radius
 */
function set_notifications_radiusHelper(radius) {
	return {
		type: SET_NOTIFICATION_RADIUS,
		notification_min_radius: radius
	};
}

/**
 * Updates the notifications timeout trigger in the store
 * @param {Number} timeout
 */
function set_notifications_timeoutHelper(timeout) {
	return {
		type: SET_NOTIFICATION_TIMEOUT,
		notification_timeout: timeout
	};
}
