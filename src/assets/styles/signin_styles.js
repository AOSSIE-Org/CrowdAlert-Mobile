import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used in signin page.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#63a4ff'
	},
	backButton: {
		paddingTop: height / 50,
		paddingLeft: width / 60
	},
	box: {
		backgroundColor: 'white',
		marginTop: height / 20,
		marginHorizontal: width / 10,
		elevation: 10,
		borderRadius: 10
	},
	heading: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#2d2d2d',
		textAlign: 'center',
		marginVertical: height / 40
	},
	input_field: {
		marginHorizontal: width / 20,
		marginTop: height / 50,
		color: '#1c76cb',
		fontSize: 15.5
	},
	button_send: {
		alignItems: 'center',
		backgroundColor: '#00897b',
		marginHorizontal: width / 4.5,
		marginVertical: height / 40,
		borderRadius: 10
	},
	button_text: {
		padding: width / 30,
		color: 'white'
	},
	button_forgot: {
		marginBottom: height / 50,
		alignItems: 'center'
	},
	button_text_forgot: {
		fontSize: 13
	},
	button_signup: {
		flexDirection: 'row',
		backgroundColor: 'white',
		marginTop: height / 100,
		marginHorizontal: width / 10,
		padding: height / 50,
		elevation: 10,
		justifyContent: 'center',
		borderRadius: 10
	},
	signup_text: {
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		fontSize: 15
	}
});
