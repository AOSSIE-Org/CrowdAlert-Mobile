import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used in main login page containing all login options.
export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	avatarContainer: {
		backgroundColor: '#7fa7e8',
		alignItems: 'center',
		height: width / 3.5 + 3 * height / 30 + height / 60
	},
	avatar: {
		// justifyContent: 'center',
		marginTop: height / 30,
		height: width / 3.5,
		width: width / 3.5,
		borderRadius: 100
	},
	userName: {
		marginTop: height / 60,
		fontSize: 17,
		color: 'black'
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
