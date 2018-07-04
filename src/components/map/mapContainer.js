import React, { Component } from 'react';
import GeoJSON from 'geojson';
import supercluster from 'supercluster';
import { ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapMarker from './markers/marker';
import Cluster from './markers/cluster';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
const initialRegion = {
	latitude: 55.676098,
	longitude: 12.568337,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};
let northeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2
};
let southwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2
};
let northwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2
};
let southeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2
};

/**
 * Handles clustring of markers on map.
 * @extends Component
 */
class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clustersIncidents: [],
			clustersPlaces: [],
			curr_region: {
				latitude: this.props.curr_location.latitude,
				longitude: this.props.curr_location.longitude,
				latitudeDelta: 0.0052,
				longitudeDelta: 0.0052
			},
			incidentsOfCluster: [],
			emergencyPlacesOfCluster: []
		};
	}

	/**
	 * Used to fetch incidents from store and transform the incident array
	 * so that the geo json library can parse the incidents
	 * @param  {String} domain Used for filtering
	 * @return {Array} Returns incidents
	 */
	generateIncidents(domain) {
		incidents = [];
		if (this.props.all_incidents !== null) {
			//logic for filter
			var incidents_marker = this.props.all_incidents.filter(function(
				item
			) {
				if (domain === 'all') {
					return true;
				} else {
					return item.value.category === domain;
				}
			});
			for (var i = 0; i < incidents_marker.length; i++) {
				var obj = {
					latitude: null,
					longitude: null,
					incident: null
				};
				obj.latitude =
					incidents_marker[i].value.location.coordinates.latitude;
				obj.longitude =
					incidents_marker[i].value.location.coordinates.longitude;
				obj.incident = incidents_marker[i];
				incidents.push(obj);
			}
			return incidents;
		}
	}

	/**
	 * Used to fetch  hospitals from store and transform
	 * so that the geo json library can parse the nearby hospitals.
	 * @return {Array} Returns incidents
	 */
	generateEmergencyPlacesHospitals() {
		emergencyPlacesHospitals = [];
		if (this.props.emergencyPlaces.hospitals !== null) {
			var data = this.props.emergencyPlaces.hospitals;
			for (var i = 0; i < data.length; i++) {
				var obj = {
					latitude: null,
					longitude: null,
					name: null,
					vicinity: null,
					icon: null
				};
				obj.latitude = data[i].geometry.location.lat;
				obj.longitude = data[i].geometry.location.lng;
				obj.name = data[i].name;
				obj.vicinity = data[i].vicinity;
				obj.icon = data[i].icon;
				emergencyPlacesHospitals.push(obj);
			}
			return emergencyPlacesHospitals;
		}
	}

	/**
	 * Used to fetch  police stations from store and transform
	 * so that the geo json library can parse the nearby police stations.
	 * @return {Array} Returns incidents
	 */
	generateEmergencyPlacesPoliceStations() {
		emergencyPlacesPoliceStations = [];
		if (this.props.emergencyPlaces.policeStations !== null) {
			var data = this.props.emergencyPlaces.policeStations;
			for (var i = 0; i < data.length; i++) {
				var obj = {
					latitude: null,
					longitude: null,
					name: null,
					vicinity: null,
					icon: null
				};
				obj.latitude = data[i].geometry.location.lat;
				obj.longitude = data[i].geometry.location.lng;
				obj.name = data[i].name;
				obj.vicinity = data[i].vicinity;
				obj.icon = data[i].icon;
				emergencyPlacesPoliceStations.push(obj);
			}
			return emergencyPlacesPoliceStations;
		}
	}

	/**
	 * It creates a cluster of incidents and emergency places.
	 * @param  {JSON} data Incidents or emergency places to cluster.
	 * @return {JSON}      Returns an object according to norms of geo json.
	 */
	_createCluster(data) {
		if (data != null) {
			const items = GeoJSON.parse(data, {
				Point: ['latitude', 'longitude']
			});
			const cluster = supercluster({
				radius: 60,
				maxZoom: 16,
				nodeSize: 64
			});
			cluster.load(items.features);
			return cluster;
		}
	}

	/**
	 * Gets the zoom level of the map which is used for clustering.
	 * @param  {JSON} region The description of region
	 * @return {Float}        Return zoom level.
	 */
	_getZoomLevel(region) {
		const angle = region.longitudeDelta;
		const level = Math.round(Math.log(360 / angle) / Math.LN2);
		return level;
	}

	/**
	 * This method makes clusters of incidents and emergency places
	 * depending upon the map region and zoom level.
	 * @param  {JSON} region Region of map
	 * @return Makes clusters.
	 */
	_createRegions(
		region,
		incidents,
		emergencyPlacesHospitals,
		emergencyPlacesPoliceStations
	) {
		this.setState({ emergencyPlacesOfCluster: [], incidentsOfCluster: [] });

		// clustering of incidents
		const clusterIncident = this._createCluster(incidents);
		var itemsIncident = null;
		if (clusterIncident !== null) {
			itemsIncident = clusterIncident.getClusters(
				[
					southwest.longitude,
					southwest.latitude,
					northeast.longitude,
					northeast.latitude
				],
				this._getZoomLevel(region)
			);
			this.setState({
				clustersIncidents: itemsIncident
			});
		}
		leavesOfIncidents = [];
		leavesOfEmergencyPlaces = [];

		//Gets leaves of cluster i.e individual incidents.
		for (var i = 0; i < itemsIncident.length; i++) {
			if ('cluster' in itemsIncident[i].properties) {
				const clusterLeaves = clusterIncident.getLeaves(
					itemsIncident[i].properties.cluster_id,
					(limit = 10),
					(offset = 0)
				);
				leavesOfIncidents.push(clusterLeaves);
			}
		}
		this.setState({ incidentsOfCluster: leavesOfIncidents });

		// clustering of emergency places.
		emergencyPlaces = [];
		if (emergencyPlacesHospitals !== null) {
			for (var i = 0; i < emergencyPlacesHospitals.length; i++) {
				emergencyPlaces.push(emergencyPlacesHospitals[i]);
			}
		}
		if (emergencyPlacesPoliceStations !== null) {
			for (var i = 0; i < emergencyPlacesPoliceStations.length; i++) {
				emergencyPlaces.push(emergencyPlacesPoliceStations[i]);
			}
		}
		const clusterEmergencyPlaces = this._createCluster(emergencyPlaces);
		var itemsEmergencyPlaces = null;
		if (clusterEmergencyPlaces !== null) {
			itemsEmergencyPlaces = clusterEmergencyPlaces.getClusters(
				[
					southwest.longitude,
					southwest.latitude,
					northeast.longitude,
					northeast.latitude
				],
				this._getZoomLevel(region)
			);
			this.setState({
				clustersPlaces: itemsEmergencyPlaces
			});
		}

		// gets leaves of emergency places.
		for (var i = 0; i < itemsEmergencyPlaces.length; i++) {
			if ('cluster' in itemsEmergencyPlaces[i].properties) {
				const clusterLeaves = clusterEmergencyPlaces.getLeaves(
					itemsEmergencyPlaces[i].properties.cluster_id,
					(limit = 10),
					(offset = 0)
				);
				leavesOfEmergencyPlaces.push(clusterLeaves);
			}
		}
		this.setState({ emergencyPlacesOfCluster: leavesOfEmergencyPlaces });
	}

	/**
	 * Determines the region being viewed by the user.
	 * @param  {JSON} region Region in vire of user.
	 * @return On change the map is updated and clustering takes place.
	 */
	onRegionChangeComplete(
		region,
		incidents,
		emergencyPlacesHospitals,
		emergencyPlacesPoliceStations
	) {
		northeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2
		};
		southwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2
		};
		northwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2
		};
		southeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2
		};
		this._createRegions(
			region,
			incidents,
			emergencyPlacesHospitals,
			emergencyPlacesPoliceStations
		);
	}

	render() {
		var incidents = null;
		var emergencyPlacesHospitals = null;
		var emergencyPlacesPoliceStations = null;
		if (this.props.all_incidents !== null) {
			incidents = this.generateIncidents(this.props.domain);
		}
		if (this.props.emergencyPlaces.hospitals !== null) {
			emergencyPlacesHospitals = this.generateEmergencyPlacesHospitals();
		}
		if (this.props.emergencyPlaces.policeStations !== null) {
			emergencyPlacesPoliceStations = this.generateEmergencyPlacesPoliceStations();
		}

		return (
			<MapView
				initialRegion={this.state.curr_region}
				onRegionChangeComplete={x => {
					this.onRegionChangeComplete(
						x,
						incidents,
						emergencyPlacesHospitals,
						emergencyPlacesPoliceStations
					);
				}}
				{...this.props}
			>
				{/* Maps incidents */}
				{this.state.clustersIncidents.map(
					(item, i) =>
						item.properties.cluster === true ? (
							<Cluster
								key={i}
								item={item}
								itemsInCluster={this.state.incidentsOfCluster}
								type={'incidents'}
							/>
						) : (
							<MapMarker key={i} item={item} />
						)
				)}
				{/* Maps emergency places */}
				{this.state.clustersPlaces.map(
					(item, i) =>
						item.properties.cluster === true ? (
							<Cluster
								key={i}
								item={item}
								itemsInCluster={
									this.state.emergencyPlacesOfCluster
								}
								type={'places'}
							/>
						) : (
							<MapMarker key={i} item={item} />
						)
				)}
				{/* Maps current location */}
				<Marker.Animated
					ref={marker => {
						this.marker = marker;
					}}
					coordinate={{
						latitude: this.props.curr_location.latitude,
						longitude: this.props.curr_location.longitude
					}}
				/>
			</MapView>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if
 * the props used on this page does not meet the specified type.
 */
MapContainer.propTypes = {
	curr_location: PropTypes.object,
	emergencyPlaces: PropTypes.object,
	all_incidents: PropTypes.array
};

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
	curr_location: state.location.curr_coordinates,
	emergencyPlaces: state.emergencyPlaces,
	all_incidents: state.incident.all_incidents,
	incident: state.incident
});

export default connect(mapStateToProps)(MapContainer);
