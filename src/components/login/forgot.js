import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onForget } from '../../actions/loginAction';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/signin_styles';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { Header, Title, Left, Body, Toast } from 'native-base';

/**
 * Renders the forget password screen
 * @extends Component
 */
class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		};
	}

	//Handles the Forgot button click
	handleForget() {
		if (this.validateEmail(this.state.email)) {
			this.props.onForget(this.state.email);
		}
	}

	/**
	 * Validates the email if they are of the proper type.
	 * @param  {String} inputEmail Input email from the user
	 * @return {boolean} Returns bool depending on whether the email string passes or not
	 */
	validateEmail(inputEmail) {
		if (inputEmail === '') {
			Toast.show({
				text: 'You can leave the email field blank!',
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
					<Text style={styles.heading}>Recover Password</Text>
					<TextInput
						style={styles.input_field}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						returnKeyType="next"
						onChangeText={email => this.setState({ email })}
						placeholder="Email"
					/>
					<TouchableOpacity
						style={styles.button_send}
						onPress={() => this.handleForget()}
					>
						<Text style={styles.button_text}> Send email </Text>
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
Forgot.propTypes = {
	onForget: PropTypes.func.isRequired,
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
