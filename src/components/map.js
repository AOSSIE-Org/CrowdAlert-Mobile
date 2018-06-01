import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Platform
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import MapView from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openSearch, getLocation } from '../actions/locationAction';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class MapScreen extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
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
		console.log(this.props.location.location_name);
		return (
			<View style={styles.container}>
				<MapView
					showsMyLocationButton={true}
					showsUserLocation={true}
					style={styles.map}
					region={{
						latitude: this.props.location.coordinates.latitude,
						longitude: this.props.location.coordinates.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.00922 * ASPECT_RATIO
					}}
				/>
				<TouchableOpacity
					onPress={() => this.props.openSearch()}
					style={styles.search_button}
				>
					<Text style={styles.search_button_text}>
						{this.props.location.location_name}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
	// map: {
	// 	width: width,
	// 	height: height
	// },
	search_button: {
		marginTop: 5,
		marginHorizontal: width / 50,
		width: width * 0.96,
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 20,
		borderColor: '#ccc',
		borderWidth: 1
	},
	search_button_text: {
		padding: 10
	}
});

MapScreen.propTypes = {
	openSearch: PropTypes.func.isRequired,
	getLocation: PropTypes.func.isRequired
};

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			openSearch: openSearch,
			getLocation: getLocation
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	location: state.location
});

export default connect(mapStateToProps, matchDispatchToProps)(MapScreen);
