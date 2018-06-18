import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on individual incident page
export const styles = StyleSheet.create({
	titleTextHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000'
	},
	titleTextDescription: {
		fontSize: 15
	},
	image: {
		flex: 1,
		height: height / 4,
		width: null
	},
	map: {
		flex: 1,
		width: width,
		height: height / 4
	},
	navigationContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	navigationIcon: {
		position: 'absolute',
		right: 10
	}
});
