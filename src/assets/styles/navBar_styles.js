import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
//styling used for navigation bar on incident page.
export const styles = StyleSheet.create({
	backgroundStyle: {
		backgroundColor: '#fff',
		elevation: 5,
		width: width,
		height: height / 10
	},
	backarrowStyle: {
		flexDirection: 'row',
		marginLeft: width / 20,
		marginTop: height / 50,
		justifyContent: 'flex-start',
		color: '#555'
	},
	shareStyle: {
		marginTop: height / 50,
		marginLeft: width / 3,
		color: '#555'
	},
	deleteStyle: {
		marginTop: height / 50,
		marginLeft: width / 50,
		color: '#555'
	},
	titleText: {
		marginTop: height / 40,
		marginLeft: width / 15,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000'
	},
	container: { flexDirection: 'row' }
});
