import {
	EMERGENCY_PLACES_HOSPITALS,
	EMERGENCY_PLACES_POLICE_STATIONS,
	EMERGENCY_PLACES_LOADING,
	NEARBY_PLACES_GOOGLE_URL
} from './types';
import { handleError } from './errorAction';
import Config from 'react-native-config';

import configureStore from '../utils/store';
let { store, persistor } = configureStore();

/**
 * This functions fetches a list of nearby police stations and
 * hospitals with the help of urlHospital and urlPoliceStation.
 * @return  updates the state in redux by calling EmergencyPlacesLoading,
 * EmergencyPlacesHospitals, EmergencyPlacesPoliceStations functions.
 */
export const getEmergencyPlaces = radius => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(EmergencyPlacesLoading(true));
			// navigator.geolocation.getCurrentPosition(position => {});
			var latitude = store.getState().location.curr_coordinates.latitude;
			var longitude = store.getState().location.curr_coordinates
				.longitude;
			const urlHospital =
				NEARBY_PLACES_GOOGLE_URL +
				latitude +
				',' +
				longitude +
				'&radius=' +
				radius +
				'&type=hospital&key=' +
				Config.GOOGLE_MAPS_KEY;
			const urlPoliceStation =
				NEARBY_PLACES_GOOGLE_URL +
				latitude +
				',' +
				longitude +
				'&radius=' +
				radius +
				'&type=police&key=' +
				Config.GOOGLE_MAPS_KEY;
			//fetches hospitals
			fetch(urlHospital)
				.then(resHospitals => {
					return resHospitals.json();
				})
				.then(resHospitals => {
					dispatch(EmergencyPlacesHospitals(resHospitals.results));
					//fetches police stations
					fetch(urlPoliceStation)
						.then(resPoliceStations => {
							return resPoliceStations.json();
						})
						.then(resPoliceStations => {
							dispatch(
								EmergencyPlacesPoliceStations(
									resPoliceStations.results
								)
							);
							dispatch(EmergencyPlacesLoading(false));
							resolve();
						})
						.catch(error => {
							dispatch(handleError(error));
						});
				})
				.catch(error => {
					dispatch(handleError(error));
				});
		});
	};
};

/**
 * Updates list of hospitals found near a user to redux store.
 * @param   {JSON} hospitals Contains the list of all hospitals
 * @return  passes hospitals list to redux for updates.
 */
function EmergencyPlacesHospitals(hospitals) {
	return {
		type: EMERGENCY_PLACES_HOSPITALS,
		hospitals: hospitals
	};
}

/**
 * Updates list of nearby police stations to redux store.
 * @param   {JSON} policeStations Contains list of all police stations.
 * @return  passes police stations list to redux for updates.
 */
function EmergencyPlacesPoliceStations(policeStations) {
	return {
		type: EMERGENCY_PLACES_POLICE_STATIONS,
		policeStations: policeStations
	};
}

/**
 * Updates loading status to redux.
 * @param  {Boolean} bool Contains the loading state
 * @return passes loading status to redux for updates.
 */
function EmergencyPlacesLoading(bool) {
	return {
		type: EMERGENCY_PLACES_LOADING,
		emergencyPlacesLoading: bool
	};
}
