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
	ToastAndroid,
	Button,
	ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fbSignIn, googleSignin } from '../../actions/loginAction';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/login_styles';
import { GoogleSignin } from 'react-native-google-signin';
import Config from 'react-native-config';
import PropTypes from 'prop-types';

/**
 * Screen showing all login options.
 * @extends Component
 */
class HomeLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	componentDidMount() {
		GoogleSignin.configure({
			webClientId: Config.GOOGLE_WEB_CLIENT_ID,
			iosClientId: Config.IOS_GOOGLE_CLIENT_ID // only for iOS
		});
	}

	componentDidUpdate() {
		// Typical usage (don't forget to compare props):
		if (!this.props.login.loading && this.props.login.signInType !== null) {
			ToastAndroid.show('Login successful', ToastAndroid.SHORT);
			Actions.profile();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{/* <ActivityIndicator animating={this.props.login.loading} size={'large'}/> */}
				<View style={styles.headerImage}>
					<Image
						source={require('../../assets/images/earthquake-30-512.png')}
						style={styles.logo}
					/>
				</View>
				<Text style={styles.welcome}>Crowd Alert</Text>
				<View style={styles.button_container}>
					<TouchableOpacity
						style={styles.button_signin}
						onPress={() => Actions.signin()}
					>
						<Text style={styles.button_text}> SignIn </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button_register}
						onPress={() => Actions.signup()}
					>
						<Text style={styles.button_text}> Register </Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.Text}>More login options :</Text>
				<View style={styles.button_container}>
					<TouchableOpacity
						style={styles.button_fb}
						onPress={() => this.props.fbSignIn()}
					>
						<Text style={styles.button_text_social}>Facebook</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button_google}
						onPress={() => this.props.googleSignin()}
					>
						<Text style={styles.button_text_social}>Google</Text>
					</TouchableOpacity>
				</View>
				{this.props.login.loading ? (
					<ActivityIndicator size={'large'} />
				) : null}
			</View>
		);
	}
}

//Prop types for prop checking.
HomeLogin.propTypes = {
	fbSignIn: PropTypes.func.isRequired,
	googleSignin: PropTypes.func.isRequired,
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
			fbSignIn: fbSignIn,
			googleSignin: googleSignin
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

export default connect(mapStateToProps, matchDispatchToProps)(HomeLogin);
