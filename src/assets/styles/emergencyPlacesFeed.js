import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the add incident screen.
export const styles = StyleSheet.create({
	menuButton: {
		paddingLeft: width / 20
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
