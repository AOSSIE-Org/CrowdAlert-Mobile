import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Keyboard,
	ToastAndroid,
	ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onPressSignUp } from '../../actions/loginAction';
import { styles } from '../../assets/styles/signin_styles';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import { Header, Title, Left, Body } from 'native-base';

/**
 * Screen for signup.
 * @extends Component
 */
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		};
	}

	componentDidUpdate() {
		// Typical usage (don't forget to compare props):
		if (!this.props.login.loading && this.props.login.signInType !== null) {
			ToastAndroid.show('Registration successful', ToastAndroid.SHORT);
			Actions.profile();
		}
	}

	/**
	 * Hides the Keyboard and calls onPressSignUp function in loginAction screen.
	 */
	handleSignUp() {
		Keyboard.dismiss();
		if (
			this.validateEmail(this.state.email) &&
			this.validatePassword(this.state.password) &&
			this.validateName(this.state.name)
		) {
			this.props.onPressSignUp(
				this.state.email,
				this.state.password,
				this.state.name
			);
		}
	}

	validateName(inputName) {
		if (inputName === '') {
			ToastAndroid.show(
				'You can leave the name field blank!',
				ToastAndroid.SHORT
			);
			return false;
		} else {
			return true;
		}
	}

	validateEmail(inputEmail) {
		if (inputEmail === '') {
			ToastAndroid.show(
				'You can leave the email field blank!',
				ToastAndroid.SHORT
			);
			return false;
		} else {
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (!inputEmail.match(mailformat)) {
				ToastAndroid.show(
					'Please check your email format',
					ToastAndroid.SHORT
				);
				return false;
			} else {
				return true;
			}
		}
	}

	validatePassword(inputPassword) {
		if (inputPassword === '') {
			ToastAndroid.show(
				'You can leave the password field blank!',
				ToastAndroid.SHORT
			);
			return false;
		} else if (inputPassword.length < 8) {
			ToastAndroid.show(
				'Your password should be of minimum 8 characters!',
				ToastAndroid.SHORT
			);
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
					<Text style={styles.heading}>Register</Text>
					<TextInput
						autoCorrect={false}
						ref={input => (this.nameInput = input)}
						onChangeText={name => this.setState({ name })}
						onSubmitEditing={() => this.emailInput.focus()}
						returnKeyType="next"
						style={styles.input_field}
						placeholder="Account name"
					/>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						ref={input => (this.emailInput = input)}
						onChangeText={email => this.setState({ email })}
						onSubmitEditing={() => this.passwordInput.focus()}
						keyboardType="email-address"
						returnKeyType="next"
						style={styles.input_field}
						placeholder="Email"
					/>
					<TextInput
						ref={input => (this.passwordInput = input)}
						style={styles.input_field}
						onChangeText={password => this.setState({ password })}
						// onSubmitEditing={() => this.passwordConfirmInput.focus()}
						returnKeyType="next"
						secureTextEntry={true}
						placeholder="Password"
					/>
					<TouchableOpacity
						style={styles.button_send}
						onPress={() => this.handleSignUp()}
					>
						<Text style={styles.button_text}> Register </Text>
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
Signup.propTypes = {
	onPressSignUp: PropTypes.func.isRequired,
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
			onPressSignUp: onPressSignUp
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

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
