import {
	LATEST_INCIDENT_ADDED,
	ALL_INCIDENTS,
	INCIDENTS_LOADING,
	USERS_INCIDENTS,
	VIEW_INCIDENT,
	NOTIFICATION_INCIDENTS
} from './types';
import { handleError } from './errorAction';
import firebase from 'react-native-firebase';

import configureStore from '../utils/store';
let { store, persistor } = configureStore();

/**
 * This function is called to update the store state that a new incident has been added.
 * @param  {JSON}  incident Consist all incident details.
 * @return {Promise} 		After the incident is pushed to firebase database.
 */
export const addIncidentToFirebase = incident => {
	return dispatch => {
		dispatch(incidentsLoading(true));
		return new Promise((resolve, reject) => {
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
 * Stores all the incidents retrieved from the firebase database to the redux store.
 * Also creates a notification stack which would be used to trigger the notifications
 * @return {Promise}
 */
export const getAllIncidents = () => {
	return dispatch => {
		dispatch(incidentsLoading(true));
		return new Promise((resolve, reject) => {
			firebase
				.database()
				.ref('incidents')
				.on('value', snap => {
					var all_incidents = [];
					var notificationStack = store.getState().incident
						.notificationStack;
					// get children as an array
					snap.forEach(child => {
						if (child.val().visible) {
							all_incidents.push({
								title: child.val().title,
								key: child.key,
								value: child.val()
							});
							//Adds the child to the stack if not present with a timestamp
							if (notificationStack[child.key] === undefined) {
								notificationStack[child.key] = {
									date: String(new Date()),
									isFirstTime: true
								};
							}
						} else {
							//Removes all those children which have been deleted ie. visible=false
							if (child.key in notificationStack) {
								delete notificationStack[child.key];
							}
						}
					});
					console.log(all_incidents, notificationStack);
					//Sorting the incidents according to their correct timestamp order.
					all_incidents.sort(function(a, b) {
						return (
							new Date(b.value.timestamp) -
							new Date(a.value.timestamp)
						);
					});
					dispatch(retrieveAllIncidents(all_incidents));
					dispatch(updateNotificationsStack(notificationStack));
					dispatch(incidentsLoading(false));
					resolve();
				});
		});
	};
};

/**
 * Gets incidents from Firebase pertaining to a certain user only
 * @param  {String} userID User's email ID is used as the UserID
 */
export const getUserIncidents = userID => {
	return dispatch => {
		dispatch(incidentsLoading(true));
		var incident_ref = firebase.database().ref('incidents/');
		incident_ref
			.orderByChild('user_id')
			.equalTo(userID)
			.on('value', function(snapshot) {
				var items = [];
				snapshot.forEach(item => {
					if (item.val().visible) {
						items.push({
							key: item.key,
							value: item.val()
						});
					}
				});
				dispatch(userIncidents(items));
				dispatch(incidentsLoading(false));
			});
	};
};

/**
 * Stores the current incident viewed along with the state of
 * 'If that incident belongs to the signed in user or not'.
 * @param  {JSON}  incident   Current Incident being viewed
 * @param  {Boolean} isLoggedIn Store the state whether the current
 * incident being viewed is of the logged in user or not
 */
export const viewIncident = (incident, isLoggedIn) => {
	return dispatch => {
		dispatch(viewIncidentHelper(incident, isLoggedIn));
	};
};

/**
 *  Called when the user updates his details
 *  Also updates the firebase and the redux store
 * @param  {JSON} userDetails Details of the user
 */
export const updateIncidentFirebase = (key, value) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			firebase
				.database()
				.ref('incidents/' + key)
				.update(value);
			resolve();
		});
	};
};

/**
 * Called when a notification is triggered so as to change its timestamp to reschedule it
 * @param  {String} key Incident key whose timestamp is to be changed
 */
export const updateIndvNotification = key => {
	return dispatch => {
		var notificationStack = store.getState().incident.notificationStack;
		notificationStack[key] = {
			date: String(new Date()),
			isFirstTime: false
		};
		dispatch(updateNotificationsStack(notificationStack));
	};
};

export const getIndvIncident = key => {
	return dispatch => {
		dispatch(incidentsLoading(true));
		firebase
			.database()
			.ref('incidents/' + key)
			.on('value', snap => {
				console.log(snap);
				var item = {
					key: snap.key,
					value: snap._value
				};
				if (
					item.value.user_id ===
					store.getState().login.userDetails.email
				) {
					dispatch(viewIncident(item, true));
				} else {
					dispatch(viewIncident(item, false));
				}
				dispatch(incidentsLoading(false));
			});
	};
};

/**
 * Called when an incident is clicked to be viewed for its details
 * @param  {JSON} incident Incident details
 * @param  {Boolean} bool     Store the state whether the current
 * incident being viewed is of the logged in user or not
 */
export function viewIncidentHelper(incident, bool) {
	return {
		type: VIEW_INCIDENT,
		incident: incident,
		isLoggedIn: bool
	};
}

/**
 * Called when user specific incidents are retrieved
 * @param  {JSON} data User specific incidents
 */
function userIncidents(data) {
	return {
		type: USERS_INCIDENTS,
		user_incidents: data
	};
}

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
 * Adds/Updates the notification stack to the store
 * @param  {JSON} notificationStack Notification stack to be updated
 */
function updateNotificationsStack(notificationStack) {
	return {
		type: NOTIFICATION_INCIDENTS,
		notificationStack: notificationStack
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
