import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
	Picker,
	Modal,
	Image,
	StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import {
	Container,
	Content,
	Button,
	Card,
	CardItem,
	Header,
	Left,
	Body,
	Right,
	Icon,
	Title
} from 'native-base';
import { styles } from '../../assets/styles/incident_styles';
class Incident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMapReady: false
		};
	}
	onMapLayout = () => {
		this.setState({ isMapReady: true });
	};
	render() {
		console.log(this.props.details);
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

Incident.propTypes = {
	details: PropTypes.object
};

export default Incident;
