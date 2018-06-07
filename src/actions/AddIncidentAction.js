import { INCIDENT } from './types';
import { handleError } from './loginAction';
/**
 *  This function is called to update the incident details
 * by communicating changes to redux via add_incident
 * @param  {json}  incident consist all incident details.
 * @return {Promise to }      After the incident
 */
export const onPressAddIncident = async incident => {
	return dispatch => {
		console.log('AT ACTION');
		console.log(incident);
		dispatch(add_incident(incident));
	};
};
/**
 * Passes the incident object to redux for updates.
 * @param {json} data consists of all incident details added by the user.
 */
function add_incident(data) {
	console.log('GOING TO REDUX');
	console.log(data);
	return {
		type: INCIDENT,
		incident: data
	};
}
