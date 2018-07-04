import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from '../../../assets/styles/clusterStyles';
import PropTypes from 'prop-types';

/**
 * It displays the individual cluster on the map.
 * @param {JSON} item The cluster description containing cluster_id and incident count in it.
 * @param {String} colorIncidents Cluster color for incidents
 * @param {String} colorEmergencyPlaces	Cluster color for emergency places.
 * @param {String} type Type of cluster place or incident
 * @param {Array} itemsInCluster Items within a cluster.
 */
const Cluster = ({
	item,
	colorIncidents,
	colorEmergencyPlaces,
	type,
	itemsInCluster
}) => {
	const { point_count, cluster_id } = item.properties;
	const coordinates = item.geometry.coordinates;
	var pointColor = null;

	// If incident than cluster color must be black else red.
	if (type === 'incidents') {
		pointColor = colorIncidents;
	} else {
		pointColor = colorEmergencyPlaces;
	}
	return (
		<MapView.Marker
			coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
			width={41}
			height={41}
			anchor={{ x: 0.5, y: 0.5 }}
			title={'Tap here to see all incidents'}
			onCalloutPress={() => {}}
		>
			<View
				style={[
					styles.clusterOuter,
					{ backgroundColor: `rgba(${pointColor}, 0.25)` }
				]}
			>
				<View
					style={[
						styles.cluster,
						{ backgroundColor: `rgb(${pointColor})` }
					]}
				>
					<TouchableOpacity>
						<Text style={styles.clusterText}>{point_count}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</MapView.Marker>
	);
};

/**
 * Checks that the functions specified as isRequired are present and warns if
 * the props used on this page does not meet the specified type.
 */
Cluster.propTypes = {
	item: PropTypes.object,
	colorIncidents: PropTypes.string,
	colorEmergencyPlaces: PropTypes.string,
	type: PropTypes.string,
	itemsInCluster: PropTypes.array
};
Cluster.defaultProps = {
	colorIncidents: '0,0,0',
	colorEmergencyPlaces: '180,0,0'
};

export default Cluster;
