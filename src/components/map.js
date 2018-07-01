import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	TouchableOpacity,
	Keyboard,
	ActivityIndicator,
	Picker,
	Modal,
	Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { getMarkerImage, categories } from '../utils/categoryUtil.js';
import { connect } from 'react-redux';
import {
	setLocationOnCustomSearch
	// watchCurrLocation
} from '../actions/locationAction';
import {
	getAllIncidents,
	viewIncident,
	updateIndvNotification
} from '../actions/incidentsAction';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { styles, searchBarStyle } from '../assets/styles/map_styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from './googleSearchBar';
import { sideMenu } from './profile/navBarButtons';
import { getEmergencyPlaces } from '../actions/emergencyPlacesAction';
import getDirections from 'react-native-google-maps-directions';
var PushNotification = require('react-native-push-notification');
var haversine = require('haversine-distance');

/**
 * Map screen showing google maps with search location and add incident feature
 * @extends Component
 */
class MapScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curr_region: {
				latitude: this.props.curr_location.latitude,
				longitude: this.props.curr_location.longitude,
				latitudeDelta: 0.0052,
				longitudeDelta: 0.0052
			},
			curr_location_marker: {
				latitude: this.props.curr_location.latitude,
				longitude: this.props.curr_location.longitude
			},
			domain: 'all',
			incidents_marker: null,
			visibleModal: false
		};
	}

	componentWillMount() {
		this.props.getAllIncidents();
		this.props.getEmergencyPlaces(this.props.settings.emergency_radius);
		this.setState({
			curr_region: {
				...this.state.curr_region,
				latitude: this.props.curr_location.latitude,
				longitude: this.props.curr_location.longitude
			},
			curr_location_marker: {
				latitude: this.props.curr_location.latitude,
				longitude: this.props.curr_location.longitude
			}
		});
	}

	componentWillUpdate(nextProps) {
		//Check if notifications are enabled or not
		if (this.props.settings.enable_notifications) {
			//If there has been any location change or modifications in the incidents
			if (
				nextProps.curr_location !== this.props.curr_location ||
				nextProps.all_incidents !== this.props.all_incidents
			) {
				var curr_position = {
					lat: nextProps.curr_location.latitude,
					lng: nextProps.curr_location.longitude
				};
				var self = this;
				if (nextProps.all_incidents !== null) {
					nextProps.all_incidents.map(incident => {
						var incident_location = {
							lat: incident.value.location.coordinates.latitude,
							lng: incident.value.location.coordinates.longitude
						};
						//Calculates the distance between the current position of the user
						//to the incidents locations. If its within a specified distance range and
						//within a certain trigger timeout range then notification is triggered
						if (
							haversine(curr_position, incident_location) <
							parseInt(
								this.props.settings.notification_min_radius.toFixed(
									2
								)
							)
						) {
							if (
								new Date() -
									new Date(
										self.props.incident.notificationStack[
											incident.key
										].date
									) >
									this.props.settings.notification_timeout *
										60 *
										1000 ||
								self.props.incident.notificationStack[
									incident.key
								].isFirstTime
							) {
								PushNotification.localNotification({
									/* Android Only Properties */
									bigText: incident.value.details, // (optional) default: "message" prop
									color: 'red', // (optional) default: system default
									group: 'grp', // (optional) add group to message
									tag: {
										key: incident.key,
										value: incident.value
									}, // (optional) add tag to message

									/* iOS and Android properties */
									title: 'Danger ahead!', // (optional)
									message:
										'You have a ' +
										incident.value.category +
										' incident near you', // (required)
									playSound: true, // (optional) default: true
									soundName: 'default' // (optional) Sound to play when the
									//notification is shown. Value of 'default' plays the default sound.
									//It can be set to a custom sound such as
									//'android.resource://com.xyz/raw/my_sound'. It will look for the
									//my_sound' audio file in 'res/raw' directory and play it.
									//default: 'default' (default sound is played)
								});
								self.props.updateIndvNotification(incident.key);
							}
						}
					});
				}
			}
		}
	}

	//Setting up the region upon relocation
	setRegion(lat, lng) {
		var self = this;
		setTimeout(function() {
			self.setState({
				curr_region: {
					...self.state.curr_region,
					latitude: lat,
					longitude: lng
				}
			});
		}, 500);
	}

	// Handling the relocation of the map screen from the current location
	// to another location or vice-versa
	handleRelocation(coordinates, type) {
		const mapRef = this.map;
		const markerRef = this.marker;

		if (type === 'search') {
			this.props.setLocationOnCustomSearch(
				coordinates['lat'],
				coordinates['lng'],
				coordinates['name']
			);
			mapRef.animateToRegion(
				{
					...this.state.curr_region,
					latitude: this.props.location.latitude,
					longitude: this.props.location.longitude
				},
				1000
			);
			markerRef._component.animateMarkerToCoordinate({
				latitude: this.props.location.latitude,
				longitude: this.props.location.longitude
			});
			this.setRegion(coordinates['lat'], coordinates['lng']);
			Keyboard.dismiss();
		} else if (type === 'curr_location') {
			var self = this;
			mapRef.animateToRegion(
				{
					...this.state.curr_region,
					latitude: this.props.curr_location.latitude,
					longitude: this.props.curr_location.longitude
				},
				1000
			);
			markerRef._component.animateMarkerToCoordinate({
				latitude: this.props.curr_location.latitude,
				longitude: this.props.curr_location.longitude
			});
			this.setRegion(
				this.props.curr_location.latitude,
				this.props.curr_location.longitude
			);
		}
	}

	viewClickedIncident(marker) {
		if (marker.value.user_id === this.props.user.email) {
			this.props.viewIncident(marker, true);
		} else {
			this.props.viewIncident(marker, false);
		}
		Actions.incident();
	}

	//Sets the filter category
	alertItemName = item => {
		this.setState({ domain: item.category });
		this.closeModal();
	};

	//Opens the modal
	openModal() {
		this.setState({ visibleModal: true });
	}

	//Closes the modal
	closeModal() {
		this.setState({ visibleModal: false });
	}

	/**
	 * to open google maps app and navigate the user to the specified destination.
	 * @param  {object} coordinates contains the latitude and longitude of nearby place.
	 * @return Opens the google maps app.
	 */
	handleNavigation(coordinates) {
		getDirections({
			source: {
				latitude: '',
				longitude: ''
			},
			destination: {
				latitude: coordinates.lat,
				longitude: coordinates.lng
			},
			params: [
				{
					key: 'dirflg',
					value: 'd'
				}
			]
		});
	}

	//Modal to be displayed for the filter menu.
	_renderModalContent = () => (
		<View>
			<TouchableOpacity onPress={() => this.closeModal()}>
				<Icon name="close" size={20} style={styles.modalIcon} />
			</TouchableOpacity>
			<Text style={styles.modalHeadText}>
				Select category from below :
			</Text>
			<View style={styles.modalContainer}>
				{Object.keys(categories).map((key, index) => (
					<TouchableOpacity
						key={categories[key].category}
						style={styles.modalField}
						onPress={() => this.alertItemName(categories[key])}
					>
						<Image
							style={styles.modalImage}
							source={getMarkerImage(categories[key].category)}
						/>
						<Text style={styles.modalText}>
							{categories[key].title}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);

	render() {
		//Logic for filtering the incidents
		var state = this.state;
		if (this.props.all_incidents !== null) {
			var incidents_marker = this.props.all_incidents.filter(function(
				item
			) {
				if (state.domain === 'all') {
					return true;
				} else {
					return item.value.category === state.domain;
				}
			});
		}
		return (
			<View style={styles.container}>
				<MapView
					ref={ref => {
						this.map = ref;
					}}
					// showsMyLocationButton={true}
					style={styles.map}
					region={this.state.curr_region}
				>
					<Marker.Animated
						ref={marker => {
							this.marker = marker;
						}}
						coordinate={this.state.curr_location_marker}
					/>
					{this.props.all_incidents !== null
						? incidents_marker.map(marker => {
								var coordinates =
									marker.value.location.coordinates;
								return (
									<MapView.Marker
										key={marker.key}
										coordinate={{
											latitude: coordinates.latitude,
											longitude: coordinates.longitude
										}}
										title={marker.value.title}
										description={marker.value.details}
										onCalloutPress={() => {
											this.viewClickedIncident(marker);
										}}
										image={getMarkerImage(
											marker.value.category
										)}
									/>
								);
						  })
						: null}
					{this.props.emergencyPlaces.hospitals !== null
						? this.props.emergencyPlaces.hospitals.map(marker => {
								var coordinates = marker.geometry.location;
								//For displaying hospitals on map
								return (
									<MapView.Marker
										key={marker.id}
										coordinate={{
											latitude: coordinates.lat,
											longitude: coordinates.lng
										}}
										title={marker.name}
										description={marker.vicinity}
										image={marker.icon}
										onCalloutPress={() => {
											this.handleNavigation(coordinates);
										}}
									/>
								);
						  })
						: null}
					{this.props.emergencyPlaces.policeStations !== null
						? this.props.emergencyPlaces.policeStations.map(
								marker => {
									var coordinates = marker.geometry.location;
									//For displaying police stations on map
									return (
										<MapView.Marker
											key={marker.id}
											coordinate={{
												latitude: coordinates.lat,
												longitude: coordinates.lng
											}}
											title={marker.name}
											description={marker.vicinity}
											image={marker.icon}
											onCalloutPress={() => {
												this.handleNavigation(
													coordinates
												);
											}}
										/>
									);
								}
						  )
						: null}
				</MapView>

				<TouchableOpacity
					style={styles.filterButton}
					onPress={() => this.openModal()}
				>
					<Icon name="filter" size={30} style={styles.fabButton} />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.repositionButton}
					onPress={() => {
						this.handleRelocation(null, 'curr_location');
					}}
				>
					<Icon
						name="crosshairs"
						size={30}
						style={styles.fabButton}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.addIncidentButton}
					onPress={() => Actions.addIncident()}
				>
					<Icon name="plus" size={30} style={styles.fabButton} />
				</TouchableOpacity>
				<Modal
					visible={this.state.visibleModal}
					onRequestClose={() => {
						this.closeModal();
						alert('Modal has been closed.');
					}}
				>
					{this._renderModalContent()}
				</Modal>
				<GooglePlacesAutocomplete
					minLength={2}
					listViewDisplayed="auto"
					autoFocus={false}
					returnKeyType={'search'}
					fetchDetails={true}
					query={{
						key: Config.GOOGLE_MAPS_KEY,
						language: 'en'
					}}
					textInputProps={{
						clearButtonMode: 'never',
						ref: input => {
							this.textInput = input;
						}
					}}
					onPress={(data, details = null) => {
						var coordinates = {
							lat: details.geometry.location.lat,
							lng: details.geometry.location.lng,
							name: details.name
						};
						this.handleRelocation(coordinates, 'search');
					}}
					styles={searchBarStyle}
					renderLeftButton={() => sideMenu()}
				/>
				{this.props.incident.loading ? (
					<ActivityIndicator size={'large'} />
				) : null}
			</View>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
MapScreen.propTypes = {
	location: PropTypes.object,
	curr_location: PropTypes.object,
	all_incidents: PropTypes.array,
	incident: PropTypes.object,
	user: PropTypes.object,
	emergencyPlaces: PropTypes.object,
	settings: PropTypes.object,
	setLocationOnCustomSearch: PropTypes.func.isRequired,
	// watchCurrLocation: PropTypes.func.isRequired,
	getAllIncidents: PropTypes.func.isRequired,
	getAllIncidents: PropTypes.func.isRequired,
	viewIncident: PropTypes.func.isRequired,
	getEmergencyPlaces: PropTypes.func.isRequired,
	updateIndvNotification: PropTypes.func.isRequired
};

/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setLocationOnCustomSearch: setLocationOnCustomSearch,
			// watchCurrLocation: watchCurrLocation,
			getAllIncidents: getAllIncidents,
			viewIncident: viewIncident,
			getEmergencyPlaces: getEmergencyPlaces,
			updateIndvNotification: updateIndvNotification
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

export default connect(mapStateToProps, matchDispatchToProps)(MapScreen);
