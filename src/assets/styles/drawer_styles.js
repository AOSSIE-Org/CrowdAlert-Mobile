import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const drawerWidth = width * 0.65;

//Styling for the side drawer
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e1e1e'
	},
	userHeader: {
		flex: 1,
		flexDirection: 'row',
		margin: height / 30,
		marginBottom: height / 30
	},
	userImage: {
		height: width / 6,
		width: width / 6,
		borderRadius: 100,
		marginRight: width / 23
	},
	userName: {
		justifyContent: 'center',
		alignSelf: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		marginRight: width * 0.2
	},
	option: {
		color: 'white',
		fontSize: 15,
		margin: width / 50,
		marginLeft: width / 17
	},
	bar: {
		width: width,
		backgroundColor: 'white',
		height: 1,
		marginBottom: height / 30
	},
	logout: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	logoutIcon: {
		marginLeft: width / 17,
		marginRight: width / 80
	},
	logoutOption: {
		color: 'white',
		fontSize: 15,
		margin: width / 50
	}
});
