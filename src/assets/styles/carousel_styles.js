import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	incidentContainer: {
		flexDirection: 'row',
		borderRadius: 50,
		backgroundColor: '#aaddff',
		marginHorizontal: width / 20,
		marginBottom: height / 60,
		paddingVertical: height / 100,
		borderWidth: 1.3,
		borderColor: '#005b4f',
		alignItems: 'center'
	},
	incidentContainerEven: {
		backgroundColor: '#c2f9e2'
	},
	image: {
		width: width / 7,
		height: width / 7,
		marginLeft: 4,
		borderRadius: 50
	},
	textContainer: {
		justifyContent: 'center',
		marginLeft: width / 25,
		marginRight: width * 0.22
	},
	title: {
		color: '#000',
		fontSize: 15,
		fontWeight: 'bold',
		letterSpacing: 0.5
	},
	details: {
		marginTop: height / 100,
		color: 'rgba(0, 0, 0, 0.8)',
		fontSize: 12.5,
		fontStyle: 'italic'
	}
});
