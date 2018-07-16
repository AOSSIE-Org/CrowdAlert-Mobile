import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on individual incident page
export const styles = StyleSheet.create({
	titleTextHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000'
	},
	titleTextDescription: {
		fontSize: 15,
		marginTop: height / 400
	},
	title: {
		marginLeft: width / 20,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff'
	},
	container: {
		backgroundColor: '#63a4ff',
		flex: 1
	},
	card: {
		marginLeft: width / 40,
		width: width * 0.95
	},
	fabButtonIcon: {
		alignSelf: 'center',
		color: '#fff'
	},
	button: {
		width: width / 7.5,
		height: width / 7.5,
		backgroundColor: '#4ebaaa',
		justifyContent: 'center',
		position: 'absolute',
		right: width / 20,
		bottom: height / 25,
		elevation: 15,
		borderRadius: 35
	},
	avatarContainer: {
		backgroundColor: '#63a4ff',
		alignItems: 'center',
		marginBottom: height / 200
	},
	image: {
		height: height / 4,
		width: width / 1.1,
		paddingTop: height / 300,
		paddingBottom: height / 200
	},
	map: {
		flex: 1,
		width: width,
		height: height / 4
	},
	navigationContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	navigationIcon: {
		position: 'absolute',
		right: 10
	}
});
