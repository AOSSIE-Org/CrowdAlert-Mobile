import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

//styling used for all the nav bar buttons.
export const styles = StyleSheet.create({
	sideMenu: {
		paddingLeft: width / 20,
		justifyContent: 'center'
	},
	incidentNavButton: {
		marginRight: 15
	}
});
