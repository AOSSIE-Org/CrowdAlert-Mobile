import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on individual incident page
export const styles = StyleSheet.create({
	tabIcon: {
		margin: width / 50
	},
	tabText: {
		color: 'white',
		fontSize: 15
	},
	loaderContainer: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},
	marker_gif: {
		height: width * 0.8,
		width: width * 0.8
	},
	loadingText: {
		marginTop: height / 30,
		marginHorizontal: width / 20,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1c76cb',
		textAlign: 'center'
	}
});
