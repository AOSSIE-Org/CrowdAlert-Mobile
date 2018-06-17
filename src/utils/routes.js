import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { Actions, Scene, Drawer } from 'react-native-router-flux';

import Signin from '../components/login/signin';
import Signup from '../components/login/signup';
import HomeLogin from '../components/login/homeLogin';
import Forgot from '../components/login/forgot';

import DrawerContent from '../components/drawer';

import MapScreen from '../components/map';
import AddIncident from '../components/addIncident';

import Profile from '../components/profile/profile';
import EditProfile from '../components/profile/editProfile';
import { editButton } from '../components/profile/navBarButtons';
import { sideMenu } from '../components/profile/navBarButtons';

import Incident from '../components/incident/incidentScreen';
import NavBar from '../components/incident/navBar';

const ConnectedRouter = connect()(Router);
const { width, height } = Dimensions.get('window');

/**
 * Routing class containing all instances of screens.
 * @extends Component
 */
export default class Route extends Component {
	onBackPress() {
		if (Actions.currentScene === 'profile') {
			return false;
		}
		Actions.pop();
		return true;
	}

	render() {
		return (
			<ConnectedRouter backAndroidHandler={this.onBackPress}>
				<Scene key="root">
					<Scene key="signin" title="Log in" component={Signin} />
					<Scene key="signup" title="Register" component={Signup} />
					<Scene
						key="homeLogin"
						title="Welcome"
						component={HomeLogin}
						initial={this.props.initial}
					/>
					<Scene
						key="forgot"
						title="Reset Password"
						component={Forgot}
					/>
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
							renderRightButton={editButton()}
							renderLeftButton={sideMenu()}
							component={Profile}
						/>
						<Scene
							back={true}
							key="editProfile"
							title="Edit Profile"
							component={EditProfile}
						/>
						<Scene
							key="map"
							hideNavBar={true}
							component={MapScreen}
						/>
						<Scene
							back={true}
							key="addIncident"
							title="Add incident"
							component={AddIncident}
						/>
					</Scene>
					<Scene
						key="incident"
						title="Incident Details"
						component={Incident}
						navBar={NavBar}
					/>
				</Scene>
			</ConnectedRouter>
		);
	}
}
