import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Styling used for the intro slides.
export const styles = StyleSheet.create({
	blurContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)'
	},
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
		marginVertical: height / 20,
		marginHorizontal: width / 20,
		borderRadius: 10
	},
	slideStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.9,
		marginBottom: width / 20
	},
	imageStyle: {
		flex: 6,
		width: 2 * (width - 40) / 3,
		height: null,
		marginTop: height / 100
	},
	textStyle: {
		fontSize: 18,
		color: 'white',
		marginHorizontal: width / 20,
		textAlign: 'center'
	},
	exitButtonContainer: {
		backgroundColor: 'white',
		justifyContent: 'center',
		borderRadius: 10,
		marginTop: height / 30,
		paddingVertical: width / 70,
		width: width / 3
	},
	exitButtonText: {
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});
