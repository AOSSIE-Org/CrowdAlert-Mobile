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
	componentDidMount() {
		this.props.getEmergencyPlaces(this.props.emergency_radius);
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
	 * @param  {String} val if  val is 'hospitals' than render the
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
		if (!this.props.emergencyPlaces.loading) {
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
	emergencyPlaces: PropTypes.object,
	emergency_radius: PropTypes.number
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
	emergencyPlaces: state.emergencyPlaces,
	emergency_radius: state.settings.emergency_radius
});

export default connect(mapStateToProps, matchDispatchToProps)(Emergency);
