import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
	Switch
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
	set_emergency_radius,
	set_notifications_radius,
	set_notifications_timeout,
	set_notifications
} from '../actions/settingsAction';
import { styles } from '../assets/styles/setting_styles';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
var PushNotification = require('react-native-push-notification');
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	Header,
	Content,
	List,
	ListItem,
	Title,
	Left,
	Body,
	Right,
	Button,
	Footer,
	FooterTab
} from 'native-base';

/**
 * Settings Screen to update various app settings
 * @extends Component
 */
class SettingsOption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emergency_radius: this.props.settings.emergency_radius,
			notification_min_radius: this.props.settings
				.notification_min_radius,
			notification_timeout: this.props.settings.notification_timeout,
			enable_notifications: this.props.settings.enable_notifications,
			showSlider: {
				emergency_radius: false,
				notification_min_radius: false,
				notification_timeout: false
			}
		};
	}

	handleNotifications(enable_notifications) {
		this.setState({ enable_notifications });
		if (enable_notifications) {
			PushNotification.requestPermissions();
		}
		this.props.set_notifications(enable_notifications);
	}

	toggleSliderIcon(value) {
		if (value) {
			return <Icon name="chevron-up" size={16} color="#005b4f" />;
		} else {
			return <Icon name="chevron-down" size={16} color="#005b4f" />;
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header style={styles.header} androidStatusBarColor="#1c76cb">
					<Left>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => Actions.pop()}
						>
							<Icon name="angle-left" size={40} color="white" />
						</TouchableOpacity>
					</Left>
					<Body>
						<Title>Settings</Title>
					</Body>
				</Header>
				<Content>
					<List style={styles.list}>
						<ListItem icon style={styles.listItem} noBorder>
							<Left>
								<Button
									disabled
									style={{ backgroundColor: '#007AFF' }}
								>
									<Icon size={19} name="user" color="white" />
								</Button>
							</Left>
							<Body>
								<TouchableOpacity
									activeOpacity={0.6}
									style={styles.option}
									onPress={() => Actions.editProfile()}
								>
									<Text>Profile Settings</Text>
									<Right>
										<View style={styles.rightSection}>
											<Icon
												size={18}
												name="chevron-right"
												color="#005b4f"
											/>
										</View>
									</Right>
								</TouchableOpacity>
							</Body>
						</ListItem>
						<ListItem icon style={styles.listItem} noBorder>
							<Left>
								<Button
									disabled
									style={{ backgroundColor: '#FF9501' }}
								>
									{this.state.enable_notifications ? (
										<Icon
											size={19}
											name="bell-o"
											color="white"
										/>
									) : (
										<Icon
											size={19}
											name="bell-slash-o"
											color="white"
										/>
									)}
								</Button>
							</Left>
							<Body>
								<Text>Enable Notifications</Text>
							</Body>
							<Right>
								<Switch
									thumbTintColor="#1c76cb"
									onValueChange={enable_notifications => {
										this.handleNotifications(
											enable_notifications
										);
									}}
									value={this.state.enable_notifications}
								/>
							</Right>
						</ListItem>
						<ListItem icon style={styles.listItem} noBorder>
							<Left>
								<Button
									disabled
									style={{ backgroundColor: 'white' }}
								>
									<Icon size={19} name="hospital-o" />
								</Button>
							</Left>
							<Body>
								<TouchableOpacity
									activeOpacity={0.8}
									style={styles.option}
									onPress={() =>
										this.setState({
											showSlider: {
												emergency_radius: !this.state
													.showSlider.emergency_radius
											}
										})
									}
								>
									<Text>Emergency Radius</Text>
									<Right>
										<View style={styles.rightSection}>
											<Text style={styles.sliderValue}>
												{this.state.emergency_radius} m
											</Text>
											{this.toggleSliderIcon(
												this.state.showSlider
													.emergency_radius
											)}
										</View>
									</Right>
								</TouchableOpacity>
							</Body>
						</ListItem>
						{this.state.showSlider.emergency_radius ? (
							<ListItem style={styles.slider} noBorder>
								<Body>
									<Slider
										value={this.state.emergency_radius}
										minimumTrackTintColor="#4c93f7"
										thumbTintColor="#1c76cb"
										maximumTrackTintColor="#9bd5ff"
										thumbTouchSize={{
											width: 50,
											height: 50
										}}
										step={500}
										minimumValue={500}
										maximumValue={4000}
										onSlidingComplete={value =>
											this.props.set_emergency_radius(
												value
											)
										}
										onValueChange={emergency_radius =>
											this.setState({
												emergency_radius
											})
										}
									/>
								</Body>
							</ListItem>
						) : null}
						<ListItem icon style={styles.listItem} noBorder>
							<Left>
								<Button
									disabled
									style={{ backgroundColor: 'red' }}
								>
									<Icon size={19} name="circle-thin" />
								</Button>
							</Left>
							<Body>
								<TouchableOpacity
									activeOpacity={0.8}
									style={styles.option}
									onPress={() =>
										this.setState({
											showSlider: {
												notification_min_radius: !this
													.state.showSlider
													.notification_min_radius
											}
										})
									}
								>
									<Text>Notifications Radius</Text>
									<Right>
										<View style={styles.rightSection}>
											<Text style={styles.sliderValue}>
												{
													this.state
														.notification_min_radius
												}{' '}
												m
											</Text>
											{this.toggleSliderIcon(
												this.state.showSlider
													.notification_min_radius
											)}
										</View>
									</Right>
								</TouchableOpacity>
							</Body>
						</ListItem>
						{this.state.showSlider.notification_min_radius ? (
							<ListItem style={styles.slider} noBorder>
								<Body>
									<Slider
										value={
											this.state.notification_min_radius
										}
										minimumTrackTintColor="#4c93f7"
										thumbTintColor="#1c76cb"
										maximumTrackTintColor="#9bd5ff"
										step={500}
										minimumValue={1000}
										maximumValue={7000}
										onSlidingComplete={value =>
											this.props.set_notifications_radius(
												value
											)
										}
										onValueChange={notification_min_radius =>
											this.setState({
												notification_min_radius
											})
										}
									/>
								</Body>
							</ListItem>
						) : null}
						<ListItem icon style={styles.listItem} noBorder>
							<Left>
								<Button
									disabled
									style={{ backgroundColor: 'black' }}
								>
									<Icon
										size={19}
										name="clock-o"
										color="white"
									/>
								</Button>
							</Left>
							<Body>
								<TouchableOpacity
									activeOpacity={0.8}
									style={styles.option}
									onPress={() =>
										this.setState({
											showSlider: {
												notification_timeout: !this
													.state.showSlider
													.notification_timeout
											}
										})
									}
								>
									<Text>Notifications Timeout</Text>
									<Right>
										<View style={styles.rightSection}>
											<Text style={styles.sliderValue}>
												{
													this.state
														.notification_timeout
												}{' '}
												min
											</Text>
											{this.toggleSliderIcon(
												this.state.showSlider
													.notification_timeout
											)}
										</View>
									</Right>
								</TouchableOpacity>
							</Body>
						</ListItem>
						{this.state.showSlider.notification_timeout ? (
							<ListItem style={styles.slider} noBorder>
								<Body>
									<Slider
										value={this.state.notification_timeout}
										minimumTrackTintColor="#4c93f7"
										thumbTintColor="#1c76cb"
										maximumTrackTintColor="#9bd5ff"
										step={2}
										minimumValue={6}
										maximumValue={60}
										onSlidingComplete={value =>
											this.props.set_notifications_timeout(
												value
											)
										}
										onValueChange={notification_timeout =>
											this.setState({
												notification_timeout
											})
										}
									/>
								</Body>
							</ListItem>
						) : null}
					</List>
				</Content>
				<Footer>
					<FooterTab style={styles.footer}>
						<Body>
							<Text>
								All changes you make get saved automatically!
							</Text>
						</Body>
					</FooterTab>
				</Footer>
			</View>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
SettingsOption.propTypes = {
	set_emergency_radius: PropTypes.func.isRequired,
	set_notifications_radius: PropTypes.func.isRequired,
	set_notifications_timeout: PropTypes.func.isRequired,
	set_notifications: PropTypes.func.isRequired,
	settings: PropTypes.object
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
			set_emergency_radius: set_emergency_radius,
			set_notifications_radius: set_notifications_radius,
			set_notifications_timeout: set_notifications_timeout,
			set_notifications: set_notifications
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
	settings: state.settings
});

export default connect(mapStateToProps, matchDispatchToProps)(SettingsOption);
