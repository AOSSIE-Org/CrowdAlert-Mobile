import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used on filter screen.
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#63a4ff'
	},
	title: {
		marginLeft: width / 200,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff'
	},
	listView: {
		marginTop: height / 20
	},
	field: {
		padding: 7,
		marginTop: height / 100,
		backgroundColor: '#f4f3f2',
		height: height / 10,
		flexDirection: 'row',
		elevation: 5,
		alignItems: 'center',
		marginHorizontal: width / 20
	},
	image: {
		height: 40,
		width: 40,
		marginLeft: width / 20
	},
	text: {
		color: '#000',
		fontSize: 15,
		marginLeft: width / 20
	}
});
