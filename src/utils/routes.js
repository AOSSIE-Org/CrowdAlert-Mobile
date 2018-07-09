import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { Actions, Scene, Drawer } from 'react-native-router-flux';
import crossroads from 'crossroads';
import Icon from 'react-native-vector-icons/FontAwesome';

import Signin from '../components/login/signin';
import Signup from '../components/login/signup';
import HomeLogin from '../components/login/homeLogin';
import Forgot from '../components/login/forgot';

import DrawerContent from '../components/drawer';

import MapScreen from '../components/map/mapScreen';
import AddIncident from '../components/addIncident';
import FeedScreen from '../components/feed';

import Profile from '../components/profile/profile';
import EditProfile from '../components/profile/editProfile';
import { editButtonProfile } from '../components/profile/navBarButtons';
import { sideMenu } from '../components/profile/navBarButtons';

import Incident from '../components/incident/incidentScreen';
import DeleteButtonIncident from '../components/incident/navBarButtons/deleteIncident.js';
import EditButtonIncident from '../components/incident/navBarButtons/editIncidentButton.js';
import ShareButtonIncident from '../components/incident/navBarButtons/ShareIncidentButton.js';
import EditIncident from '../components/incident/editIncident';
import EmergencyLocation from '../components/emergencyPlaces';
import SettingsOption from '../components/settings';

const ConnectedRouter = connect()(Router);
const { width, height } = Dimensions.get('window');

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
						hideNavBar={true}
						component={HomeLogin}
						initial={this.props.initial}
					/>
					<Scene key="signin" hideNavBar={true} component={Signin} />
					<Scene key="signup" hideNavBar={true} component={Signup} />
					<Scene key="forgot" hideNavBar={true} component={Forgot} />
					<Scene
						drawer
						hideNavBar
						key="drawer"
						contentComponent={DrawerContent}
						drawerWidth={width * 0.65}
						initial={!this.props.initial}
						drawerOpenRoute="DrawerOpen"
						drawerCloseRoute="DrawerClose"
						drawerToggleRoute="DrawerToggle"
					>
						<Scene
							key="profile"
							title="Profile"
							renderRightButton={editButtonProfile}
							renderLeftButton={sideMenu}
							component={Profile}
						/>
						<Scene
							back={true}
							key="editProfile"
							title="Edit Profile"
							component={EditProfile}
						/>
						<Scene
							key="mapFeed"
							tabs={true}
							lazy={true}
							swipeEnabled={false}
							tabBarPosition="bottom"
							activeBackgroundColor="#d6d7d8"
						>
							<Scene
								key="map"
								title="Map"
								hideNavBar={true}
								icon={() => <Icon name="map" size={20} />}
								component={MapScreen}
							/>
							<Scene
								key="feed"
								title="World Feed"
								hideNavBar={true}
								icon={() => <Icon name="feed" size={20} />}
								component={FeedScreen}
							/>
						</Scene>
						<Scene
							back={true}
							key="addIncident"
							title="Add incident"
							component={AddIncident}
						/>
						<Scene
							key="emergencylocation"
							title="Emergency places nearby"
							renderLeftButton={sideMenu}
							component={EmergencyLocation}
						/>
						<Scene
							back={true}
							key="settingsOption"
							title="Settings"
							component={SettingsOption}
						/>
					</Scene>
					<Scene
						key="incident"
						title="Incident Details"
						component={Incident}
						right={[
							<EditButtonIncident key={1} />,
							<DeleteButtonIncident key={2} />,
							<ShareButtonIncident key={3} />
						]}
						// renderRightButton={moreOptions}
					/>
					<Scene
						back={true}
						key="editIncident"
						title="Edit Incident"
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
