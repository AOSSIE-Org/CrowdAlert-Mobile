import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Card, CardItem } from 'native-base';
import { styles } from '../../assets/styles/incident_styles';

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
	 * The UI of incident screen.
	 * @return the incident screen.
	 */
	render() {
		return (
			<Container>
				<Content>
					{this.props.details.image.isPresent ? (
						<Card>
							<CardItem>
								<Image
									style={styles.image}
									resizeMethod={'resize'}
									source={{
										uri:
											'data:image/jpeg;base64, ' +
											this.props.details.image.base64
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
								{this.props.details.title}
							</Text>
						</CardItem>
						<View>
							<CardItem>
								<Text style={styles.titleTextHeader}>
									Description
								</Text>
							</CardItem>
							<CardItem>
								<Text style={styles.titleTextDescription}>
									{this.props.details.details}
								</Text>
							</CardItem>
						</View>
					</Card>
					<Card>
						<CardItem>
							<MapView
								region={{
									latitude: this.props.details.location
										.coordinates.latitude,
									longitude: this.props.details.location
										.coordinates.longitude,
									latitudeDelta: 0.0052,
									longitudeDelta: 0.0052
								}}
								onLayout={this.onMapLayout}
								style={styles.map}
							>
								{this.state.isMapReady && (
									<MapView.Marker
										coordinate={{
											latitude: this.props.details
												.location.coordinates.latitude,
											longitude: this.props.details
												.location.coordinates.longitude
										}}
									/>
								)}
							</MapView>
						</CardItem>
					</Card>
					<Card>
						<CardItem>
							<Text>Navigate</Text>
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

export default Incident;
