import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on individual incident page
export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	heading: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 25,
		marginVertical: 10
	},
	timeContainerStyle: {
		minWidth: width * 0.25
	},
	iconStyle: {
		minWidth: width * 0.25
	},
	circleStyle: {
		marginTop: height / 30
	},
	timelineContainer: {
		// backgroundColor: 'yellow',
		marginHorizontal: width / 40
	},
	timeStyle: {
		textAlign: 'center',
		backgroundColor: '#0288D1',
		color: 'white',
		marginTop: height * 0.015,
		paddingVertical: height * 0.007
		// borderRadius: 13
	},
	detailContainerStyle: {
		backgroundColor: '#B3E5FC',
		marginBottom: height * 0.025,
		// marginHorizontal: 10,
		borderRadius: 15
	},
	descriptionStyle: {
		color: 'gray',
		paddingLeft: width * 0.03
	},
	titleStyle: {
		paddingLeft: width * 0.03
	}
});
