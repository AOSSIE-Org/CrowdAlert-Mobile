import React, { Component } from 'react';
import {
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Platform,
	TouchableOpacity,
	Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEmergencyPlaces } from '../actions/emergencyPlacesAction';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { styles } from '../assets/styles/emergencyPlaces_styles';
import {
	Content,
	Container,
	Card,
	CardItem,
	Left,
	Right,
	Thumbnail
} from 'native-base';
import getDirections from 'react-native-google-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

//Screen for displaying list of Emergency places near by.
class Emergency extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			places: {}
		};
	}

	componentDidMount() {
		//to check if location has been turned on , if not tham prompts the user to turn on.
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
				this.props.getEmergencyPlaces();
			});
		}
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

	/**
	 * UI for displaying each item in the list.
	 * @param  {integer} val if  val is 'hospitals' than render the
	 * hospitals list else render the police stations list
	 * @return  returns the UI of list
	 */
	_renderCard(val) {
		if (val === 'hospitals') {
			items = this.props.emergencyPlaces.hospitals;
		} else if (val === 'policeStations') {
			items = this.props.emergencyPlaces.policeStations;
		}
		return (
			<View>
				{items.map(item => (
					<TouchableOpacity
						key={item.id}
						onPress={() =>
							this.handleNavigation(item.geometry.location)
						}
					>
						<Card>
							<CardItem>
								<Left>
									<Image
										source={{ uri: item.icon }}
										style={styles.image}
									/>
									<Text style={styles.cardText}>
										{'  ' + item.name}
									</Text>
								</Left>
							</CardItem>
							<CardItem>
								<Text>{item.vicinity}</Text>
								<Right>
									<Icon size={22} name="near-me" />
								</Right>
							</CardItem>
						</Card>
					</TouchableOpacity>
				))}
			</View>
		);
	}

	render() {
		if (this.props.emergencyPlaces.hospitals != null) {
			return (
				<Container>
					<Content>
						<View>
							<Text style={styles.headText}>Hospitals</Text>
							{this._renderCard('hospitals')}
						</View>
						<View>
							<Text style={styles.headText}>Police Stations</Text>
							{this._renderCard('policeStations')}
						</View>
					</Content>
				</Container>
			);
		} else {
			return <ActivityIndicator size={'large'} />;
		}
	}
}

/**
 * Checks that the functions specified as isRequired are present,
 * and warns if the props used on this page,
 * does not meet the specified type.
 * @type {emergencyPlaces}
 */
Emergency.propTypes = {
	getEmergencyPlaces: PropTypes.func.isRequired,
	emergencyPlaces: PropTypes.object
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
			getEmergencyPlaces: getEmergencyPlaces
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
	emergencyPlaces: state.emergencyPlaces
});

export default connect(mapStateToProps, matchDispatchToProps)(Emergency);
