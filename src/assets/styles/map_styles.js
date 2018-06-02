//styling used in map.js
const searchBarStyle = {
	container: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,0)",
		top: 10
	},
	predefinedPlacesDescription: {
		color: "#1faadb"
	},
	textInputContainer: {
		backgroundColor: "rgba(0,0,0,0)",
		top: 0,
		alignSelf: "center",
		borderTopWidth: 0,
		borderBottomWidth: 0,
		width: 400
	},
	textInput: {
		marginLeft: 10,
		marginRight: 10,
		color: "#5d5d5d",
		fontSize: 14
	},
	listView: {
		backgroundColor: "rgba(256,256,256,0.95)",
		marginLeft: 10,
		marginRight: 10
	}
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		flex: 1,
		height: 1000,
		width: 1000
	}
};
const MyLocationButton = {
	marginBottom: 0
};

export { searchBarStyle, styles, MyLocationButton };
