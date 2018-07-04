import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { getMarkerImage } from '../../../utils/categoryUtil.js';
import { viewIncident } from '../../../actions/incidentsAction';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import getDirections from 'react-native-google-maps-directions';

/**
 * Class for displaying individual marker on map
 * @extends Component
 */
class MapMarker extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * This function checks if the user viewing the incident page is
	 * the uers who created the incident. If yes than it will display the
	 * edit and delete button on navigation bar else no.
	 * @param  {JSON} incident It contains the incident details.
	 * @return Navigates to incident page
	 */
	viewClickedIncident(incident) {
		if (incident.incident.value.user_id === this.props.user.email) {
			this.props.viewIncident(incident.incident, true);
		} else {
			this.props.viewIncident(incident.incident, false);
		}
		Actions.incident(); // Navigates to incident page
	}

	/**
	 * To open google maps app and navigate the user to the specified destination.
	 * @param  {object} coordinates Contains the latitude and longitude of nearby place.
	 * @return Opens the google maps app.
	 */
	handleNavigation(lat, lng) {
		getDirections({
			source: {
				latitude: '',
				longitude: ''
			},
			destination: {
				latitude: lat,
				longitude: lng
			},
			params: [
				{
					key: 'dirflg',
					value: 'd'
				}
			]
		});
	}

	render() {
		var item = this.props.item;
		const coords = item.geometry.coordinates;

		//If the marker is hospital or police station.
		if ('name' in item.properties) {
			return (
				<MapView.Marker
					coordinate={{
						latitude: coords[1],
						longitude: coords[0]
					}}
					title={item.properties.name}
					description={item.properties.vicinity}
					image={item.properties.icon}
					onCalloutPress={() => {
						this.handleNavigation(coords[1], coords[0]);
					}}
				/>
			);
		} else {
			// If marker is an incident.
			return (
				<MapView.Marker
					coordinate={{
						latitude: coords[1],
						longitude: coords[0]
					}}
					title={item.properties.incident.value.title}
					description={item.properties.incident.value.details}
					onCalloutPress={() => {
						this.viewClickedIncident(item.properties);
					}}
					image={getMarkerImage(
						item.properties.incident.value.category
					)}
				/>
			);
		}
	}
}

/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			viewIncident: viewIncident
		},
		dispatch
	);
}

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
	location: state.location.coordinates,
	curr_location: state.location.curr_coordinates,
	all_incidents: state.incident.all_incidents,
	incident: state.incident,
	user: state.login.userDetails,
	emergencyPlaces: state.emergencyPlaces,
	settings: state.settings
});

export default connect(mapStateToProps, matchDispatchToProps)(MapMarker);
