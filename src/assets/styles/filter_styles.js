import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used on filter screen.
export const styles = StyleSheet.create({
	Field: {
		padding: 7,
		marginTop: height / 200,
		backgroundColor: '#f4f3f2',
		height: height / 10,
		flexDirection: 'row',
		elevation: 5,
		width: width * 0.9,
		marginLeft: width / 20
	},
	title: {
		marginLeft: width / 200,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff'
	},
	Container: {
		flex: 1,
		backgroundColor: '#63a4ff'
	},
	listView: {
		marginTop: height / 20
	},
	text: {
		color: '#000',
		marginLeft: width / 20,
		justifyContent: 'center',
		marginTop: height / 50
	},
	HeadText: {
		fontSize: 20,
		marginLeft: width / 20,
		marginTop: height / 35
	},
	HeadContainer: {
		flexDirection: 'row'
	},
	Image: {
		height: 40,
		width: 40,
		marginLeft: width / 20
	},
	Icon: {
		marginTop: height / 90,
		marginLeft: width / 1.1
	}
});
