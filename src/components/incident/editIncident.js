import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	CheckBox
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/editIncident_styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Header, Title, Left, Body, Switch, Right, Card } from 'native-base';
import getTheme from '../../assets/styles/native-base-theme/components';
import platform from '../../assets/styles/native-base-theme/variables/platform';
import PropTypes from 'prop-types';
import { updateIncidentFirebase } from '../../actions/incidentsAction';

var ImagePicker = require('react-native-image-picker');
import { Toast } from 'native-base';

/**
 * Screen showing the edit options for the profile and personal information.
 * @extends Component
 */
class EditIncident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.incidentDetails.title,
			details: this.props.incidentDetails.details,
			image: {
				isPresent: this.props.incidentDetails.image.isPresent,
				base64: this.props.incidentDetails.image.base64,
				uri: this.props.incidentDetails.image.uri
			},
			getHelp: this.props.incidentDetails.getHelp,
			visible: this.props.incidentDetails.visible
		};
	}

	/**
	 * Updates the incident in firebase.
	 * @return Updated incident
	 */
	handleUpdate() {
		if (this.state.title === '' || this.state.details === '') {
			Toast.show({
				text: 'Please dont leave any field blank',
				type: 'warning',
				duration: 2000
			});
		} else {
			Promise.resolve(
				this.props.updateIncidentFirebase(
					this.props.incident.incident.key,
					this.state
				)
			).then(() => {
				Toast.show({
					text: 'Incident updated!',
					type: 'success',
					duration: 2000
				});
				Actions.pop();
			});
		}
	}

	/**
	 * This function provides options for adding incident image, and updates the image object.
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
					image: {
						isPresent: true,
						base64: response.data,
						uri: response.uri
					}
				});
				Toast.show({
					text: 'Image Added!',
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
						<Text style={styles.title}>Edit Incident</Text>
					</Body>
				</Header>
				<ScrollView
					keyboardShouldPersistTaps="always"
					showsVerticalScrollIndicator={false}
				>
					{this.state.image.isPresent ? (
						<View style={styles.avatarContainer}>
							<Image
								style={styles.image}
								resizeMethod={'resize'}
								source={{
									uri:
										'data:image/jpeg;base64, ' +
										this.state.image.base64
								}}
							/>
							<TouchableOpacity
								onPress={() => this._cameraImage()}
							>
								<Text style={styles.imageChangeText}>
									Change Image
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.avatarContainer}>
							<TouchableOpacity
								onPress={() => this._cameraImage()}
							>
								<Text style={styles.imageText}>Add Image</Text>
							</TouchableOpacity>
						</View>
					)}
					<View style={styles.textInputHeadingContainer}>
						<Text style={styles.textInputHeading}>
							Incident Title
						</Text>
					</View>

					<TextInput
						ref={input => (this.titleInput = input)}
						onChangeText={title => this.setState({ title })}
						onSubmitEditing={() => this.detailsInput.focus()}
						returnKeyType="next"
						style={styles.textInput}
						placeholder="Title"
						value={this.state.title}
					/>
					<View style={styles.textInputHeadingContainer}>
						<Text style={styles.textInputHeading}>
							Incident Details
						</Text>
					</View>
					<TextInput
						multiline={true}
						numberOfLines={4}
						ref={input => (this.detailsInput = input)}
						onChangeText={details => this.setState({ details })}
						returnKeyType="next"
						style={styles.textInput}
						placeholder="Description"
						value={this.state.details}
					/>
					<View style={styles.switchContainer}>
						<Text style={styles.switchText}>Get Help!</Text>
						<Switch
							thumbTintColor="#1c76cb"
							onValueChange={getHelp => {
								this.setState({ getHelp: getHelp });
							}}
							value={this.state.getHelp}
						/>
					</View>
					<View style={styles.switchContainer}>
						<Text style={styles.switchText}>Share Publicly!</Text>
						<Switch
							thumbTintColor="#1c76cb"
							onValueChange={visible => {
								this.setState({ visible: visible });
							}}
							value={this.state.visible}
						/>
					</View>
					<TouchableOpacity
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
EditIncident.propTypes = {
	updateIncidentFirebase: PropTypes.func.isRequired,
	incidentDetails: PropTypes.object,
	incident: PropTypes.object
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
			updateIncidentFirebase: updateIncidentFirebase
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
	incidentDetails: state.incident.incident.value,
	incident: state.incident
});

export default connect(mapStateToProps, matchDispatchToProps)(EditIncident);
