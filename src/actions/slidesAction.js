import { SHOW_INTRO } from './types';

/**
 * Handles the state of the introduction slides.
 * @param  {boolean} bool
 */

export function toggleIntroduction(bool) {
	return {
		type: SHOW_INTRO,
		show: bool
	};
}
