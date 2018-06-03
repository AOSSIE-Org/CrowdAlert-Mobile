import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import MapView from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	SetLocationOnCustomSearch,
	getLocation
} from '../actions/locationAction';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles, searchBarStyle } from '../assets/styles/map_styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.18;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;

class MapScreen extends Component {
	componentDidMount() {
		//Used to check if location services are enabled , if not than asks to enables them by redirecting to location settings.
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
				this.props.getLocation();
			});
		}
	}

	componentWillUnmount() {
		if (Platform.OS === 'android') {
			LocationServicesDialogBox.stopListener();
		}
	}

	render() {
		return (
			<View style={styles.container} onLayout={this._onLayout}>
				<MapView
					showsMyLocationButton={true}
					style={styles.map}
					region={{
						latitude: this.props.location.latitude,
						longitude: this.props.location.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA
					}}
				>
					<MapView.Marker
						coordinate={{
							latitude: this.props.location.latitude,
							longitude: this.props.location.longitude
						}}
					/>
				</MapView>
				<GooglePlacesAutocomplete
					placeholder={this.props.location_name || 'Enter Location'}
					minLength={2}
					listViewDisplayed="auto"
					autoFocus={false}
					fetchDetails
					query={{
						key: Config.GOOGLE_MAPS_KEY,
						language: 'en'
					}}
					onPress={(data, details = null) => {
						let latitude = details.geometry.location.lat;
						let longitude = details.geometry.location.lng;
						let name = details.name;
						this.props.SetLocationOnCustomSearch(
							latitude,
							longitude,
							name
						);
					}}
					styles={searchBarStyle}
					currentLocation={true}
				/>
				<TouchableOpacity
					style={styles.repositionButton}
					onPress={() => this.props.getLocation()}
				>
					<Icon
						name="map-marker"
						size={30}
						style={{ alignSelf: 'center' }}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

//Prop types for prop checking.
MapScreen.propTypes = {
	SetLocationOnCustomSearch: PropTypes.func.isRequired,
	getLocation: PropTypes.func.isRequired
};

/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			SetLocationOnCustomSearch: SetLocationOnCustomSearch,
			getLocation: getLocation
		},
		dispatch
	);
}

/**
 * Mapping state to props so that state variables can be used through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
	location: state.location.coordinates,
	location_name: state.location.coordinates.name
});

export default connect(mapStateToProps, matchDispatchToProps)(MapScreen);
