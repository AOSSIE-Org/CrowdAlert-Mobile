import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used in map.js
const searchBarStyle = {
	container: {
		position: 'absolute',
		backgroundColor: 'transparent',
		top: 10
	},
	textInputContainer: {
		backgroundColor: 'transparent',
		top: 0,
		alignSelf: 'center',
		borderTopWidth: 0,
		borderBottomWidth: 0,
		width: width
	},
	textInput: {
		marginHorizontal: width / 50,
		paddingRight: width / 30 + width / 50,
		backgroundColor: 'white',
		color: 'rgba(0,0,0,0.7)',
		fontSize: 14
	},
	listView: {
		backgroundColor: 'rgba(256,256,256,0.95)',
		marginHorizontal: width / 50
	}
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
	repositionButton: {
		width: width / 10,
		height: width / 10,
		position: 'absolute',
		left: width / 50,
		bottom: height / 50,
		backgroundColor: 'white',
		borderRadius: 30,
		justifyContent: 'center'
	},
	clearButton: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0)',
		top: 13.5,
		right: width / 30
	},
	addIncidentButton: {
		backgroundColor: 'transparent',
		width: width / 10,
		height: width / 10,
		position: 'absolute',
		left: width / 40,
		bottom: height / 40,
		backgroundColor: 'white',
		borderRadius: 30,
		justifyContent: 'center',
		marginLeft: width / 1.2
	},
	fabButton: {
		alignSelf: 'center',
		color: '#000000'
	}
});

export { searchBarStyle, styles };
