import {
	EMERGENCY_PLACES_HOSPITALS,
	EMERGENCY_PLACES_POLICE_STATIONS,
	EMERGENCY_PLACES_LOADING
} from '../actions/types';

const INITIAL_STATE = {
	loading: true,
	hospitals: null,
	policeStations: null
};

/**
 * It handles all the changes when nearby hospitals and police stations are fetched.
 * It updates the hospitals and police stations based on the type specified.
 * @param  {JSON} [state=INITIAL_STATE] the initial state
 * @param  {JSON} perform specified action based on the type specified.
 * @return Updates state in redux
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case EMERGENCY_PLACES_HOSPITALS:
			return {
				...result,
				hospitals: action.hospitals
			};
		case EMERGENCY_PLACES_POLICE_STATIONS:
			return {
				...result,
				policeStations: action.policeStations
			};
		case EMERGENCY_PLACES_LOADING:
			return {
				...result,
				loading: action.emergencyPlacesLoading
			};
		default:
			return state;
	}
}
