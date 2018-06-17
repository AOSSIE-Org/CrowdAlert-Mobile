import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
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
		height: 200,
		width: null
	},
	map: { flex: 1, width: 500, height: 200 }
});
