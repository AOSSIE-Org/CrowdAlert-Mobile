import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/editScreen_styles';
import PropTypes from 'prop-types';
import { updateUserFirebase } from '../../actions/loginAction';
var ImagePicker = require('react-native-image-picker');

/**
 * Screen showing the edit options for the profile and personal information.
 * @extends Component
 */
class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.name,
			email: this.props.user.email,
			phone_no: this.props.user.phone_no,
			photo: this.props.user.photo,
			emergency_contact_name: this.props.user.emergency_contact_name,
			emergency_contact_phone_no: this.props.user
				.emergency_contact_phone_no
		};
	}

	handleUpdate() {
		this.props.updateUserFirebase(this.state).then(() => {
			ToastAndroid.show('Profile Updated', ToastAndroid.SHORT);
			Actions.profile();
		});
	}

	/**
	 *  This function provides options for adding incident image, and updates the image object.
	 * @return updates the incident image.
	 */
	_cameraImage = () => {
		var options = {
			title: 'Select Option',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
				ToastAndroid.show(
					'User cancelled image picker',
					ToastAndroid.SHORT
				);
			} else if (response.error) {
				ToastAndroid.show(
					'ImagePicker Error: ' + response.error,
					ToastAndroid.SHORT
				);
			} else if (response.customButton) {
				ToastAndroid.show(
					'User tapped custom button: ' + response.customButton,
					ToastAndroid.SHORT
				);
			} else {
				this.setState({
					photo: {
						url: '',
						base64: response.data
					}
				});
				ToastAndroid.show('Image Added', ToastAndroid.SHORT);
			}
		});
	};

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
				<Image
					style={styles.image}
					resizeMethod={'resize'}
					source={
						this.state.photo.url === ''
							? this.state.photo.base64 === ''
								? {
										uri:
											'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZA_wIwT-DV4G3E3jdNZScRLQnH4faqTH2a7PrNwlhqP4W1Zjh'
								  }
								: {
										uri:
											'data:image/jpeg;base64, ' +
											this.state.photo.base64
								  }
							: { uri: this.state.photo.url }
					}
				/>
				<TouchableOpacity
					style={styles.button_camera}
					onPress={() => this._cameraImage()}
				>
					<Text style={styles.cameraText}>Change Image</Text>
				</TouchableOpacity>
				{this.props.updateLoading ? (
					<ActivityIndicator size={'large'} />
				) : null}
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

/**
 * Checks that the functions specified as isRequired are present,
 * and warns if the props used on this page,
 * does not meet the specified type.
 * @type {user}
 */
EditProfile.propTypes = {
	updateUserFirebase: PropTypes.func.isRequired,
	user: PropTypes.array
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
	user: state.login.userDetails,
	updateLoading: state.login.loading
});

export default connect(mapStateToProps, matchDispatchToProps)(EditProfile);
