import { INCIDENT } from '../actions/types';
const INITIAL_STATE = {
	incident: {
		title: null,
		details: null,
		visible: true,
		category: null,
		latitude: null,
		longitude: null,
		email: null,
		location_name: null,
		timestamp: null,
		upvotes: 0,
		image: null
	}
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
	console.log('AT REDUX');
	console.log(action.incident);
	let result = Object.assign({}, state);
	switch (action.type) {
		case INCIDENT:
			return {
				incident: action.incident
			};
		default:
			return state;
	}
}
