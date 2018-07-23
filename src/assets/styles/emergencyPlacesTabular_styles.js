import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the emergencyPlaces screen.
export const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: 'center'
	},
	tabIcon: {
		margin: width / 50
	},
	tabText: {
		color: 'white',
		fontSize: 15
	},
	title: {
		marginLeft: width / 15,
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	}
});
