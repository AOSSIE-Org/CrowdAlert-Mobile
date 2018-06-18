import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the profile editing screen.
export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	field_Pass: {
		marginHorizontal: width / 20,
		width: width * 0.9,
		marginTop: height / 50,
		height: height / 18
	},
	updateButton: {
		alignItems: 'center',
		backgroundColor: '#000',
		padding: width / 30,
		width: width / 3,
		marginHorizontal: width / 3,
		marginTop: height / 50,
		marginBottom: height / 20,
		borderRadius: 10
	},
	updateText: {
		color: 'white'
	},
	image: {
		flex: 1,
		height: height / 4,
		width: null,
		margin: width / 30
	},
	button_camera: {
		height: height / 15,
		width: width / 3,
		backgroundColor: 'black',
		borderRadius: 4,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	cameraText: {
		color: 'white',
		alignSelf: 'center'
	}
});
