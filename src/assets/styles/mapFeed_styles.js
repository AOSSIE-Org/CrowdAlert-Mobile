import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used on individual incident page
export const styles = StyleSheet.create({
	tabIcon: {
		margin: width / 50
	},
	tabText: {
		color: 'white',
		fontSize: 15
	}
});
