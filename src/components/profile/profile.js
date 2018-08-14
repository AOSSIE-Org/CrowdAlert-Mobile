import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	ActivityIndicator,
	FlatList,
	Platform
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/profile_styles';
import PropTypes from 'prop-types';
import { getUserIncidents } from '../../actions/incidentsAction';
import { watchCurrLocation } from '../../actions/locationAction';
import { getColor } from '../../utils/categoryUtil';
var PushNotification = require('react-native-push-notification');
import { Header, Title, Left, Body } from 'native-base';
import { SideDrawer } from '../sideMenu';
import ProfileIncident from './profileIncident';

/**
 * Screen showing the profile along with his/her incidents.
 * @extends Component
 */
class Profile extends Component {
	componentWillMount() {
		//Used to check if location services are enabled and
		//if not than asks to enables them by redirecting to location settings.
		if (Platform.OS === 'android') {
			LocationServicesDialogBox.checkLocationServicesIsEnabled({
				message:
					'<h2>Please enable GPS!</h2>\
		        CrowdAlert wants to change your Location settings',
				ok: 'Ok',
				cancel: 'No',
				providerListener: true
			}).then(success => {
				this.props.watchCurrLocation();
			});
		} else {
			this.props.watchCurrLocation();
		}

		//Configures the push notification
		PushNotification.configure({
			//Called when a remote or local notification is opened or received
			onNotification: notification => {
				console.log('NOTIFICATION:', notification);
				// Process the notification
				this.viewClickedIncident(notification.tag);
			},
			requestPermissions: this.props.enable_notifications
		});

		//Gets user submitted incidents
		this.props.getUserIncidents(this.props.user.email);
	}

	/**
	 * Redirecting the app from profile to the individual incident which is clicked on.
	 * @param  {JSON} item Incident object being passed whose details have to be viewed.
	 */
	viewClickedIncident(item) {
		Actions.incident({ incident_key: item.key });
	}

	/**
	 * Renders the User submitted incident section below the user name and avatar.
	 * @param  {JSON} item  Individual incident item from all user submitted incident object.
	 * @param  {integer} index Index of that particular item.
	 * @return {Class} Returns the profileIncident class containing all the user submitted incidents.
	 */
	_renderItem({ item, index }) {
		return <ProfileIncident data={item} even={(index + 1) % 2 === 0} />;
	}

	render() {
		if (this.props.user === null) {
			return <ActivityIndicator size={'large'} />;
		} else {
			return (
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={styles.container}
				>
					<Header
						androidStatusBarColor="#1c76cb"
						style={styles.header}
					>
						<Left>{SideDrawer('white')}</Left>
						<Body style={styles.body}>
							<Title style={styles.heading}>Dashboard</Title>
						</Body>
					</Header>
					<View style={styles.empty} />
					<View style={styles.box}>
						<View style={styles.avatarContainer}>
							<View style={styles.empty} />
							<Text style={styles.userName}>
								{this.props.user.name}
							</Text>
						</View>
						{this.props.incident.user_incidents === null ||
						this.props.incident.loading ? (
							<ActivityIndicator
								size={'large'}
								color="black"
								style={styles.loader}
							/>
						) : (
							<View>
								<FlatList
									contentContainerStyle={
										styles.flatListContainer
									}
									data={this.props.incident.user_incidents}
									renderItem={this._renderItem.bind(this)}
									keyExtractor={item => item.key}
								/>
							</View>
						)}
					</View>
					<View
						style={[
							styles.avatarOutline,
							this.props.user.photo.url === '' &&
							this.props.user.photo.base64 === ''
								? styles.noAvatarOutline
								: null
						]}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onPress={Actions.editProfile}
						>
							<Image
								style={styles.avatar}
								source={
									this.props.user.photo.url === ''
										? this.props.user.photo.base64 === ''
											? require('../../assets/images/boy.png')
											: {
													uri:
														'data:image/jpeg;base64, ' +
														this.props.user.photo
															.base64
											  }
										: { uri: this.props.user.photo.url }
								}
							/>
						</TouchableHighlight>
					</View>
				</ScrollView>
			);
		}
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
Profile.propTypes = {
	getUserIncidents: PropTypes.func.isRequired,
	watchCurrLocation: PropTypes.func.isRequired,
	user: PropTypes.object,
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
			getUserIncidents: getUserIncidents,
			watchCurrLocation: watchCurrLocation
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
	incident: state.incident,
	enable_notifications: state.settings.enable_notifications
});

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
