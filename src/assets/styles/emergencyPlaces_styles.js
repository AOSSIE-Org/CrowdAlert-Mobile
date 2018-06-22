import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on emergencyPlaces page.
export const styles = StyleSheet.create({
	headText: {
		color: '#000',
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: height / 40,
		marginBottom: height / 40,
		marginLeft: width / 20
	},
	image: {
		height: height / 22,
		width: width / 15
	},
	cardText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000'
	},
	icon: {
		color: '#000'
	}
});
