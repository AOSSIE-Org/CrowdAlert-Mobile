import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
	TextInput,
	Button,
	Keyboard,
	ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onPressSignIn } from '../actions/loginAction';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/signin_styles';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleSignIn() {
		Keyboard.dismiss();
		this.props.onPressSignIn(this.state.email, this.state.password);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.field}>
					<TextInput
						style={styles.field_Pass}
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
						style={styles.field_Pass}
						onChangeText={password => this.setState({ password })}
						// onSubmitEditing={() => this.passwordConfirmInput.focus()}
						returnKeyType="next"
						secureTextEntry={true}
						placeholder="Password"
					/>
				</View>
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
						{' '}
						Forgot password ?{' '}
					</Text>
				</TouchableOpacity>
				{
					this.props.login.loading
				 	? <ActivityIndicator size={'large'}/>
					: null
			  }
			</View>
		);
	}
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			onPressSignIn: onPressSignIn
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Signin);
