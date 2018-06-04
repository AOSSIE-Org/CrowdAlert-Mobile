import { LOGIN_LOADING, USER_SIGN_IN, ERROR_HANDLING } from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	user: [],
	signInType: null,
	error: null
};
/**
 * Login Reducer handling all types of login states.
 * This would maintain the state of the login in the Redux store.
 * @param  {JSON} state=INITIAL_STATE State to be maintained by this
 * reducer in the redux store.
 * @param  {JSON} action Tells the reducer to perform certain actions and make changes
 * @return {state} Based on action the function changes the state and rerenders
 */
export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case LOGIN_LOADING:
			return {
				...result,
				loading: action.loading
			};
		case USER_SIGN_IN:
			return {
				...result,
				user: action.user,
				signInType: action.signInType
			};
		case ERROR_HANDLING:
			return {
				...result,
				error: action.error
			};
		default:
			return state;
	}
}
