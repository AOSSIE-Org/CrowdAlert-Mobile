import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on emergencyPlaces page.
export const styles = StyleSheet.create({
	headText: {
		color: '#555',
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
		color: '#444'
	},
	icon: {
		color: '#000'
	},
	card: {
		width: width * 0.92,
		marginLeft: width / 20,
		borderRadius: 30,
		borderWidth: 0,
		paddingLeft: width / 100,
		marginTop: height / 80
	}
});
