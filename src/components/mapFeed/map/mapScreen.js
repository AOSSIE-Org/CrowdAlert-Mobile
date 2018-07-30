import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	TouchableHighlight,
	TouchableOpacity,
	Keyboard,
	ActivityIndicator,
	Picker,
	Modal,
	Image
} from 'react-native';
import { Header, Left, Body } from 'native-base';
import { Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import getDirections from 'react-native-google-maps-directions';
import Config from 'react-native-config';
import MapContainer from './mapContainer';
import { getMarkerImage, categories } from '../../../utils/categoryUtil.js';
import { setLocationOnCustomSearch } from '../../../actions/locationAction';
import {
	getAllIncidents,
	updateIndvNotification,
	updateDomain
} from '../../../actions/incidentsAction';
import { styles, searchBarStyle } from '../../../assets/styles/map_styles.js';
import { styles as filterStyles } from '../../../assets/styles/filter_styles';
import { styles as loadingStyle } from '../../../assets/styles/mapFeed_styles';
import { GooglePlacesAutocomplete } from '../../googleSearchBar';
import { SideDrawer } from '../../sideMenu';
import { getEmergencyPlaces } from '../../../actions/emergencyPlacesAction';
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
			visibleModal: false
		};
	}

	componentWillMount() {
		this.props.getAllIncidents();
		this.props.getEmergencyPlaces(this.props.settings.emergency_radius);
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
							lat: incident.value.coordinates.latitude,
							lng: incident.value.coordinates.longitude
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
									largeIcon: incident.value.category, // (optional) default: "ic_launcher"
									color: 'red', // (optional) default: system default
									group: 'grp', // (optional) add group to message
									tag: {
										key: incident.key
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

	//Sets the filter category
	alertItemName = item => {
		this.props.updateDomain(item.category);
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

	//Modal to be displayed for the filter menu.
	_renderModalContent = () => (
		<View style={filterStyles.container}>
			<Header androidStatusBarColor="#1c76cb">
				<Left>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => this.closeModal()}
					>
						<Icon name="close" size={25} color="white" />
					</TouchableOpacity>
				</Left>
				<Body>
					<Text style={filterStyles.title}>
						Select Incident to filter
					</Text>
				</Body>
			</Header>
			<View style={filterStyles.listView}>
				{Object.keys(categories).map((key, index) => (
					<TouchableOpacity
						key={categories[key].category}
						style={filterStyles.field}
						onPress={() => this.alertItemName(categories[key])}
					>
						<Image
							style={filterStyles.image}
							source={getMarkerImage(categories[key].category)}
						/>
						<Text style={filterStyles.text}>
							{categories[key].title}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);

	render() {
		if (this.props.emergencyPlaces.loading || this.props.incident.loading) {
			return (
				<View style={loadingStyle.loaderContainer}>
					<Image
						style={loadingStyle.marker_gif}
						source={require('../../../assets/images/marker_jump.gif')}
					/>
					<Text style={loadingStyle.loadingText}>
						Loading your incidents & emergency places...
					</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<MapContainer />
				<TouchableHighlight
					underlayColor="#005b4f"
					style={styles.filterButton}
					onPress={() => this.openModal()}
				>
					<Icon
						name="filter"
						size={27}
						style={styles.fabButtonIcon}
					/>
				</TouchableHighlight>
				<TouchableOpacity
					activeOpacity={0.5}
					style={styles.addIncidentButton}
					onPress={() => Actions.addIncident()}
				>
					<Icon name="plus" size={30} style={styles.fabButtonIcon} />
				</TouchableOpacity>
				<Modal
					visible={this.state.visibleModal}
					onRequestClose={() => {
						this.closeModal();
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
						this.props.setLocationOnCustomSearch(
							details.geometry.location.lat,
							details.geometry.location.lng,
							details.name
						);
					}}
					styles={searchBarStyle}
					renderLeftButton={() => SideDrawer()}
				/>
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
	settings: PropTypes.object,
	setLocationOnCustomSearch: PropTypes.func.isRequired,
	getAllIncidents: PropTypes.func.isRequired,
	getAllIncidents: PropTypes.func.isRequired,
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
			getAllIncidents: getAllIncidents,
			getEmergencyPlaces: getEmergencyPlaces,
			updateDomain: updateDomain,
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
	curr_location: state.location.curr_coordinates,
	emergencyPlaces: state.emergencyPlaces,
	all_incidents: state.incident.all_incidents,
	incident: state.incident,
	settings: state.settings
});

export default connect(mapStateToProps, matchDispatchToProps)(MapScreen);
