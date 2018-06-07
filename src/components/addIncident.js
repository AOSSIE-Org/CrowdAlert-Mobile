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
	Button,
	Keyboard,
	ActivityIndicator,
	Picker,
	ToastAndroid,
	CheckBox
} from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onPressAddIncident } from '../actions/AddIncidentAction.js';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/addincident_styles';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	AddIncidentFirebase,
	GetIncidentFirebase
} from '../utility/firebaseUtil.js';
var ImagePicker = require('react-native-image-picker');
var options = {
	title: 'Select Option',
	customButtons: [],
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};
/**
 * Implements add Incident page.
 * @extends Component
 */
class AddIncident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			details: '',
			visible: true,
			category: '',
			upvotes: 0,
			image: false,
			getHelp: true,
			loading: false,
			image_uri: '',
			image_base64: ''
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
	handleAddIncident = async () => {
		this.setState({ loading: true });
		loading = false;
		//gets all the details of an incident and stores in data object.
		let data = {};
		data.location = this.props.location;
		data.timestamp = new Date().toLocaleString();
		data.user = this.props.login.user;
		data.title = this.state.title;
		data.details = this.state.details;
		data.visible = this.state.visible;
		data.category = this.state.category;
		data.getHelp = this.state.getHelp;
		let image = {};
		image.isPresent = this.state.image;
		image.base64 = this.state.image_base64;
		image.uri = this.state.image_uri;
		data.image = image;
		console.log('At Main Screen');
		console.log(data);
		await this.props
			.onPressAddIncident(data) // waits till incident details are updated in redux
			.then(result => {
				console.log(data);
				AddIncidentFirebase(data).then(async result => {
					//waits till incident details are uploaded to firebase.
					await GetIncidentFirebase().then(result => {
						//retrieves all incident details from redux
						ToastAndroid.show(
							'Incident Updated',
							ToastAndroid.SHORT
						);
						this.setState({ loading: false });
						loading = false;
						Actions.pop({ refresh: { markers: result } }); // set markers on map page to result from firebase.
					});
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({ loading: false });
			});
	};
	/**
	 * This function provides options for adding incident image , and updates the image object.
	 * @return updates the incident image.
	 */
	_cameraImage = () => {
		ImagePicker.showImagePicker(options, response => {
			this.setState({ loading: true });
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
				this.setState({ loading: false });
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				this.setState({ loading: false });
			} else if (response.customButton) {
				console.log(
					'User tapped custom button: ',
					response.customButton
				);
				this.setState({ loading: false });
			} else {
				this.setState({
					image_uri: response.uri,
					image_base64: response.data,
					image: true,
					loading: false
				});
				ToastAndroid.show('Image Added', ToastAndroid.SHORT);
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.loading ? (
					<ActivityIndicator size={'large'} />
				) : null}
				<View style={styles.field}>
					<Picker
						selectedValue={this.state.category}
						onValueChange={this.updateCategory}
						style={styles.picker}
					>
						<Picker.Item label="Choose type of incident" value="" />
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
							onSubmitEditing={() => this.titleInput.focus()}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="email-address"
							returnKeyType="next"
							placeholder="Title"
						/>
					</View>
					<TextInput
						ref={input => (this.passwordInput = input)}
						style={styles.field_details}
						onChangeText={details => this.setState({ details })}
						//onSubmitEditing={() => this.passwordConfirmInput.focus()}
						returnKeyType="next"
						placeholder="Details"
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
								this.setState({ visible: !this.state.getHelp })
							}
						/>
						<Text style={styles.CheckBoxText}>Get Help!</Text>
					</View>
				</View>
				<View style={styles.cameraContainer}>
					<TouchableOpacity
						style={styles.button_camera}
						onPress={() => this._cameraImage()}
					>
						{this.state.image ? (
							<Text style={styles.cameraText}>
								{' '}
								Change Image{' '}
							</Text>
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
				<View>
					{loading ? <ActivityIndicator size={'large'} /> : null}
				</View>
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
			onPressAddIncident: onPressAddIncident
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
