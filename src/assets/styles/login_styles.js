import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used in main login page containing all login options.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	headerImage: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		height: width / 4,
		width: width / 4
	},
	welcome: {
		fontSize: 50,
		textAlign: 'center',
		marginVertical: height / 80
	},
	button_container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: width / 25,
		marginVertical: height / 80
	},
	button_signin: {
		marginLeft: width / 6,
		width: width / 4,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: width / 25,
		paddingVertical: height / 70,
		borderRadius: 3,
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
	Text: {
		marginVertical: height / 70,
		marginLeft: width / 10,
		fontSize: 17,
		color: '#000'
	},
	button_text: {
		color: '#000'
	},
	button_text_social: {
		color: 'white',
		padding: height / 100
	},
	button_fb: {
		backgroundColor: '#3B5998',
		width: width / 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		marginLeft: width / 6
	},
	button_google: {
		backgroundColor: '#d34836',
		width: width / 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		marginRight: width / 6
	}
});
