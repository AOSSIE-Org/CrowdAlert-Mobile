import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { getMarkerImage } from '../../../utils/categoryUtil.js';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import getDirections from 'react-native-google-maps-directions';
import PropTypes from 'prop-types';
import { styles } from '../../../assets/styles/clusterMarker_styles';

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
	 * the one who created the incident. If yes than it will display the
	 * edit and delete button on navigation bar else no.
	 * @param  {JSON} incident It contains the incident details.
	 * @return Navigates to incident page
	 */
	viewClickedIncident(item) {
		Actions.incident({ incident_key: item.key }); // Navigates to incident page
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
			// If the marker is an incident.
			return (
				<MapView.Marker
					coordinate={{
						latitude: coords[1],
						longitude: coords[0]
					}}
					title={item.properties.incident.value.title}
					description={item.properties.incident.value.details}
					onCalloutPress={() => {
						this.viewClickedIncident(item.properties.incident);
					}}
				>
					<Image
						source={getMarkerImage(
							item.properties.incident.value.category
						)}
						style={styles.markerIcon}
					/>
				</MapView.Marker>
			);
		}
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if
 * the props used on this page does not meet the specified type.
 */
MapMarker.propTypes = {
	user: PropTypes.object
};

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
	user: state.login.userDetails
});

export default connect(mapStateToProps, null)(MapMarker);
