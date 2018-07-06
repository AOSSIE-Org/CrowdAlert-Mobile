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
		this.northeast = {
			latitude:
				this.state.curr_region.latitude +
				this.state.curr_region.latitudeDelta / 2,
			longitude:
				this.state.curr_region.longitude +
				this.state.curr_region.longitudeDelta / 2
		};
		this.southwest = {
			latitude:
				this.state.curr_region.latitude -
				this.state.curr_region.latitudeDelta / 2,
			longitude:
				this.state.curr_region.longitude -
				this.state.curr_region.longitudeDelta / 2
		};
		this.northwest = {
			latitude:
				this.state.curr_region.latitude -
				this.state.curr_region.latitudeDelta / 2,
			longitude:
				this.state.curr_region.longitude +
				this.state.curr_region.longitudeDelta / 2
		};
		this.southeast = {
			latitude:
				this.state.curr_region.latitude +
				this.state.curr_region.latitudeDelta / 2,
			longitude:
				this.state.curr_region.longitude -
				this.state.curr_region.longitudeDelta / 2
		};
	}

	/**
	 * Used to fetch incidents from store and transform them so that the geo json
	 * library can parse the incidents
	 * @param  {String} domain Used for filtering
	 * @return {Array} Returns incidents
	 */
	generateIncidents(domain) {
		incidents = [];
		//logic for filter
		var incidents_marker = this.props.all_incidents.filter(function(item) {
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

	/**
	 * Used to fetch  hospitals and police stations from store and transform them
	 * so that the geo json library can parse the nearby hospitals.
	 * @return {Array} Returns incidents
	 */
	generateEmergencyPlaces() {
		emergencyPlaces = [];
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
			emergencyPlaces.push(obj);
		}
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
			emergencyPlaces.push(obj);
		}
		return emergencyPlaces;
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
	_createRegions(region, incidents, emergencyPlaces) {
		// clustering of incidents
		const clusterIncident = this._createCluster(incidents);
		var itemsIncident = null;
		itemsIncident = clusterIncident.getClusters(
			[
				this.southwest.longitude,
				this.southwest.latitude,
				this.northeast.longitude,
				this.northeast.latitude
			],
			this._getZoomLevel(region)
		);

		//Gets leaves of cluster i.e individual incidents.
		leavesOfIncidents = [];
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

		// clustering of emergency places.
		const clusterEmergencyPlaces = this._createCluster(emergencyPlaces);
		var itemsEmergencyPlaces = null;
		itemsEmergencyPlaces = clusterEmergencyPlaces.getClusters(
			[
				this.southwest.longitude,
				this.southwest.latitude,
				this.northeast.longitude,
				this.northeast.latitude
			],
			this._getZoomLevel(region)
		);

		// gets leaves of emergency places.
		leavesOfEmergencyPlaces = [];
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

		this.setState({
			curr_region: region,
			emergencyPlacesOfCluster: leavesOfEmergencyPlaces,
			clustersPlaces: itemsEmergencyPlaces,
			incidentsOfCluster: leavesOfIncidents,
			clustersIncidents: itemsIncident
		});
	}

	/**
	 * Determines the region being viewed by the user.
	 * @param  {JSON} region Region in vire of user.
	 * @param  {Object} props  Passing the latest props(if there) to update this.props
	 * @return On change the map is updated and clustering takes place.
	 */
	onRegionChangeComplete(region, props) {
		this.northeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2
		};
		this.southwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2
		};
		this.northwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2
		};
		this.southeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2
		};

		props !== null ? (this.props = props) : null;
		if (
			this.props.all_incidents !== null &&
			this.props.emergencyPlaces.hospitals !== null &&
			this.props.emergencyPlaces.policeStations !== null
		) {
			this._createRegions(
				region,
				this.generateIncidents(this.props.incident.domain),
				this.generateEmergencyPlaces()
			);
		}
	}

	//Triggerinng on propChange like filtering/adding/modifying incidents.
	componentWillReceiveProps(nextProps) {
		if (nextProps.incident !== this.props.incident) {
			this.onRegionChangeComplete(this.state.curr_region, nextProps);
		}
	}

	render() {
		if (this.props.incident.loading && this.props.emergencyPlaces.loading) {
			return <ActivityIndicator size={'large'} />;
		} else {
			return (
				<MapView
					initialRegion={this.state.curr_region}
					onRegionChangeComplete={region => {
						this.onRegionChangeComplete(region, null);
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
									itemsInCluster={
										this.state.incidentsOfCluster
									}
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
}

/**
 * Checks that the functions specified as isRequired are present and warns if
 * the props used on this page does not meet the specified type.
 */
MapContainer.propTypes = {
	curr_location: PropTypes.object,
	emergencyPlaces: PropTypes.object,
	incident: PropTypes.object,
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
