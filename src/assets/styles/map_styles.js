import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used in map.js
const searchBarStyle = {
	container: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0)',
		top: 10
	},
	predefinedPlacesDescription: {
		color: '#1faadb'
	},
	textInputContainer: {
		backgroundColor: 'rgba(0,0,0,0)',
		top: 0,
		alignSelf: 'center',
		borderTopWidth: 0,
		borderBottomWidth: 0,
		width: 400
	},
	textInput: {
		marginLeft: 10,
		marginRight: 10,
		color: '#5d5d5d',
		fontSize: 14
	},
	listView: {
		backgroundColor: 'rgba(256,256,256,0.95)',
		marginLeft: 10,
		marginRight: 10
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
	}
});

export { searchBarStyle, styles };
