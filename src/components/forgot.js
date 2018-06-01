import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
	TextInput,
	Button,
	ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onForget } from '../actions/loginAction';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/signin_styles';
import PropTypes from 'prop-types';

class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.field}>
					<TextInput
						placeholder="Email"
						style={styles.field_Pass}
						autoCapitalize="none"
						onChangeText={email => this.setState({ email })}
					/>
				</View>
				<TouchableOpacity
					style={styles.button_send}
					onPress={() => this.props.onForget(this.state.email)}
				>
					<Text style={styles.button_text}> Send email </Text>
				</TouchableOpacity>
				<View>
					{this.props.login.loading ? (
						<ActivityIndicator size={'large'} />
					) : null}
				</View>
			</View>
		);
	}
}
Forgot.propTypes = {
	onforget: PropTypes.func.isRequired,
	login: PropTypes.object
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
			onForget: onForget
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
	login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Forgot);
