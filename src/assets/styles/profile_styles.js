import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the Profile screen.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#63a4ff'
	},
	header: {
		marginLeft: width * 0.18
	},
	heading: {
		fontSize: 25
	},
	avatarContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: height / 30
	},
	avatar: {
		height: width / 2.7,
		width: width / 2.7,
		borderRadius: 100
	},
	userName: {
		marginTop: height / 50,
		fontSize: 19,
		color: '#1e1e1e'
	},
	otherInfoContainer: {
		marginHorizontal: width / 30,
		marginVertical: height / 80
	},
	otherInfoHead: {
		fontSize: 15,
		color: 'black'
	},
	otherInfoValue: {
		fontSize: 15
	},
	flatListContainer: {
		marginVertical: height / 50
	},
	incidentContainer: {
		padding: width / 30,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: width / 50,
		marginHorizontal: width / 50
	},
	incidentsImage: {
		flex: 1,
		alignSelf: 'center',
		width: width / 9,
		height: width / 9,
		marginHorizontal: width / 20,
		borderRadius: 150
	},
	incidentTextContainer: {
		flex: 6
	},
	incident: {
		padding: width * 0.005,
		fontSize: 17
	}
});
