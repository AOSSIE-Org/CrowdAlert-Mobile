import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on global feed screen
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
	loader: {
		flex: 1,
		justifyContent: 'center'
	},
	circleStyle: {
		marginTop: height / 25
	},
	timelineContainer: {
		marginLeft: width / 20,
		marginRight: width / 13
	},
	eventContainer: {
		paddingLeft: width / 50,
		paddingVertical: height / 100,
		flex: 1,
		flexDirection: 'row',
		marginBottom: height / 50
	},
	timeContainer: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	time: {
		fontSize: 12,
		color: '#419b8e'
	},
	infoContainer: {
		flex: 7,
		marginLeft: width / 20
	},
	title: {
		fontSize: 17,
		color: '#005b4f',
		marginBottom: 3.8
	},
	details: {
		color: '#1c76cb',
		fontSize: 13
	}
});
