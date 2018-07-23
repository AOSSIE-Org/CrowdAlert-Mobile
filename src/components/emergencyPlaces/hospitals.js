import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../assets/styles/emergencyPlaces_styles';
import {
	Content,
	Container,
	List,
	ListItem,
	Left,
	Right,
	Body,
	Thumbnail,
	Button
} from 'native-base';
import getDirections from 'react-native-google-maps-directions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

/**
 * Screen for displaying hospitals near a user.
 * @extends React
 */
export default class Hospitals extends React.Component {
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
	 * @return  returns the UI of list
	 */
	_renderCard() {
		items = this.props.item;
		return (
			<View>
				<List>
					{items.map(item => (
						<TouchableOpacity key={item.id}>
							<ListItem thumbnail style={styles.card}>
								<Left>
									<Thumbnail
										style={styles.image}
										source={{ uri: item.icon }}
									/>
								</Left>
								<Body>
									<Text style={styles.cardText}>
										{item.name}
									</Text>
									<Text note>{item.vicinity}</Text>
								</Body>
								<Right>
									<Button
										transparent
										onPress={() =>
											this.handleNavigation(
												item.geometry.location
											)
										}
									>
										<Icon size={22} name="directions" />
									</Button>
								</Right>
							</ListItem>
						</TouchableOpacity>
					))}
				</List>
			</View>
		);
	}

	render() {
		return (
			<Container>
				<Content>
					<View>{this._renderCard()}</View>
				</Content>
			</Container>
		);
	}
}
