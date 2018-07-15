import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	ToastAndroid,
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
import {
	updateIncidentFirebase,
	viewIncident
} from '../../actions/incidentsAction';

var ImagePicker = require('react-native-image-picker');

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
			getHelp: this.props.incidentDetails.getHelp
		};
	}

	handleUpdate() {
		this.props.viewIncident(
			{
				...this.props.incident.incident,
				value: {
					...this.props.incident.incident.value,
					...this.state
				}
			},
			true
		);
		this.props
			.updateIncidentFirebase(
				this.props.incident.incident.key,
				this.state
			)
			.then(() => {
				Actions.pop();
			});
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
					image: {
						isPresent: true,
						base64: response.data,
						uri: response.uri
					}
				});
				ToastAndroid.show('Image Added', ToastAndroid.SHORT);
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
								<Text style={styles.imageText}>
									+ Add Image
								</Text>
							</TouchableOpacity>
						</View>
					)}
					<View style={styles.incidentTitleTextContainer}>
						<Text style={styles.incidentTitleText}>
							Incident Title
						</Text>
					</View>

					<TextInput
						autoCorrect={false}
						ref={input => (this.titleInput = input)}
						onChangeText={title => this.setState({ title })}
						onSubmitEditing={() => this.detailsInput.focus()}
						returnKeyType="next"
						style={styles.incidentTitle}
						placeholder="Title"
						value={this.state.title}
					/>
					<View style={styles.incidentDetailTextContainer}>
						<Text style={styles.incidentDetailText}>
							Incident Details
						</Text>
					</View>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						multiline={true}
						ref={input => (this.detailsInput = input)}
						onChangeText={details => this.setState({ details })}
						returnKeyType="next"
						style={styles.incidentDetail}
						placeholder="Description"
						value={this.state.details}
					/>
					<View style={styles.getHelp}>
						<Text style={styles.getHelpText}>Get Help!</Text>
						<Switch
							thumbTintColor="#1c76cb"
							style={styles.Switch}
							onValueChange={getHelp => {
								this.setState({ getHelp: getHelp });
							}}
							value={this.state.getHelp}
						/>
					</View>
					<View style={styles.Share}>
						<Text style={styles.getHelpText}>Share Publicly!</Text>
						<Switch
							thumbTintColor="#1c76cb"
							style={styles.SwitchShare}
							onValueChange={getHelp => {
								this.setState({ getHelp: getHelp });
							}}
							value={this.state.getHelp}
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
	viewIncident: PropTypes.func.isRequired,
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
			updateIncidentFirebase: updateIncidentFirebase,
			viewIncident: viewIncident
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
