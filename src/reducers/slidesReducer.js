import { SHOW_INTRO } from '../actions/types';

const INITIAL_STATE = {
	show: true
};
/**
 * Slides Reducer handling the state of the introduction slides.
 * @param  {JSON} state=INITIAL_STATE State to be maintained by this
 * reducer in the redux store.
 * @param  {JSON} action Tells the reducer to perform certain actions and make changes
 * @return {state} Based on action the function changes the state and rerenders
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case SHOW_INTRO:
			return {
				...result,
				show: action.show
			};
		default:
			return state;
	}
}
