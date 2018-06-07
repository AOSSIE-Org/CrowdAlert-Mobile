import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	Dimensions,
	TouchableOpacity,
	Keyboard,
	Picker
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { getMarkerImage } from '../utility/categoryUtil.js';
import { connect } from 'react-redux';
import {
	setLocationOnCustomSearch,
	getCurrLocation
} from '../actions/locationAction';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles, searchBarStyle } from '../assets/styles/map_styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import { GetIncidentFirebase } from '../utility/firebaseUtil';

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
			marker: {
				latitude: this.props.curr_location.latitude,
				longitude: this.props.curr_location.longitude
			},
			markers: []
		};
	}

	componentDidMount() {
		GetIncidentFirebase().then(result => {
			this.setState({ markers: result });
			console.log(this.state.markers);
			//this.setState({ loading: false });
		});
		//this.setState({ loading: true });
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
				console.log(success);
				this.props.getCurrLocation().then(() => {
					this.setState({
						curr_region: {
							...this.state.curr_region,
							latitude: this.props.curr_location.latitude,
							longitude: this.props.curr_location.longitude
						},
						marker: {
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

	handleRelocation(coordinates, type) {
		const mapRef = this.map;

		if (type === 'search') {
			this.props.setLocationOnCustomSearch(
				coordinates['lat'],
				coordinates['lng'],
				coordinates['name']
			);
			this.setState({
				marker: {
					latitude: this.props.location.latitude,
					longitude: this.props.location.longitude
				}
			});
			Keyboard.dismiss();
			mapRef.animateToRegion({
				...this.state.curr_region,
				latitude: this.props.location.latitude,
				longitude: this.props.location.longitude
			});
		} else if (type === 'curr_location') {
			var self = this;
			mapRef.animateToRegion(self.state.curr_region);
			setTimeout(function() {
				self.setState({
					marker: {
						latitude: self.props.curr_location.latitude,
						longitude: self.props.curr_location.longitude
					}
				});
				self.textInput.clear();
			}, 5);
			self.textInput.clear();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					ref={ref => {
						this.map = ref;
					}}
					showsMyLocationButton={true}
					style={styles.map}
					region={this.state.curr_region}
				>
					<MapView.Marker coordinate={this.state.marker} />
					{this.state.markers.map(marker => {
						return (
							<MapView.Marker
								key={marker.key}
								coordinate={{
									latitude:
										marker.value.location.coordinates
											.latitude,
									longitude:
										marker.value.location.coordinates
											.longitude
								}}
								title={marker.value.title}
								description={marker.value.details}
								image={getMarkerImage(marker.value.category)}
							/>
						);
					})}
				</MapView>
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
					renderRightButton={() => (
						<TouchableOpacity
							style={styles.clearButton}
							onPress={() => {
								this.textInput.clear();
							}}
						>
							<Icon name="remove" size={15} style={styles.icon} />
						</TouchableOpacity>
					)}
				/>
				<TouchableOpacity
					style={styles.repositionButton}
					onPress={() => {
						this.handleRelocation(null, 'curr_location');
					}}
				>
					<Icon name="crosshairs" size={30} style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.addIncidentButton}
					onPress={() => Actions.addIncident()}
				>
					<Icon
						name="plus"
						size={30}
						style={{ alignSelf: 'center', color: '#000000' }}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

//Prop types for prop checking.
MapScreen.propTypes = {
	setLocationOnCustomSearch: PropTypes.func.isRequired,
	getCurrLocation: PropTypes.func.isRequired,
	location: PropTypes.object,
	curr_location: PropTypes.object
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
			getCurrLocation: getCurrLocation
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
	curr_location: state.location.curr_coordinates
});

export default connect(mapStateToProps, matchDispatchToProps)(MapScreen);
