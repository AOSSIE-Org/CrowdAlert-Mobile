import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	FlatList
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/editProfile_styles';
import PropTypes from 'prop-types';
import { updateUserFirebase } from '../../actions/loginAction';

/**
 * Screen showing all login options.
 * @extends Component
 */
class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.name,
			email: this.props.user.email,
			phone_no: this.props.user.phone_no,
			photoURL: this.props.user.photoURL,
			emergency_contact_name: this.props.user.emergency_contact_name,
			emergency_contact_phone_no: this.props.user
				.emergency_contact_phone_no
		};
	}

	handleUpdate() {
		this.props.updateUserFirebase(this.state).then(() => {
			Actions.pop();
		});
	}

	render() {
		return (
			<ScrollView
				style={styles.container}
				keyboardShouldPersistTaps="always"
				showsVerticalScrollIndicator={false}
			>
				<TextInput
					autoCorrect={false}
					ref={input => (this.nameInput = input)}
					onChangeText={name => this.setState({ name })}
					onSubmitEditing={() => this.emailInput.focus()}
					returnKeyType="next"
					style={styles.field_Pass}
					placeholder="Name"
					value={this.state.name}
				/>
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					ref={input => (this.emailInput = input)}
					onChangeText={email => this.setState({ email })}
					onSubmitEditing={() => this.phoneNoInput.focus()}
					keyboardType="email-address"
					returnKeyType="next"
					style={styles.field_Pass}
					placeholder="Email"
					value={this.state.email}
				/>
				<TextInput
					autoCorrect={false}
					ref={input => (this.phoneNoInput = input)}
					onChangeText={phone_no => this.setState({ phone_no })}
					onSubmitEditing={() =>
						this.emergencyContactNameInput.focus()
					}
					keyboardType="phone-pad"
					returnKeyType="next"
					style={styles.field_Pass}
					placeholder="Phone No."
					value={this.state.phone_no}
				/>
				<TextInput
					autoCorrect={false}
					ref={input => (this.emergencyContactNameInput = input)}
					onChangeText={emergency_contact_name =>
						this.setState({ emergency_contact_name })
					}
					onSubmitEditing={() =>
						this.emergencyContactPhoneInput.focus()
					}
					returnKeyType="next"
					style={styles.field_Pass}
					placeholder="Emergency Contact Name"
					value={this.state.emergency_contact_name}
				/>
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					ref={input => (this.emergencyContactPhoneInput = input)}
					onChangeText={emergency_contact_phone_no =>
						this.setState({ emergency_contact_phone_no })
					}
					keyboardType="phone-pad"
					returnKeyType="next"
					style={styles.field_Pass}
					placeholder="Emergency Contact Phone No."
					value={this.state.emergency_contact_phone_no}
				/>
				<TouchableOpacity
					style={styles.updateButton}
					onPress={() => this.handleUpdate()}
				>
					<Text style={styles.updateText}> Update </Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

//Prop types for prop checking.
// EditProfile.propTypes = {};

/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			updateUserFirebase: updateUserFirebase
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

export default connect(mapStateToProps, matchDispatchToProps)(EditProfile);
