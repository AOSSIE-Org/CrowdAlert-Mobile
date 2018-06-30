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
			enable_notifications: this.props.settings.enable_notifications
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<Slider
					value={this.state.emergency_radius}
					style={styles.slider}
					minimumTrackTintColor="#ffda6d"
					thumbTintColor="#FFA000"
					maximumTrackTintColor="#ffedba"
					thumbTouchSize={{ width: 50, height: 50 }}
					step={500}
					minimumValue={500}
					maximumValue={4000}
					onSlidingComplete={value =>
						this.props.set_emergency_radius(value)
					}
					onValueChange={emergency_radius =>
						this.setState({ emergency_radius })
					}
				/>
				<Text>Emergency Radius: {this.state.emergency_radius} m</Text>
				<Slider
					value={this.state.notification_min_radius}
					style={styles.slider}
					minimumTrackTintColor="#ffda6d"
					thumbTintColor="#FFA000"
					maximumTrackTintColor="#ffedba"
					step={500}
					minimumValue={1000}
					maximumValue={7000}
					onSlidingComplete={value =>
						this.props.set_notifications_radius(value)
					}
					onValueChange={notification_min_radius =>
						this.setState({ notification_min_radius })
					}
				/>
				<Text>
					Minimum radius for notifications:{' '}
					{this.state.notification_min_radius} m
				</Text>
				<Slider
					value={this.state.notification_timeout}
					style={styles.slider}
					minimumTrackTintColor="#59b4ff"
					thumbTintColor="#1976D2"
					maximumTrackTintColor="#BBDEFB"
					step={2}
					minimumValue={6}
					maximumValue={60}
					onSlidingComplete={value =>
						this.props.set_notifications_timeout(value)
					}
					onValueChange={notification_timeout =>
						this.setState({ notification_timeout })
					}
				/>
				<Text>
					Timeout time for notifications:{' '}
					{this.state.notification_timeout} min
				</Text>
				<View style={styles.toggleContainer}>
					<Text style={styles.toggleText}>Enable Notifications</Text>
					<Switch
						onValueChange={enable_notifications => {
							this.setState({ enable_notifications });
							if (enable_notifications) {
								PushNotification.requestPermissions();
							}
							this.props.set_notifications(enable_notifications);
						}}
						value={this.state.enable_notifications}
					/>
				</View>
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
