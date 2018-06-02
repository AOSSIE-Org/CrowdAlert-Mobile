import { LOCATION, CURR_LOCATION } from "../actions/types";
/**
 * Defination of initial state for location object.
 * @type {json}
 */
const INITIAL_STATE = {
	coordinates: {
		latitude: 30,
		longitude: 40
	},
	location_name: "Search"
};
/**
 * [description]
 * @param  {json} [state=INITIAL_STATE] 	 Assigns the objects below to initial state.
 * @param  {String} action                Determines which case to execute from below.
 * @return  Updates the location co-ordinates in redux.
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case CURR_LOCATION:
			return {
				coordinates: action.coordinates
			};
		case LOCATION:
			return {
				coordinates: action.coordinates,
				location_name: action.location_name
			};
			console.log(coordinates);
			console.log(location_name);
		default:
			return state;
	}
}
