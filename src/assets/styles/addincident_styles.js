import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used in Add incident page.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	row_container: {
		flexDirection: 'row'
	},
	cameraContainer: {
		padding: height / 50
	},
	button_camera: {
		height: 40,
		backgroundColor: '#EEEEEE',
		marginHorizontal: width / 20,
		borderRadius: 4
	},
	cameraText: {
		color: 'black',
		marginTop: height / 50,
		marginLeft: width / 3
	},
	picker: {
		marginHorizontal: width / 20,
		width: width * 0.9,
		marginTop: height / 50,
		height: 40
	},
	CheckBox: {
		flexDirection: 'row',
		marginHorizontal: width / 20,
		marginTop: height / 47,
		marginLeft: width / 20
	},
	CheckBoxText: {
		marginTop: height / 72,
		marginLeft: width / 20
	},
	field_title: {
		marginHorizontal: width / 20,
		width: width * 0.9,
		marginTop: height / 50,
		height: 40
	},
	field_details: {
		marginHorizontal: width / 20,
		width: width * 0.9,
		marginTop: height / 50,
		height: 40
	},
	button_send: {
		alignItems: 'center',
		backgroundColor: '#000',
		padding: width / 30,
		width: width / 3,
		marginHorizontal: width / 3,
		marginTop: height / 50,
		marginBottom: height / 20,
		borderRadius: 10
	},
	field: {
		marginTop: height / 50
	},
	button_text: {
		color: 'white'
	}
});
