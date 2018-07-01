import {
	LOGIN_LOADING,
	GET_USER_AUTH_FIREBASE,
	ADD_USER_FIREBASE
} from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	userFirebase: [],
	userDetails: null,
	signInType: null
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
		case GET_USER_AUTH_FIREBASE:
			return {
				...result,
				userFirebase: action.userFirebase,
				signInType: action.signInType
			};
		case ADD_USER_FIREBASE:
			return {
				...result,
				userDetails: action.userDetails
			};
		default:
			return state;
	}
}
