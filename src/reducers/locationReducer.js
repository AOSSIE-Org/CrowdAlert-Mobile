import { LOCATION, CURR_LOCATION } from '../actions/types';

const INITIAL_STATE = {
	coordinates: {
		latitude: 30,
		longitude: 40
	},
	location_name: 'Search'
};

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
		default:
			return state;
	}
}
