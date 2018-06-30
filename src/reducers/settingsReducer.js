import {
	SET_EMERGENCY_RADIUS,
	SET_NOTIFICATION_RADIUS,
	SET_NOTIFICATION_TIMEOUT,
	TOGGLE_NOTIFICATIONS
} from '../actions/types';

const INITIAL_STATE = {
	emergency_radius: 1500,
	notification_min_radius: 2500,
	notification_timeout: 30,
	enable_notifications: true
};

/**
 * Settings Reducer handling all setting states.
 * This would maintain the state of various settings in the Redux store.
 * @param  {JSON} state=INITIAL_STATE State to be maintained by this
 * reducer in the redux store.
 * @param  {JSON} action Tells the reducer to perform certain actions and make changes
 * @return {state} Based on action the function changes the state and rerenders
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case SET_EMERGENCY_RADIUS:
			return {
				...result,
				emergency_radius: action.emergency_radius
			};
		case SET_NOTIFICATION_RADIUS:
			return {
				...result,
				notification_min_radius: action.notification_min_radius
			};
		case SET_NOTIFICATION_TIMEOUT:
			return {
				...result,
				notification_timeout: action.notification_timeout
			};
		case TOGGLE_NOTIFICATIONS:
			return {
				...result,
				enable_notifications: action.enable_notifications
			};
		default:
			return state;
	}
}
