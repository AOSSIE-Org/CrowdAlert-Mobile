import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used for the settings page.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingHorizontal: width / 20
		// paddingTop: height / 30
	},
	slider: {
		height: 50,
		marginTop: height / 40
	},
	toggleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: height / 40
	},
	toggleText: {
		alignSelf: 'center'
	}
});
