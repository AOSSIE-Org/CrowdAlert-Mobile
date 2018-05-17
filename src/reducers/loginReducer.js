import {
    LOGIN_LOADING,
    USER_SIGN_IN,
    ERROR_HANDLING
} from '../actions/types'

const INITIAL_STATE = {
    loading: false,
    error: null,
    user: [],
    signInType: null,
    error: null
};

export default function(state = INITIAL_STATE, action) {
    let result = Object.assign({}, state);
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...result,
                loading: action.loading,
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
            }
        default:
            return state;
    }
}
