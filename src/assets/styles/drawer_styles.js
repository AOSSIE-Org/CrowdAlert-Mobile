import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2f2e30'
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
		marginRight: width / 20
	},
	userName: {
		justifyContent: 'center',
		alignSelf: 'center',
		fontSize: 17,
		color: 'white'
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
	}
});
