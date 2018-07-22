import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	clusterOuter: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cluster: {
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	clusterText: {
		fontSize: 12,
		color: 'white'
	},
	colorIncidents: {
		backgroundColor: 'rgba(0,0,0,1)'
	},
	colorEmergencyPlaces: {
		backgroundColor: 'rgba(180,0,0,1)'
	},
	colorIncidentsOuter: {
		backgroundColor: 'rgba(0,0,0, 0.25)'
	},
	colorEmergencyPlacesOuter: {
		backgroundColor: 'rgba(180,0,0, 0.25)'
	},
	markerIcon: {
		height: 40,
		width: 40
	}
});
