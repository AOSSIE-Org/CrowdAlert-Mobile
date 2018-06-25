import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/drawer_styles';

class DrawerContent extends Component {
	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.userHeader}>
					<Image
						style={styles.userImage}
						source={
							this.props.user.photo.url === ''
								? this.props.user.photo.base64 === ''
									? {
											uri:
												'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZA_wIwT-DV4G3E3jdNZScRLQnH4faqTH2a7PrNwlhqP4W1Zjh'
									  }
									: {
											uri:
												'data:image/jpeg;base64, ' +
												this.props.user.photo.base64
									  }
								: { uri: this.props.user.photo.url }
						}
					/>
					<Text style={styles.userName}>{this.props.user.name}</Text>
				</View>
				<View style={styles.bar} />
				<TouchableHighlight onPress={Actions.profile}>
					<Text style={styles.option}>Home</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={Actions.map}>
					<Text style={styles.option}>Map</Text>
				</TouchableHighlight>
			</ScrollView>
		);
	}
}

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
	user: state.login.userDetails
});

export default connect(mapStateToProps, null)(DrawerContent);
