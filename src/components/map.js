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
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import MapView, { Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { getMarkerImage, categories } from '../utils/categoryUtil.js';
import { connect } from 'react-redux';
import {
	setLocationOnCustomSearch,
	getCurrLocation
} from '../actions/locationAction';
import { getAllIncidents } from '../actions/incidentsAction';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { styles, searchBarStyle } from '../assets/styles/map_styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from './googleSearchBar';
import { sideMenu } from './profile/navBarButtons';

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
		//Used to check if location services are enabled and
		//if not than asks to enables them by redirecting to location settings.
		if (Platform.OS === 'android') {
			LocationServicesDialogBox.checkLocationServicesIsEnabled({
				message:
					'<h2>Use Location ?</h2> \
                    This app wants to change your device settings:<br/><br/> \
                    Use GPS for location<br/><br/>',
				ok: 'YES',
				cancel: 'NO',
				providerListener: true
			}).then(success => {
				this.props.getCurrLocation().then(() => {
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
				});
			});
		}
	}

	componentWillUnmount() {
		if (Platform.OS === 'android') {
			LocationServicesDialogBox.stopListener();
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
		if (this.props.incident.all_incidents !== null) {
			var incidents_marker = this.props.incident.all_incidents.filter(
				function(item) {
					if (state.domain === 'all') {
						return true;
					} else {
						return item.value.category === state.domain;
					}
				}
			);
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
					{this.props.incident.all_incidents !== null
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
											Actions.incident({
												details: marker.value
											});
										}}
										image={getMarkerImage(
											marker.value.category
										)}
									/>
								);
						  })
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

//Prop types for prop checking.
MapScreen.propTypes = {
	setLocationOnCustomSearch: PropTypes.func.isRequired,
	getCurrLocation: PropTypes.func.isRequired,
	location: PropTypes.object,
	curr_location: PropTypes.object,
	getAllIncidents: PropTypes.func.isRequired
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
			getCurrLocation: getCurrLocation,
			getAllIncidents: getAllIncidents
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
	incident: state.incident
});

export default connect(mapStateToProps, matchDispatchToProps)(MapScreen);
