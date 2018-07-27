import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/editProfile_styles';
import PropTypes from 'prop-types';
import { updateUserFirebase } from '../../actions/loginAction';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Header, Title, Left, Body, Toast } from 'native-base';
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
		if (this.state.email === '') {
			Toast.show({
				text: 'You cannot leave your email field blank',
				type: 'warning',
				duration: 2000
			});
		} else if (this.state.name === '') {
			Toast.show({
				text: 'You cannot leave your name field blank',
				type: 'warning',
				duration: 2000
			});
		} else if (this.state.phone_no.length !== 10) {
			Toast.show({
				text: 'Please enter a 10 digit contact number',
				type: 'warning',
				duration: 2000
			});
		} else {
			this.props.updateUserFirebase(this.state).then(() => {
				Toast.show({
					text: 'Profile Updated',
					type: 'success',
					duration: 2000
				});
				Actions.pop();
			});
		}
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
			if (response.error) {
				Toast.show({
					text: 'ImagePicker Error: ' + response.error,
					duration: 2000
				});
			} else if (response.didCancel) {
			} else if (response.customButton) {
				Toast.show({
					text: 'User tapped custom button: ' + response.customButton,
					duration: 2000
				});
			} else {
				this.setState({
					photo: {
						url: '',
						base64: response.data
					}
				});
				Toast.show({
					text: 'Image Added!' + response.error,
					type: 'success',
					duration: 2000
				});
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<Header androidStatusBarColor="#1c76cb">
					<Left>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => Actions.pop()}
						>
							<Icon name="close" size={40} color="white" />
						</TouchableOpacity>
					</Left>
					<Body>
						<Title>Profile Settings</Title>
					</Body>
				</Header>

				<ScrollView
					keyboardShouldPersistTaps="always"
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.avatarContainer}>
						<Image
							style={styles.avatar}
							resizeMethod={'resize'}
							source={
								this.state.photo.url === ''
									? this.state.photo.base64 === ''
										? require('../../assets/images/boy.png')
										: {
												uri:
													'data:image/jpeg;base64, ' +
													this.state.photo.base64
										  }
									: { uri: this.state.photo.url }
							}
						/>
						<TouchableOpacity
							activeOpacity={0.4}
							onPress={() => this._cameraImage()}
						>
							<Text style={styles.userName}>
								Change Profile Photo
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.valueItem}>
						<View style={styles.valueTextContainer}>
							<Text style={styles.valueText}>Name</Text>
						</View>
						<TextInput
							autoCorrect={false}
							ref={input => (this.nameInput = input)}
							onChangeText={name => this.setState({ name })}
							onSubmitEditing={() => this.emailInput.focus()}
							returnKeyType="next"
							style={styles.textInput}
							underlineColorAndroid="transparent"
							placeholder="Name"
							value={this.state.name}
						/>
					</View>

					<View style={styles.valueItem}>
						<View style={styles.valueTextContainer}>
							<Text style={styles.valueText}>Email</Text>
						</View>
						<TextInput
							autoCapitalize="none"
							autoCorrect={false}
							ref={input => (this.emailInput = input)}
							onChangeText={email => this.setState({ email })}
							onSubmitEditing={() => this.phoneNoInput.focus()}
							keyboardType="email-address"
							returnKeyType="next"
							style={styles.textInput}
							underlineColorAndroid="transparent"
							placeholder="Email"
							value={this.state.email}
						/>
					</View>
					<View style={styles.valueItem}>
						<View style={styles.valueTextContainer}>
							<Text style={styles.valueText}>Contact Number</Text>
						</View>
						<TextInput
							autoCorrect={false}
							ref={input => (this.phoneNoInput = input)}
							onChangeText={phone_no =>
								this.setState({ phone_no })
							}
							onSubmitEditing={() =>
								this.emergencyContactNameInput.focus()
							}
							keyboardType="phone-pad"
							returnKeyType="next"
							style={styles.textInput}
							underlineColorAndroid="transparent"
							placeholder="Phone No."
							value={this.state.phone_no}
						/>
					</View>
					<View style={styles.valueItem}>
						<View style={styles.valueTextContainer}>
							<Text style={styles.valueText}>
								Emergency Contact Name
							</Text>
						</View>
						<TextInput
							autoCorrect={false}
							ref={input =>
								(this.emergencyContactNameInput = input)
							}
							onChangeText={emergency_contact_name =>
								this.setState({ emergency_contact_name })
							}
							onSubmitEditing={() =>
								this.emergencyContactPhoneInput.focus()
							}
							returnKeyType="next"
							style={styles.textInput}
							underlineColorAndroid="transparent"
							placeholder="Contact Name"
							value={this.state.emergency_contact_name}
						/>
					</View>
					<View style={styles.valueItem}>
						<View style={styles.valueTextContainer}>
							<Text style={styles.valueText}>
								Emergency Contact Number
							</Text>
						</View>
						<TextInput
							autoCapitalize="none"
							autoCorrect={false}
							ref={input =>
								(this.emergencyContactPhoneInput = input)
							}
							onChangeText={emergency_contact_phone_no =>
								this.setState({
									emergency_contact_phone_no
								})
							}
							keyboardType="phone-pad"
							returnKeyType="next"
							style={styles.textInput}
							underlineColorAndroid="transparent"
							placeholder="Contact Number"
							value={this.state.emergency_contact_phone_no}
						/>
					</View>
					{this.props.updateLoading ? (
						<ActivityIndicator size={'large'} />
					) : null}
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.updateButton}
						onPress={() => this.handleUpdate()}
					>
						<Text style={styles.updateText}> Update </Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
EditProfile.propTypes = {
	updateUserFirebase: PropTypes.func.isRequired,
	user: PropTypes.object,
	updateLoading: PropTypes.bool
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
