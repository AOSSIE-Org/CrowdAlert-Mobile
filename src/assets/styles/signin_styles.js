import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
//styling used in signin page.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	field_Pass: {
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
	},
	button_text_forgot: {
		color: 'grey',
		fontSize: 12
	},
	button_forgot: {
		marginHorizontal: width / 20,
		marginTop: height / 30
	}
});
