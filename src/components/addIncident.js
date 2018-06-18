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
	ToastAndroid,
	CheckBox
} from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addIncidentToFirebase } from '../actions/incidentsAction';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/addincident_styles';
import PropTypes from 'prop-types';
var ImagePicker = require('react-native-image-picker');

/**
 * Screen for adding an incident.
 * @extends Component
 */
class AddIncident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			details: '',
			visible: true,
			timestamp: new Date().toLocaleString(),
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
		};
	}

	/**
	 * Updates category of incident chosen by user.
	 * @param  {string} category The category selected by the user.
	 * @return category of the incident gets updated.
	 */
	updateCategory = category => {
		this.setState({ category: category });
	};

	/**
	 * The function is used to update incident details with the details entered by the user.
	 * @return {Promise} [description]
	 */
	handleAddIncident() {
		console.log(this.state);
		Keyboard.dismiss();
		if (this.state.title === null || this.state.category === null) {
			ToastAndroid.show(
				'Please dont leave any field blank',
				ToastAndroid.SHORT
			);
		} else {
			this.props
				.addIncidentToFirebase(this.state) // waits till incident details are updated in redux
				.then(result => {
					ToastAndroid.show('Incident Updated', ToastAndroid.SHORT);
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
				<View style={styles.field}>
					<Picker
						selectedValue={this.state.category}
						onValueChange={category => {
							this.setState({ category: category });
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
					<View style={styles.row_container}>
						<TextInput
							style={styles.field_title}
							ref={input => (this.titleInput = input)}
							onChangeText={title => this.setState({ title })}
							onSubmitEditing={() => this.detailsInput.focus()}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="email-address"
							returnKeyType="next"
							placeholder="Title"
						/>
					</View>
					<TextInput
						ref={input => (this.detailsInput = input)}
						style={styles.field_details}
						onChangeText={details => this.setState({ details })}
						returnKeyType="next"
						placeholder="Details [Optional]"
					/>
					<View style={styles.CheckBox}>
						<CheckBox
							value={this.state.visible}
							onValueChange={() =>
								this.setState({ visible: !this.state.visible })
							}
						/>
						<Text style={styles.CheckBoxText}>Share Publicly</Text>
					</View>
					<View style={styles.CheckBox}>
						<CheckBox
							value={this.state.getHelp}
							onValueChange={() =>
								this.setState({ getHelp: !this.state.getHelp })
							}
						/>
						<Text style={styles.CheckBoxText}>Get Help!</Text>
					</View>
				</View>
				{this.state.image.isPresent ? (
					<Image
						style={styles.image}
						resizeMethod={'resize'}
						source={{
							uri:
								'data:image/jpeg;base64, ' +
								this.state.image.base64
						}}
					/>
				) : null}
				<View style={styles.cameraContainer}>
					<TouchableOpacity
						style={styles.button_camera}
						onPress={() => this._cameraImage()}
					>
						{this.state.image.isPresent ? (
							<Text style={styles.cameraText}>Change Image</Text>
						) : (
							<Text style={styles.cameraText}> Add Image </Text>
						)}
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={styles.button_send}
					onPress={() => this.handleAddIncident()}
				>
					<Text style={styles.button_text}> Update </Text>
				</TouchableOpacity>
				{this.props.incident.loading ? (
					<ActivityIndicator size={'large'} />
				) : null}
			</View>
		);
	}
}

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
