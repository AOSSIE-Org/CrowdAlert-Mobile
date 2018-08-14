import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used in main login page containing all login options.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#63a4ff'
	},
	heading: {
		flex: 1,
		alignItems: 'center',
		paddingTop: height / 10
	},
	logo: {
		height: width / 2.5,
		width: width / 2.5
	},
	welcome: {
		fontSize: 50,
		color: '#fff',
		paddingTop: height / 20
	},
	login_text_heading: {
		marginBottom: height / 60,
		textAlign: 'center',
		fontSize: 16,
		color: '#fff'
	},
	button_container: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingBottom: height / 20,
		paddingHorizontal: width / 5
	},
	loginButton: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		margin: width / 80,
		elevation: 10
	},
	button_fb: {
		backgroundColor: '#3B5998'
	},
	button_google: {
		backgroundColor: '#d34836'
	},
	button_email: {
		backgroundColor: '#000',
		borderColor: 'black',
		borderWidth: 1.5
	},
	button_register: {
		marginRight: width / 6,
		width: width / 4,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: width / 25,
		paddingVertical: height / 70,
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 1.5
	},
	button_login_text: {
		color: 'white',
		padding: height / 70
	}
});
