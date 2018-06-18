import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used for all the nav bar buttons.
export const styles = StyleSheet.create({
	sideMenu: {
		marginLeft: 20,
		justifyContent: 'center'
	},
	editButton: {
		marginRight: 10
	},
	incidentNavButton: {
		marginRight: 15
	}
});
