import { ERROR_HANDLING } from './types';

/**
 * Handles error throughout the app.
 * @param  {object} error
 * @return returns type and error.
 */
export function handleError(error) {
	return {
		type: ERROR_HANDLING,
		error: error
	};
}
