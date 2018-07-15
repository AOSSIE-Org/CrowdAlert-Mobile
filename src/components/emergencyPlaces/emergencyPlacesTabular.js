import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
	Tabs,
	Tab,
	TabHeading,
	Header,
	Container,
	Left,
	Icon,
	Body
} from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Hospitals from './hospitals';
import PoliceStations from './policeStations';
import { styles } from '../../assets/styles/emergencyPlacesFeed';
import getTheme from '../../assets/styles/native-base-theme/components';
import platform from '../../assets/styles/native-base-theme/variables/platform';

/**
 * Emergency Places screen showing hospitals and police stations.
 * @extends Component
 */
export default class Emergency extends Component {
	render() {
		return (
			<Container>
				<Header hasTabs>
					<Left>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => Actions.drawerOpen()}
						>
							<Icon name="menu" size={40} color="white" />
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>Emergency Places</Text>
					</Body>
				</Header>
				<Tabs locked tabBarPosition="top">
					<Tab
						heading={
							<TabHeading>
								<Icon
									color="white"
									size={25}
									name="md-medkit"
									style={styles.tabIcon}
								/>
								<Text style={styles.tabText}>Hospitals</Text>
							</TabHeading>
						}
					>
						<Hospitals />
					</Tab>
					<Tab
						heading={
							<TabHeading>
								<Icon
									color="white"
									size={25}
									name="md-walk"
									style={styles.tabIcon}
								/>
								<Text style={styles.tabText}>
									Police Stations
								</Text>
							</TabHeading>
						}
					>
						<PoliceStations />
					</Tab>
				</Tabs>
			</Container>
		);
	}
}
