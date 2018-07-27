import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	Container,
	Content,
	Card,
	CardItem,
	Header,
	Left,
	Body,
	Right
} from 'native-base';
import { styles } from '../../assets/styles/incident_styles';
import getDirections from 'react-native-google-maps-directions';
import { Actions } from 'react-native-router-flux';
import DeleteButtonIncident from './navBarButtons/deleteIncident.js';
import EditButtonIncident from './navBarButtons/editIncidentButton.js';
import ShareButtonIncident from './navBarButtons/shareIncidentButton.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getIndvIncident } from '../../actions/incidentsAction.js';
import IconDirection from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Screen for showing individual incidents.
 * @extends Component
 */
class Incident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMapReady: false
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
		if (
			this.props.incident.incident !== null
				? this.props.incident_key !== this.props.incident.incident.key
				: true
		) {
			this.props.getIndvIncident(this.props.incident_key);
		}
	}

	//Handles the navigation by opening the Google Maps
	handleDirections() {
		var coordinates = this.props.incident.incident.value.location
			.coordinates;
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
		if (
			this.props.incident.incident !== null
				? this.props.incident_key !== this.props.incident.incident.key
				: true
		) {
			return <ActivityIndicator size={'large'} />;
		} else {
			var incidentDetails = this.props.incident.incident.value;
			return (
				<Container style={styles.container}>
					<Header androidStatusBarColor="#1c76cb">
						<Left>
							<TouchableOpacity
								style={styles.backButton}
								onPress={() => Actions.pop()}
							>
								<Icon
									name="angle-left"
									size={35}
									color="white"
								/>
							</TouchableOpacity>
						</Left>
						<Body>
							<Text style={styles.title}>Incident Details</Text>
						</Body>
						<Right>
							<EditButtonIncident key={1} />
							<DeleteButtonIncident key={2} />
							<ShareButtonIncident key={3} />
						</Right>
					</Header>
					<ScrollView
						keyboardShouldPersistTaps="always"
						showsVerticalScrollIndicator={false}
					>
						{incidentDetails.image.isPresent ? (
							<View style={styles.avatarContainer}>
								<Image
									style={styles.image}
									resizeMethod={'resize'}
									source={{
										uri:
											'data:image/jpeg;base64, ' +
											incidentDetails.image.base64
									}}
								/>
							</View>
						) : null}
						<Card style={styles.card}>
							<CardItem>
								<Text style={styles.titleTextHeader}>
									Title
								</Text>
							</CardItem>
							<CardItem>
								<Text style={styles.titleTextDescription}>
									{incidentDetails.title}
								</Text>
							</CardItem>
						</Card>
						{incidentDetails.details !== '' ? (
							<Card style={styles.card}>
								<CardItem>
									<Text style={styles.titleTextHeader}>
										Description
									</Text>
								</CardItem>
								<CardItem>
									<Text style={styles.titleTextDescription}>
										{incidentDetails.details}
									</Text>
								</CardItem>
							</Card>
						) : null}
						<Card style={styles.card}>
							<CardItem>
								<MapView
									region={{
										latitude:
											incidentDetails.location.coordinates
												.latitude,
										longitude:
											incidentDetails.location.coordinates
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
													incidentDetails.location
														.coordinates.latitude,
												longitude:
													incidentDetails.location
														.coordinates.longitude
											}}
										/>
									)}
								</MapView>
							</CardItem>
						</Card>
					</ScrollView>
					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.fabButton}
						onPress={() => this.handleDirections()}
					>
						<IconDirection
							name="directions"
							size={30}
							style={styles.fabButtonIcon}
						/>
					</TouchableOpacity>
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
	incident: PropTypes.object,
	user: PropTypes.object,
	getIndvIncident: PropTypes.func.isRequired
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
			getIndvIncident: getIndvIncident
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
	incident: state.incident,
	user: state.login.userDetails
});

export default connect(mapStateToProps, matchDispatchToProps)(Incident);
