import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { Actions, Scene, Drawer } from 'react-native-router-flux';
import crossroads from 'crossroads';
import Icon from 'react-native-vector-icons/FontAwesome';
import { drawerWidth } from '../assets/styles/drawer_styles';

import Signin from '../components/login/signin';
import Signup from '../components/login/signup';
import HomeLogin from '../components/login/homeLogin';
import Forgot from '../components/login/forgot';

import DrawerContent from '../components/drawer';
import Profile from '../components/profile/profile';

import MapFeedScreen from '../components/mapFeed/mapFeedTabular';
import AddIncident from '../components/addIncident';
import EmergencyPlaces from '../components/emergencyPlaces/emergencyPlacesTabular';

import Incident from '../components/incident/incidentScreen';
import EditIncident from '../components/incident/editIncident';

import EditProfile from '../components/profile/editProfile';
import SettingsOption from '../components/settings';

const ConnectedRouter = connect()(Router);

/**
 * Routing class containing all instances of screens.
 * @extends Component
 */
export default class Route extends Component {
	//Describes the functionality of the hardware back button
	onBackPress() {
		if (Actions.currentScene === '_profile') {
			return false;
		}
		Actions.pop();
		return true;
	}

	render() {
		return (
			<ConnectedRouter backAndroidHandler={this.onBackPress}>
				<Scene key="root">
					<Scene
						key="homeLogin"
						hideNavBar
						component={HomeLogin}
						initial={this.props.initial}
					/>
					<Scene key="signin" hideNavBar component={Signin} />
					<Scene key="signup" hideNavBar component={Signup} />
					<Scene key="forgot" hideNavBar component={Forgot} />
					<Scene
						drawer
						hideNavBar
						key="drawer"
						contentComponent={DrawerContent}
						drawerWidth={drawerWidth}
						initial={!this.props.initial}
						drawerOpenRoute="DrawerOpen"
						drawerCloseRoute="DrawerClose"
						drawerToggleRoute="DrawerToggle"
					>
						<Scene key="profile" hideNavBar component={Profile} />
						<Scene
							key="mapFeed"
							hideNavBar
							component={MapFeedScreen}
						/>
						<Scene
							key="emergencylocation"
							hideNavBar
							component={EmergencyPlaces}
						/>
					</Scene>
					<Scene
						key="settingsOption"
						hideNavBar
						component={SettingsOption}
					/>
					<Scene
						back={true}
						key="addIncident"
						hideNavBar
						component={AddIncident}
					/>
					<Scene key="incident" component={Incident} hideNavBar />
					<Scene
						key="editProfile"
						hideNavBar
						component={EditProfile}
					/>
					<Scene
						back={true}
						key="editIncident"
						hideNavBar
						component={EditIncident}
					/>
				</Scene>
			</ConnectedRouter>
		);
	}
}

crossroads.addRoute('crowdalert.herokuapp.com/view/{key}', key => {
	Actions.incident({ incident_key: key });
});
