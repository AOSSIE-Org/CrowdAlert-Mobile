import { ERROR_HANDLING } from '../actions/types';

const INITIAL_STATE = {
	error: null
};
/**
 * Error Reducer handling all types of error states throughout the app.
 * @param  {JSON} state=INITIAL_STATE State to be maintained by this
 * reducer in the redux store.
 * @param  {JSON} action Tells the reducer to perform certain actions and make changes
 * @return {state} Based on action the function changes the state and rerenders
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case ERROR_HANDLING:
			return {
				...result,
				error: action.error
			};
		default:
			return state;
	}
}
