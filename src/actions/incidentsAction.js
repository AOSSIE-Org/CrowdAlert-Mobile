import {
	LATEST_INCIDENT_ADDED,
	ALL_INCIDENTS,
	INCIDENTS_LOADING
} from './types';
import { handleError } from './loginAction';
import firebase from 'react-native-firebase';

/**
 * This function is called to update the store state that a new incident has been added.
 * @param  {JSON}  incident Consist all incident details.
 * @return {Promise} 		After the incident is pushed to firebase database.
 */
export const addToFirebase = incident => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(incidentsLoading(true));
			firebase
				.database()
				.ref()
				.child('incidents')
				.push(incident)
				.then(result => {
					dispatch(incidentsLoading(false));
					dispatch(add_incident());
					resolve();
				})
				.catch(error => {
					dispatch(incidentsLoading(false));
					dispatch(handleError(error));
					console.log(error);
					reject();
				});
		});
	};
};

/**
 * To store all the incidents retrieved from the firebase database to the redux store.
 * @return {Promise}
 */
export const getAllIncidents = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(incidentsLoading(true));
			firebase
				.database()
				.ref('incidents')
				.on('value', snap => {
					var items = [];
					// get children as an array
					snap.forEach(child => {
						if (child.val().visible) {
							items.push({
								title: child.val().title,
								key: child.key,
								value: child.val()
							});
						}
					});
					console.log(items);
					dispatch(retrieveAllIncidents(items));
					dispatch(incidentsLoading(false));
					resolve();
				});
		});
	};
};

/**
 * Triggers the redux store for updates.
 */
function add_incident() {
	return {
		type: LATEST_INCIDENT_ADDED
	};
}

/**
 * Triggers the store the store all the incidents.
 * @param  {JSON} data List of all the incidents.
 * @return  Returns the type and all_incidents list.
 */
function retrieveAllIncidents(data) {
	return {
		type: ALL_INCIDENTS,
		all_incidents: data
	};
}

/**
 * Triggers the loading state for the map and incident addition screen
 * @param  {bool} bool State of the loading
 * @return  Returns the type and loading state.
 */
function incidentsLoading(bool) {
	return {
		type: INCIDENTS_LOADING,
		loading: bool
	};
}
