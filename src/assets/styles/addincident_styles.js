import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling for the add incident screen.
export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	picker: {
		marginVertical: height / 100,
		marginHorizontal: width / 30
	},
	title: {
		marginLeft: width / 20,
		fontWeight: 'bold',
		fontSize: 25,
		color: '#fff'
	},
	avatarContainer: {
		backgroundColor: '#63a4ff',
		alignItems: 'center',
		paddingVertical: height / 30
	},
	image: {
		height: height / 2.7,
		width: width * 0.95
	},
	cameraContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	imageText: {
		marginLeft: width / 80,
		paddingVertical: height / 50,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff'
	},
	imageChangeText: {
		marginLeft: width / 80,
		paddingVertical: height / 70,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff'
	},
	textInput: {
		width: width * 0.9,
		marginLeft: width / 20,
		paddingTop: height / 300
	},
	textInputHeadingContainer: {
		marginLeft: width / 20,
		paddingTop: height / 40,
		paddingBottom: height / 100
	},
	textInputHeading: {
		color: '#555',
		fontWeight: 'bold',
		fontSize: 17
	},
	switchContainer: {
		flexDirection: 'row',
		marginHorizontal: width / 20,
		paddingTop: height / 40,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	switchText: {
		color: '#555',
		fontWeight: 'bold',
		fontSize: 17
	},
	updateButton: {
		alignItems: 'center',
		backgroundColor: '#1e1e1e',
		padding: width / 30,
		marginHorizontal: width / 3,
		marginVertical: height / 30,
		borderRadius: 17
	},
	updateText: {
		color: 'white'
	}
});
