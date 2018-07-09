import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the Search Bar
const searchBarStyle = {
	container: {
		backgroundColor: 'transparent',
		marginTop: height / 70
	},
	textInputContainer: {
		backgroundColor: 'white',
		borderTopWidth: 0,
		borderBottomWidth: 0,
		width: width * 0.95,
		height: height * 0.07
	},
	textInput: {
		backgroundColor: 'white',
		color: 'rgba(0,0,0,0.7)',
		fontSize: 14,
		height: height * 0.05
	},
	listView: {
		backgroundColor: 'rgba(256,256,256,0.95)',
		marginHorizontal: width / 50
	}
};

//Styling for the map components
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
	fabButtonContainer: {
		width: width / 10,
		height: width / 10,
		backgroundColor: 'white',
		borderRadius: 30,
		justifyContent: 'center',
		position: 'absolute'
	},
	repositionButton: {
		left: width / 40,
		bottom: height / 25
	},
	clearButton: {
		backgroundColor: 'rgba(0,0,0,0)',
		justifyContent: 'center',
		paddingRight: width / 30
	},
	addIncidentButton: {
		right: width / 25,
		bottom: height / 30,
		elevation: 10,
		width: width / 7.5,
		height: width / 7.5,
		borderRadius: 35
	},
	filterButton: {
		right: width / 40,
		top: height / 10
	},
	fabButton: {
		alignSelf: 'center',
		color: '#000000'
	},
	modalField: {
		padding: 7,
		marginTop: height / 200,
		backgroundColor: '#eeeeee',
		height: height / 10,
		flexDirection: 'row'
	},
	modalContainer: {
		marginTop: height / 20,
		marginBottom: height / 20
	},
	modalText: {
		color: '#000',
		marginLeft: width / 20,
		justifyContent: 'center',
		marginTop: height / 50
	},
	modalHeadText: {
		fontSize: 20,
		marginLeft: width / 20,
		marginTop: height / 35
	},
	modalHeadContainer: {
		flexDirection: 'row'
	},
	modalImage: {
		height: 40,
		width: 40,
		marginLeft: width / 20
	},
	modalIcon: {
		marginTop: height / 90,
		marginLeft: width / 1.1
	}
});

export { searchBarStyle, styles };
