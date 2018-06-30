import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem } from 'native-base';
import { styles } from '../../assets/styles/incident_styles';
import getDirections from 'react-native-google-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { viewIncident } from '../../actions/incidentsAction.js';
import firebase from 'react-native-firebase';

/**
 * Screen for showing individual incidents.
 * @extends Component
 */
class Incident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMapReady: false,
			incident: null,
			loading: false
		};
	}
	/**
	 * Function to check if map has been loaded then only display marker on the map.
	 * @return  sets isMapReady ready to true.
	 */
	onMapLayout = () => {
		this.setState({ isMapReady: true });
	};
	/**
	 * This screen gets opened either through a shared link or normally
	 * through app navigation. When the screen gets opened through a shared
	 * url than it contains an incident_key prop passed while navigating to this
	 * screen , if the prop is found than it fetches the particular incident from
	 * the firebase else it fetches the incident details from redux and incident
	 *  state is updated accordingly.
	 * @return sets the incident to be viewed.
	 */
	componentWillMount() {
		if (this.props.incident_key) {
			this.setState({ loading: true });
			var key = this.props.incident_key;
			console.log(key);
			firebase
				.database()
				.ref('incidents/' + key)
				.on('value', snap => {
					console.log(snap._value);
					if (snap._value.user_id === this.props.user.email) {
						this.props.viewIncident(snap._value, true);
					} else {
						this.props.viewIncident(snap._value, false);
					}
					this.setState({ incident: snap._value, loading: false });
				});
		} else {
			this.setState({ incident: this.props.incidentDetails.value });
		}
	}
	//Handles the navigation by opening the Google Maps
	handleDirections() {
		var coordinates = this.state.incident.location.coordinates;
		getDirections({
			source: {
				latitude: '',
				longitude: ''
			},
			destination: {
				latitude: coordinates.latitude,
				longitude: coordinates.longitude
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
	 * The UI of incident screen.
	 * @return the incident screen.
	 */
	render() {
		var incident = this.state.incident;
		if (this.state.loading) {
			return <ActivityIndicator size={'large'} />;
		} else {
			return (
				<Container>
					<Content>
						{incident.image.isPresent ? (
							<Card>
								<CardItem>
									<Image
										style={styles.image}
										resizeMethod={'resize'}
										source={{
											uri:
												'data:image/jpeg;base64, ' +
												incident.image.base64
										}}
									/>
								</CardItem>
							</Card>
						) : null}
						<Card>
							<CardItem>
								<Text style={styles.titleTextHeader}>
									Title
								</Text>
							</CardItem>
							<CardItem>
								<Text style={styles.titleTextDescription}>
									{incident.title}
								</Text>
							</CardItem>
							{incident.details !== '' ? (
								<View>
									<CardItem>
										<Text style={styles.titleTextHeader}>
											Description
										</Text>
									</CardItem>
									<CardItem>
										<Text
											style={styles.titleTextDescription}
										>
											{incident.details}
										</Text>
									</CardItem>
								</View>
							) : null}
						</Card>
						<Card>
							<CardItem>
								<MapView
									region={{
										latitude:
											incident.location.coordinates
												.latitude,
										longitude:
											incident.location.coordinates
												.longitude,
										latitudeDelta: 0.0052,
										longitudeDelta: 0.0052
									}}
									onLayout={this.onMapLayout}
									style={styles.map}
								>
									{this.state.isMapReady && (
										<MapView.Marker
											coordinate={{
												latitude:
													incident.location
														.coordinates.latitude,
												longitude:
													incident.location
														.coordinates.longitude
											}}
										/>
									)}
								</MapView>
							</CardItem>
						</Card>
						<Card>
							<CardItem>
								<TouchableOpacity
									style={styles.navigationContainer}
									onPress={() => this.handleDirections()}
								>
									<Text>Navigate</Text>
									<Icon
										name="map-pin"
										size={23}
										style={styles.navigationIcon}
									/>
								</TouchableOpacity>
							</CardItem>
						</Card>
					</Content>
				</Container>
			);
		}
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
Incident.propTypes = {
	incidentDetails: PropTypes.object,
	viewIncident: PropTypes.func.isRequired
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
	incidentDetails: state.incident.incident,
	user: state.login.userDetails
});

export default connect(mapStateToProps, matchDispatchToProps)(Incident);
