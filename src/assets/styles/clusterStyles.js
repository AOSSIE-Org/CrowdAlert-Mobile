import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	clusterOuter: {
		width: 40,
		height: 40,
		borderRadius: 40 / 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cluster: {
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	clusterText: {
		fontSize: 12,
		color: 'white'
	}
});
