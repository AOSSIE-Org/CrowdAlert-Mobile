import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used for the settings page.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	backButton: {
		width: width / 7,
		height: height / 13,
		justifyContent: 'center'
	},
	header: {
		height: height / 10,
		backgroundColor: '#63a4ff'
	},
	slider: {
		width: width,
		marginBottom: height / 80
	},
	list: {
		marginRight: width / 15,
		marginLeft: width / 40,
		marginTop: height / 20
	},
	listItem: {
		marginBottom: height / 40,
		borderBottomWidth: 1.4,
		borderColor: 'black'
	},
	option: {
		flexDirection: 'row'
	},
	rightSection: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: width / 30
	},
	sliderValue: {
		marginRight: width / 50
	},
	footer: {
		backgroundColor: '#63a4ff'
	}
});
