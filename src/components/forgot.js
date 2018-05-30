import React, { Component } from "react";
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
	TextInput,
	ActivityIndicator,
	Button
} from "react-native";
import firebase from "react-native-firebase";
import { AccessToken, LoginManager, LoginButton } from "react-native-fbsdk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onforget } from "../actions/loginAction";
import { Actions } from "react-native-router-flux";
import { styles } from "../assets/styles/signin_styles";
import PropTypes from "prop-types";
class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
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
					onPress={() => this.props.onforget(this.state.email)}
				>
					<Text style={styles.button_text}> Send email </Text>
				</TouchableOpacity>
				<View>
					{this.props.login.loading ? (
						<ActivityIndicator size={"large"} />
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
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			onforget: onforget
		},
		dispatch
	);
}

const mapStateToProps = state => ({
	login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Forgot);
