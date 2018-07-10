import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Tabs, Tab, TabHeading } from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapScreen from './map/mapScreen';
import FeedScreen from './feed';
import { styles } from '../../assets/styles/mapFeed_styles';

/**
 * Map screen showing google maps with search location and add incident feature
 * @extends Component
 */
export default class MapFeedScreen extends Component {
	render() {
		return (
			<Tabs locked tabBarPosition="bottom">
				<Tab
					heading={
						<TabHeading>
							<Icon
								color="white"
								size={25}
								name="map"
								style={styles.tabIcon}
							/>
							<Text style={styles.tabText}>Map</Text>
						</TabHeading>
					}
				>
					<MapScreen />
				</Tab>
				<Tab
					heading={
						<TabHeading>
							<Icon
								color="white"
								size={25}
								name="feed"
								style={styles.tabIcon}
							/>
							<Text style={styles.tabText}>Global Feed</Text>
						</TabHeading>
					}
				>
					<FeedScreen />
				</Tab>
			</Tabs>
		);
	}
}
