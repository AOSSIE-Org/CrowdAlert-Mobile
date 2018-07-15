import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the edit incident screen.
export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	textInput: {
		flex: 2,
		textAlign: 'right',
		color: '#4ebaaa'
		// borderBottomWidth: 1,
		// borderColor: 'black'
	},
	avatarContainer: {
		backgroundColor: '#63a4ff',
		alignItems: 'center',
		paddingTop: height / 100,
		paddingBottom: height / 80,
		marginBottom: height / 200
	},
	title: {
		marginLeft: width / 20,
		fontWeight: 'bold',
		fontSize: 25,
		color: '#fff'
	},
	imageText: {
		marginLeft: width / 80,
		paddingBottom: height / 50,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff'
	},
	imageChangeText: {
		marginLeft: width / 80,
		paddingTop: height / 40,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff'
	},
	incidentTitle: {
		width: width * 0.9,
		marginLeft: width / 20,
		paddingTop: height / 300
	},
	incidentDetail: {
		paddingTop: height / 300,
		width: width * 0.9,
		marginLeft: width / 20
	},
	incidentTitleTextContainer: {
		marginLeft: width / 20,
		paddingTop: height / 40,
		paddingBottom: height / 100
	},
	incidentDetailTextContainer: {
		marginLeft: width / 20,
		paddingTop: height / 60,
		paddingBottom: height / 100
	},
	incidentTitleText: {
		color: '#555',
		fontWeight: 'bold',
		fontSize: 17
	},
	incidentDetailText: {
		color: '#555',
		fontWeight: 'bold',
		fontSize: 17
	},
	image: {
		height: width / 2.2,
		width: width / 1.2,
		paddingTop: height / 300
	},
	getHelp: {
		flexDirection: 'row',
		marginLeft: width / 20,
		paddingTop: height / 40
	},
	Share: {
		flexDirection: 'row',
		marginLeft: width / 20,
		paddingTop: height / 30
	},
	getHelpText: {
		color: '#555',
		fontWeight: 'bold',
		fontSize: 17
	},
	Switch: {
		marginLeft: width / 2
	},
	SwitchShare: {
		marginLeft: width / 2.5
	},
	userName: {
		paddingTop: height / 30,
		fontSize: 17,
		color: 'black'
	},
	valueItem: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginHorizontal: width / 15
	},
	valueTextContainer: {
		// flex: 3,
		justifyContent: 'center'
	},
	valueText: {
		color: '#005b4f'
	},
	updateButton: {
		alignItems: 'center',
		backgroundColor: '#1e1e1e',
		padding: width / 30,
		marginHorizontal: width / 3,
		marginTop: height / 30,
		borderRadius: 17
	},
	updateText: {
		color: 'white'
	}
});
