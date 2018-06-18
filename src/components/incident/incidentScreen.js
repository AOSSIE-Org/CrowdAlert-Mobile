import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem } from 'native-base';
import { styles } from '../../assets/styles/incident_styles';
import getDirections from 'react-native-google-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';

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

	handleDirections() {
		var coordinates = this.props.incidentDetails.location.coordinates;
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
		var incident = this.props.incidentDetails;
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
							<Text style={styles.titleTextHeader}>Title</Text>
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
									<Text style={styles.titleTextDescription}>
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
										incident.location.coordinates.latitude,
									longitude:
										incident.location.coordinates.longitude,
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
												incident.location.coordinates
													.latitude,
											longitude:
												incident.location.coordinates
													.longitude
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
/**
 * confirms that the props being used
 * on this page have their specified type.
 * @type {details}
 */
Incident.propTypes = {
	details: PropTypes.object
};

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
	incidentDetails: state.incident.incident.value
});

export default connect(mapStateToProps, null)(Incident);
