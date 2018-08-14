import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Keyboard,
	ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onPressSignIn } from '../../actions/loginAction';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/signin_styles';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { Header, Title, Left, Body, Toast } from 'native-base';

/**
 * Screen for login using login id and password.
 * @extends Component
 */
class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	componentDidUpdate() {
		// Typical usage (don't forget to compare props):
		if (!this.props.login.loading && this.props.login.signInType !== null) {
			Toast.show({
				text: 'You are logged in',
				type: 'success',
				duration: 2000
			});
			Actions.profile();
		}
	}

	/**
	 * Hides Keyboard and calls onPressSignIn function in loginAction screen.
	 */
	handleSignIn() {
		Keyboard.dismiss();

		if (
			this.validateEmail(this.state.email) &&
			this.validatePassword(this.state.password)
		) {
			this.props.onPressSignIn(this.state.email, this.state.password);
		}
	}

	validateEmail(inputEmail) {
		if (inputEmail === '') {
			Toast.show({
				text: "You can't leave the email field blank!",
				type: 'warning',
				duration: 2000
			});
			return false;
		} else {
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (!inputEmail.match(mailformat)) {
				Toast.show({
					text: 'Please check your email format',
					type: 'warning',
					duration: 2000
				});
				return false;
			} else {
				return true;
			}
		}
	}

	validatePassword(inputPassword) {
		if (inputPassword === '') {
			Toast.show({
				text: 'You can leave the password field blank!',
				type: 'warning',
				duration: 2000
			});
			return false;
		} else if (inputPassword.length < 8) {
			Toast.show({
				text: 'Your password should be of minimum 8 characters!',
				type: 'warning',
				duration: 2000
			});
			return false;
		} else {
			return true;
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header transparent androidStatusBarColor="#1c76cb">
					<Left>
						<TouchableOpacity onPress={() => Actions.pop()}>
							<Icon name="chevron-left" size={40} />
						</TouchableOpacity>
					</Left>
					<Body>
						<Title />
					</Body>
				</Header>
				<View style={styles.box}>
					<Text style={styles.heading}>Sign in</Text>
					<TextInput
						style={styles.input_field}
						ref={input => (this.emailInput = input)}
						onChangeText={email => this.setState({ email })}
						onSubmitEditing={() => this.passwordInput.focus()}
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="email-address"
						returnKeyType="next"
						placeholder="Email"
					/>
					<TextInput
						ref={input => (this.passwordInput = input)}
						style={styles.input_field}
						onChangeText={password => this.setState({ password })}
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						secureTextEntry={true}
						placeholder="Password"
					/>
					<TouchableOpacity
						style={styles.button_send}
						onPress={() => this.handleSignIn()}
					>
						<Text style={styles.button_text}> Login </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button_forgot}
						onPress={() => Actions.forgot()}
					>
						<Text style={styles.button_text_forgot}>
							Forgot password?
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.button_signup}>
					<Text>Not a member?{'   '}</Text>
					<TouchableOpacity
						// style={styles.button_forgot}
						onPress={() => Actions.signup()}
					>
						<Text style={styles.signup_text}>Register</Text>
					</TouchableOpacity>
				</View>
				{this.props.login.loading ? (
					<ActivityIndicator size={'large'} color="white" />
				) : null}
			</View>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
Signin.propTypes = {
	onPressSignIn: PropTypes.func.isRequired,
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
			onPressSignIn: onPressSignIn
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

export default connect(mapStateToProps, matchDispatchToProps)(Signin);
