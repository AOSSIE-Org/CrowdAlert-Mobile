import {
	LATEST_INCIDENT_ADDED,
	ALL_INCIDENTS,
	INCIDENTS_LOADING,
	USERS_INCIDENTS
} from '../actions/types';

const INITIAL_STATE = {
	all_incidents: null,
	loading: false,
	user_incidents: null
};

/**
 * Incident Reducer handling all types of incident being added.
 * Whenever a new incident gets added than the redux state gets updated.
 * @param  {JSON} state=INITIAL_STATE State to be maintained by this
 * reducer in the redux store.
 * @param  {JSON} action Tells the reducer to perform certain actions and make changes
 * @return {state} Based on action the function changes the state and rerenders
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case LATEST_INCIDENT_ADDED:
			return {
				...result
			};
		case ALL_INCIDENTS:
			return {
				...result,
				all_incidents: action.all_incidents
			};
		case INCIDENTS_LOADING:
			return {
				...result,
				loading: action.loading
			};
		case USERS_INCIDENTS:
			return {
				...result,
				user_incidents: action.user_incidents
			};
		default:
			return state;
	}
}
