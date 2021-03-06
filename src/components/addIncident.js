import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
	TextInput,
	Keyboard,
	ActivityIndicator,
	Picker,
	CheckBox
} from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { Header, Title, Left, Body, Switch, Right, Card } from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addIncidentToFirebase } from '../actions/incidentsAction';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/addincident_styles';
import PropTypes from 'prop-types';
var ImagePicker = require('react-native-image-picker');
import { Toast } from 'native-base';

/**
 * Screen for adding an incident.
 * @extends Component
 */
class AddIncident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			incident: {
				title: null,
				details: null,
				visible: true,
				timestamp: new Date().toString(),
				location: {
					coordinates: this.props.location.curr_coordinates
				},
				category: null,
				user_id: this.props.login.userDetails.email,
				upvotes: 0,
				image: {
					isPresent: false,
					base64: '',
					uri: ''
				},
				getHelp: true
			},
			disable: false
		};
	}

	/**
	 * Updates category of incident chosen by user.
	 * @param  {string} category The category selected by the user.
	 * @return category of the incident gets updated.
	 */
	updateCategory = category => {
		this.setState({
			incident: {
				...this.state.incident,
				category: category
			}
		});
	};

	/**
	 * The function is used to update incident details with the details entered by the user.
	 */
	handleAddIncident() {
		console.log(this.state.incident);
		Keyboard.dismiss();
		if (
			this.state.incident.title === null ||
			this.state.incident.details === null ||
			this.state.incident.category === null
		) {
			Toast.show({
				text: 'Please dont leave any field blank',
				type: 'warning',
				duration: 2000
			});
		} else {
			this.setState({ disable: true });
			this.props
				.addIncidentToFirebase(this.state.incident) // waits till incident details are updated in redux
				.then(result => {
					Actions.pop(); // set markers on map page to result from firebase.
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
					incident: {
						...this.state.incident,
						image: {
							isPresent: true,
							base64: response.data,
							uri: response.uri
						}
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
						<Text style={styles.title}>Add Incident</Text>
					</Body>
				</Header>
				<ScrollView
					keyboardShouldPersistTaps="always"
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.avatarContainer}>
						{this.state.incident.image.isPresent ? (
							<Image
								style={styles.image}
								resizeMethod={'resize'}
								source={{
									uri:
										'data:image/jpeg;base64, ' +
										this.state.incident.image.base64
								}}
							/>
						) : null}
						<TouchableOpacity onPress={() => this._cameraImage()}>
							<View style={styles.cameraContainer}>
								<Icon name="camera" size={40} color="white" />
								{this.state.incident.image.isPresent ? (
									<Text style={styles.imageChangeText}>
										Change Image
									</Text>
								) : (
									<Text style={styles.imageText}>
										Add Image
									</Text>
								)}
							</View>
						</TouchableOpacity>
					</View>
					<Picker
						selectedValue={this.state.incident.category}
						onValueChange={category => {
							this.updateCategory(category);
						}}
						style={styles.picker}
					>
						<Picker.Item
							label="Choose type of incident"
							value={null}
						/>
						<Picker.Item label="Road accident" value="road" />
						<Picker.Item label="Health accident" value="health" />
						<Picker.Item
							label="Electricity blackout"
							value="blackout"
						/>
						<Picker.Item label="Fire" value="fire" />
						<Picker.Item label="Flood" value="flood" />
					</Picker>
					<View style={styles.textInputHeadingContainer}>
						<Text style={styles.textInputHeading}>
							Incident Title
						</Text>
					</View>

					<TextInput
						style={styles.textInput}
						ref={input => (this.titleInput = input)}
						onChangeText={title =>
							this.setState({
								incident: {
									...this.state.incident,
									title: title
								}
							})
						}
						onSubmitEditing={() => this.detailsInput.focus()}
						keyboardType="email-address"
						returnKeyType="next"
						placeholder="Title"
					/>
					<View style={styles.textInputHeadingContainer}>
						<Text style={styles.textInputHeading}>
							Incident Details
						</Text>
					</View>
					<TextInput
						ref={input => (this.detailsInput = input)}
						style={styles.textInput}
						onChangeText={details =>
							this.setState({
								incident: {
									...this.state.incident,
									details: details
								}
							})
						}
						multiline={true}
						numberOfLines={4}
						returnKeyType="next"
						placeholder="Description"
					/>
					<View style={styles.switchContainer}>
						<Text style={styles.switchText}>Get Help!</Text>
						<Switch
							thumbTintColor="#1c76cb"
							onValueChange={getHelp => {
								this.setState({
									incident: {
										...this.state.incident,
										getHelp: getHelp
									}
								});
							}}
							value={this.state.incident.getHelp}
						/>
					</View>
					<View style={styles.switchContainer}>
						<Text style={styles.switchText}>Share Publicly!</Text>
						<Switch
							thumbTintColor="#1c76cb"
							onValueChange={visible => {
								this.setState({
									incident: {
										...this.state.incident,
										visible: visible
									}
								});
							}}
							value={this.state.incident.visible}
						/>
					</View>
					<TouchableOpacity
						disabled={this.state.disable}
						style={styles.updateButton}
						onPress={() => this.handleAddIncident()}
					>
						<Text style={styles.updateText}> Update </Text>
					</TouchableOpacity>
					{this.props.incident.loading ? (
						<ActivityIndicator size={'large'} />
					) : null}
				</ScrollView>
			</View>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
AddIncident.propTypes = {
	addIncidentToFirebase: PropTypes.func.isRequired,
	login: PropTypes.object,
	location: PropTypes.object,
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
			addIncidentToFirebase: addIncidentToFirebase
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
	login: state.login,
	location: state.location,
	incident: state.incident
});

export default connect(mapStateToProps, matchDispatchToProps)(AddIncident);
