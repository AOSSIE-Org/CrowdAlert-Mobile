import React, { Component } from 'react';
import {
	ActivityIndicator,
	Text,
	View,
	ScrollView,
	Image,
	TouchableHighlight,
	ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/drawer_styles';
import PropTypes from 'prop-types';
import { logout } from '../actions/loginAction';
import FilesystemStorage from 'redux-persist-filesystem-storage';

/**
 * Content for the side drawer
 * @extends Component
 */

class DrawerContent extends Component {
	handleLogout() {
		Promise.resolve(Actions.reset('homeLogin')).then(() => {
			this.props.logout();
			ToastAndroid.show('You have been logged out', ToastAndroid.SHORT);
			FilesystemStorage.clear();
		});
	}

	render() {
		if (this.props.user.length === 0) {
			return <ActivityIndicator size={'large'} />;
		} else {
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
						<Text style={styles.userName}>
							{this.props.user.name}
						</Text>
					</View>
					<View style={styles.bar} />
					<TouchableHighlight onPress={Actions.profile}>
						<Text style={styles.option}>Home</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={Actions.map}>
						<Text style={styles.option}>Map / Feed</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={Actions.emergencylocation}>
						<Text style={styles.option}>Emergency locations</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={Actions.settingsOption}>
						<Text style={styles.option}>Settings</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => {
							this.handleLogout();
						}}
					>
						<Text style={styles.option}>Logout</Text>
					</TouchableHighlight>
				</ScrollView>
			);
		}
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
DrawerContent.propTypes = {
	user: PropTypes.object
};

/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logout
		},
		dispatch
	);
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

export default connect(mapStateToProps, matchDispatchToProps)(DrawerContent);
