import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on individual incident page
export const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: 'center'
	},
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
	backButton: {
		width: width / 12,
		height: height / 13,
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		marginLeft: width / 40,
		width: width * 0.95
	},
	fabButtonIcon: {
		alignSelf: 'center',
		color: '#fff'
	},
	fabButton: {
		width: width / 7.5,
		height: width / 7.5,
		backgroundColor: '#4ebaaa',
		justifyContent: 'center',
		position: 'absolute',
		right: width / 20,
		bottom: height / 35,
		elevation: 15,
		borderRadius: 35
	},
	avatarContainer: {
		backgroundColor: '#63a4ff',
		alignItems: 'center',
		marginVertical: height / 100,
		marginHorizontal: width / 30
	},
	image: {
		height: height / 2.7,
		width: width
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
