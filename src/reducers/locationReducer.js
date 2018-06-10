import { LOCATION, CURR_LOCATION } from '../actions/types';

const INITIAL_STATE = {
	coordinates: {
		latitude: 30,
		longitude: 40
	},
	curr_coordinates: {
		latitude: 30,
		longitude: 40
	},
	location_name: null
};
/**
 * Location Reducer handling all types of location change states.
 * This would maintain the current locations, locations from the search
 * and their names in the Redux store.
 * @param  {json} [state=INITIAL_STATE] Assigns the objects below to initial state.
 * @param  {String} action Determines which case to execute from below.
 * @return  Updates the location co-ordinates in redux.
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case CURR_LOCATION:
			return {
				...result,
				curr_coordinates: action.curr_coordinates
			};
		case LOCATION:
			return {
				...result,
				coordinates: action.coordinates,
				location_name: action.location_name
			};
		default:
			return state;
	}
}
