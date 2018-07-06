import { SEARCH_LOCATION, CURR_LOCATION } from '../actions/types';

const INITIAL_STATE = {
	search_coordinates: {
		latitude: 30,
		longitude: 40,
		latitudeDelta: 0.0052,
		longitudeDelta: 0.0052
	},
	curr_coordinates: {
		latitude: 30,
		longitude: 40,
		latitudeDelta: 0.0052,
		longitudeDelta: 0.0052
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
				curr_coordinates: {
					...result.curr_coordinates,
					latitude: action.curr_coordinates.latitude,
					longitude: action.curr_coordinates.longitude
				}
			};
		case SEARCH_LOCATION:
			return {
				...result,
				search_coordinates: {
					...result.search_coordinates,
					latitude: action.search_coordinates.latitude,
					longitude: action.search_coordinates.longitude
				},
				location_name: action.location_name
			};
		default:
			return state;
	}
}
