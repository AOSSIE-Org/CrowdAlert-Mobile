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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onPressSignUp } from '../actions/loginAction';
import { styles } from '../assets/styles/signin_styles';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		};
	}

	handleSignUp() {
		Keyboard.dismiss();
		this.props.onPressSignUp(this.state.email, this.state.password);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.field}>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						ref={input => (this.nameInput = input)}
						onChangeText={name => this.setState({ name })}
						onSubmitEditing={() => this.emailInput.focus()}
						returnKeyType="next"
						style={styles.field_Pass}
						placeholder={'Name'}
					/>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						ref={input => (this.emailInput = input)}
						onChangeText={email => this.setState({ email })}
						onSubmitEditing={() => this.passwordInput.focus()}
						keyboardType="email-address"
						returnKeyType="next"
						style={styles.field_Pass}
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
					onPress={() => this.handleSignUp()}
				>
					<Text style={styles.button_text}> Register </Text>
				</TouchableOpacity>
				{this.props.login.loading ? (
					<ActivityIndicator size={'large'} />
				) : null}
			</View>
		);
	}
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			onPressSignUp: onPressSignUp
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
