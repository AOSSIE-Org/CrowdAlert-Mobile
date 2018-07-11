import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the Profile screen.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#63a4ff'
	},
	header: {
		height: height / 10
	},
	body: {
		marginLeft: width * 0.08
	},
	heading: {
		fontSize: 27
	},
	empty: {
		height: height * 0.11
	},
	box: {
		backgroundColor: 'white',
		borderRadius: 20,
		marginTop: height * 0.015,
		marginHorizontal: width / 20,
		paddingBottom: height / 20
	},
	avatarContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: height / 30
	},
	avatarOutline: {
		borderRadius: 100,
		position: 'absolute',
		top: 2 * height / 17,
		alignSelf: 'center',
		borderWidth: 3,
		borderColor: 'white'
	},
	noAvatarOutline: {
		borderWidth: 0
	},
	avatar: {
		height: width / 2.7,
		width: width / 2.7,
		borderRadius: 100
	},
	userName: {
		marginBottom: height / 20,
		fontSize: 25,
		fontWeight: 'bold',
		color: '#005b4f'
	},
	loader: {
		alignSelf: 'center'
	}
});
